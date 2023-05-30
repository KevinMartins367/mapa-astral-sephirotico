import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './layout/MainLayout';



const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

//  * HOME PAGE
const Home = Loadable(lazy(() => import('./pages/home')));

const routes: RouteObject[] = [

   {
      path: '*',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
              <Home />
          ),
        },
      ],
    },
];

export default routes;