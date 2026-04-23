import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PortfolioRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/app/portfolio');
  }, [router]);

  return null;
}
