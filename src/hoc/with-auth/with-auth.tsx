import { Flex, Spin } from 'antd';
import { redirect } from 'next/navigation';
import { type ComponentType, type JSX, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/config/firebase-config';

export function withAuth<P extends JSX.IntrinsicAttributes>(
  Component: ComponentType<P>,
): ComponentType<P> {
  const WrappedComponent = (props: P): JSX.Element => {
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
      if (!loading && !user) {
        redirect('/sign-in');
      }
    }, [user, loading]);

    if (loading) {
      return (
        <Flex justify="center" align="center" style={{ height: '20vh' }}>
          <Spin size="large" />
        </Flex>
      );
    }

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

export default withAuth;
