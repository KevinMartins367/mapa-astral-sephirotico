import { useEffect } from 'react';
import type { FC } from 'react';
import NProgress from 'nprogress';
import { Container } from 'react-bootstrap'

const LoadingScreen: FC = () => {
  useEffect(() => {
    NProgress.start();

    return (): void => {
      NProgress.done();
    };
  }, []);

  return (
   <Container>
      
   </Container>
  );
};

export default LoadingScreen;
