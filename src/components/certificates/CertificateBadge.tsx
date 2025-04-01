
import React from 'react';
import { Award, Calendar, FileCheck, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface CertificateBadgeProps {
  certificateId: string;
  certificateNumber: string;
  userName: string;
  courseTitle: string;
  issueDate: string;
  expiryDate?: string;
  size?: 'sm' | 'md' | 'lg';
  onVerify?: () => void;
}

export const CertificateBadge: React.FC<CertificateBadgeProps> = ({
  certificateId,
  certificateNumber,
  userName,
  courseTitle,
  issueDate,
  expiryDate,
  size = 'md',
  onVerify
}) => {
  const baseUrl = window.location.origin;
  const verificationUrl = `${baseUrl}/admin/certificates/verify/${certificateId}`;
  
  const qrCodeSize = {
    sm: 80,
    md: 120,
    lg: 150
  };
  
  const handleVerifyClick = () => {
    if (onVerify) {
      onVerify();
    } else {
      window.open(verificationUrl, '_blank');
    }
  };
  
  return (
    <Card className={`overflow-hidden border-2 border-primary/20 ${
      size === 'sm' ? 'max-w-xs' : size === 'md' ? 'max-w-sm' : 'max-w-md'
    }`}>
      <CardHeader className="bg-primary/5 pb-2 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Award className="h-5 w-5 text-primary mr-2" />
            <span className="font-medium">Certificado {certificateNumber}</span>
          </div>
          <FileCheck className="h-5 w-5 text-green-600" />
        </div>
      </CardHeader>
      
      <CardContent className={`pt-4 ${size === 'sm' ? 'px-3' : 'px-6'}`}>
        <div className={`flex ${size === 'sm' ? 'flex-col' : 'flex-row'} gap-4 items-center`}>
          <div className="flex-shrink-0">
            <QRCodeSVG
              value={verificationUrl}
              size={qrCodeSize[size]}
              includeMargin={true}
              level="M"
            />
          </div>
          
          <div className="space-y-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Otorgado a</h3>
              <p className={`font-semibold ${size === 'sm' ? 'text-base' : 'text-lg'}`}>{userName}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Curso</h3>
              <p className="text-sm">{courseTitle}</p>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>
                Emitido: {new Date(issueDate).toLocaleDateString()}
                {expiryDate && ` · Expira: ${new Date(expiryDate).toLocaleDateString()}`}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/30 pt-2 pb-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-xs" 
          onClick={handleVerifyClick}
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Verificar Autenticidad
        </Button>
      </CardFooter>
    </Card>
  );
};
