import React, { useEffect } from 'react';
import { useLocation } from 'wouter';

function CreateMissionPage() {
  const [, setLocation] = useLocation();

  // Rediriger automatiquement vers le flow progressif principal
  useEffect(() => {
    console.log('🔄 Redirection vers le flow progressif principal...');
    setLocation('/');
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">
          Redirection vers la création de mission...
        </p>
      </div>
    </div>
  );
}

export default CreateMissionPage;