"use client";
// components/withAuth.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getCookieValue } from './utils/cookies/getCookie'; // Ajusta la ruta según tu estructura

const withAuth = (WrappedComponent:any) => {
  return (props:any) => {
    if (typeof window === "undefined") {
      return null; // Devuelve null si se ejecuta en el servidor
    }

    const router = useRouter();

    useEffect(() => {
      const jwtCookie = getCookieValue('jwt');
      if (!jwtCookie) {
        router.replace('/admin'); // Redirige a la página de login si no hay JWT
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};
// Definición del display name para facilitar la depuración
withAuth.displayName = 'withAuth';
export default withAuth;
