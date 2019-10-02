import React from 'react';

export const containerFactory = function<T>(defaultRender: React.FC<T>, preparePropsFn: () => T) {
  return (ownProps?: { render?: React.FC<T> }) => {
    const props = preparePropsFn();

    const PresentationalComponent = ownProps && ownProps.render
      ? ownProps.render
      : defaultRender;

    return <PresentationalComponent {...props} />;
  }
};
