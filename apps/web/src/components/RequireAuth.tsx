import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession, hasRole, Role, Session } from '@/lib/auth';

type Props = {
  roles?: Role[];
  children: ReactNode;
};

export default function RequireAuth({ roles, children }: Props) {
  const router = useRouter();
  const [state, setState] = useState<{ loading: boolean; session: Session | null }>({
    loading: true,
    session: null,
  });

  useEffect(() => {
    const session = getSession();
    const ok = hasRole(session, roles);

    if (!ok) {
      const next = encodeURIComponent(router.asPath);
      router.replace(`/login?next=${next}`);
      return;
    }

    setState({ loading: false, session });
  }, [roles, router]);

  if (state.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded p-6 shadow-sm">
          <div className="text-sm text-gray-700">Checking session...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
