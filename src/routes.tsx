import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './layout/MainLayout';
import { Navigate } from 'react-router';



const Loadable = <T extends {}>(Component: React.ComponentType<T>) => (props: T) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

//  * HOME PAGE
const Home = Loadable(lazy(() => import('./pages/home')));
const Maps = Loadable(lazy(() => import('./pages/maps')));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
    {
        path: '/maps',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Maps />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
];

export default routes;