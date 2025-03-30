
import React from 'react';

const Pricing: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Planes y Precios</h1>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Basic Plan */}
        <div className="border rounded-lg overflow-hidden">
          <div className="p-6 bg-muted">
            <h2 className="text-2xl font-semibold">Plan Básico</h2>
            <p className="text-3xl font-bold mt-2">$9.99<span className="text-sm text-muted-foreground">/mes</span></p>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Acceso a cursos básicos
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Soporte por email
              </li>
            </ul>
            <button className="w-full mt-6 py-2 px-4 bg-primary text-primary-foreground rounded hover:bg-primary/90">
              Suscribirse
            </button>
          </div>
        </div>
        
        {/* Pro Plan */}
        <div className="border rounded-lg overflow-hidden border-primary">
          <div className="p-6 bg-primary text-primary-foreground">
            <h2 className="text-2xl font-semibold">Plan Pro</h2>
            <p className="text-3xl font-bold mt-2">$19.99<span className="text-sm opacity-80">/mes</span></p>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Acceso a todos los cursos
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Certificados descargables
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Soporte premium
              </li>
            </ul>
            <button className="w-full mt-6 py-2 px-4 bg-primary text-primary-foreground rounded hover:bg-primary/90">
              Suscribirse
            </button>
          </div>
        </div>
        
        {/* Premium Plan */}
        <div className="border rounded-lg overflow-hidden">
          <div className="p-6 bg-muted">
            <h2 className="text-2xl font-semibold">Plan Premium</h2>
            <p className="text-3xl font-bold mt-2">$29.99<span className="text-sm text-muted-foreground">/mes</span></p>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Todo lo del plan Pro
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Sesiones 1:1 con instructores
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Acceso anticipado a nuevos cursos
              </li>
            </ul>
            <button className="w-full mt-6 py-2 px-4 bg-primary text-primary-foreground rounded hover:bg-primary/90">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
