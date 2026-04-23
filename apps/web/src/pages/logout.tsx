import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { clearSession } from '@/lib/auth';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    clearSession();
    router.replace('/');
  }, [router]);

  return null;
}
