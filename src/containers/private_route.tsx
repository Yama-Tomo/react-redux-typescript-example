import React, { useEffect, useRef, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export default ({component: Component, render, children, ...rest}: RouteProps) => {
  const isUnmount = useRef<boolean>(false);
  const [authState, setAuthState] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    (async () => {
      await new Promise(resolve => setTimeout(() => resolve(), 1000));

      if (!isUnmount.current) {
        setAuthState(Math.floor(Math.random() * Math.floor(100)) % 2 === 1 ? 'authorized' : 'unauthorized');
      }
    })();

    return () => {
      isUnmount.current = true;
    }
  }, []);

  return <Route {...rest} render={(props) => {
    if (authState === 'loading') {
      return null;
    }

    if (authState === 'authorized') {
      if (children) {
        return children;
      }

      if (Component) {
        return <Component {...props} />;
      }

      if (render) {
        return render(props);
      }

      return null;
    }

    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
  }} />;
};
