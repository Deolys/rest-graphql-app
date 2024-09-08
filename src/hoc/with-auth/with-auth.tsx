import { redirect } from 'next/navigation';
import { type ComponentType, type JSX, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { LoadingSpin } from '@/components';
import { auth } from '@/config/firebase-config';
import { pageRoutes } from '@/constants/page-routes';

export function withAuth<P extends object>(
  Component: ComponentType<P>,
): ComponentType<P> {
  const WrappedComponent = (props: P): JSX.Element => {
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
      if (!loading && !user) {
        redirect(pageRoutes.SIGN_IN);
      }
    }, [user, loading]);

    if (loading) {
      return <LoadingSpin />;
    }

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

export default withAuth;
