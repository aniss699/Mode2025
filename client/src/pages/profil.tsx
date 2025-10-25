import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function ProfilRedirect() {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    setLocation('/provider-profile');
  }, [setLocation]);

  return null;
}
