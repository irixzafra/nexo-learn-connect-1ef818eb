
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Certificate {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expired' | 'revoked';
  userId?: string;
  metadata?: Record<string, any>;
}

interface UseCertificatesReturn {
  certificates: Certificate[];
  isLoading: boolean;
  error: string | null;
  downloadCertificate: (id: string) => void;
  verifyCertificate: (id: string) => Promise<boolean>;
}

export const useCertificates = (userId?: string): UseCertificatesReturn => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCertificates = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulación de una llamada a API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Datos simulados
        const mockCertificates: Certificate[] = [
          {
            id: 'cert-001',
            name: 'Fundamentos de React',
            courseId: 'course-001',
            courseName: 'Desarrollo Web con React',
            issueDate: '15/04/2023',
            expiryDate: '15/04/2025',
            status: 'valid',
          },
          {
            id: 'cert-002',
            name: 'JavaScript Avanzado',
            courseId: 'course-002',
            courseName: 'JavaScript Moderno',
            issueDate: '20/02/2023',
            expiryDate: '20/02/2025',
            status: 'valid',
          },
          {
            id: 'cert-003',
            name: 'Diseño UX/UI',
            courseId: 'course-003',
            courseName: 'Fundamentos de Diseño UX',
            issueDate: '10/12/2022',
            expiryDate: '10/12/2024',
            status: 'valid',
          },
          {
            id: 'cert-004',
            name: 'Node.js Básico',
            courseId: 'course-004',
            courseName: 'Backend con Node.js',
            issueDate: '05/08/2022',
            expiryDate: '05/08/2023',
            status: 'expired',
          }
        ];
        
        setCertificates(mockCertificates);
      } catch (err) {
        console.error('Error fetching certificates:', err);
        setError('No se pudieron cargar los certificados.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCertificates();
  }, [userId]);
  
  const downloadCertificate = (id: string) => {
    // Simulación de descarga
    toast.success(`Descargando certificado ${id}...`);
    
    // En un caso real, esto redirigiría a una URL de descarga o abriría un nuevo tab
    setTimeout(() => {
      toast.info('Certificado descargado correctamente');
    }, 1500);
  };
  
  const verifyCertificate = async (id: string): Promise<boolean> => {
    try {
      // Simulación de verificación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En un caso real, esto verificaría contra una API
      const isValid = certificates.some(cert => cert.id === id && cert.status === 'valid');
      
      if (isValid) {
        toast.success('Certificado verificado correctamente');
      } else {
        toast.error('El certificado no es válido o no existe');
      }
      
      return isValid;
    } catch (err) {
      console.error('Error verifying certificate:', err);
      toast.error('Error al verificar el certificado');
      return false;
    }
  };
  
  return {
    certificates,
    isLoading,
    error,
    downloadCertificate,
    verifyCertificate
  };
};
