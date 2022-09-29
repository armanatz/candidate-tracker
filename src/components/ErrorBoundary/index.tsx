/* eslint-disable react/static-property-placement */
import { Component, PropsWithChildren } from 'react';

import Layout from '../Layout';

interface ErrorBoundaryProps extends PropsWithChildren {
  withLayout?: boolean;
}

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static defaultProps = {
    withLayout: false,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  public render() {
    const { children, withLayout } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      if (withLayout) {
        return (
          <Layout>
            <h1>Something went wrong.</h1>
          </Layout>
        );
      }
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
