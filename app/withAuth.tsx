"use client";
// components/withAuth.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getCookieValue } from './utils/cookies/getCookie'; // Ajusta la ruta según tu estructura
import { ADMIN_ROUTES } from './admin/constants';

const withAuth = (WrappedComponent:any) => {
  return (props:any) => {
    if (typeof window === "undefined") {
      return null; // Devuelve null si se ejecuta en el servidor
    }

    const router = useRouter();

    useEffect(() => {
      const jwtCookie = getCookieValue('jwt');
      if (!jwtCookie) {
        router.replace(ADMIN_ROUTES.LOGIN);
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
