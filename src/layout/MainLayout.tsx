import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import Helmets from '../components/helmets';

import { ThemeProvider } from 'styled-components';
import primary from '../styles/themes/primary'
import GlobalStyle from '../styles/global';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return( 
    <ThemeProvider theme={primary}>
      <Helmets />
      <GlobalStyle />
      {children || <Outlet />}
    </ThemeProvider>
    );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;