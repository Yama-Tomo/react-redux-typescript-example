import React from 'react';

export const createRenderFunction = function<T>(defaultRender: React.FC<T>, customRender?: React.FC<T>) {
  const PresentationalComponent = customRender
    ? customRender
    : defaultRender;

  return (props: T) => <PresentationalComponent {...props} />;
};
