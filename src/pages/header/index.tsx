import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Container, Nav, Form, Button, Image } from 'react-bootstrap';

import { ThemeContext } from 'styled-components';
import { Headers } from './styles'


import usePeristedState from '../../utils/usePersistedState';


export default function Header(props: any) {

   const [term, setTerm] = useState((props.term ?? ''));
   const [user, setUser] = usePeristedState<any>('user');

   return(
      <Headers>
         <header>
            <Navbar bg="dark">
               <Container className="pt-0 pb-0">
                  <Navbar.Brand href="#home">
      
                     <Image
                     alt=""
                     src="./logo192.png"
                     width="30"
                     height="30"
                     className="d-inline-block align-top"
                     />{' '}
                     Kabbalah Hermética
                  </Navbar.Brand>
                  <Form className="d-flex">
                     <Form.Control
                     type="search"
                     placeholder="Arcanos, Anjos, Sephira"
                     className="me-2"
                     aria-label="Arcanos, Anjos, Sephira"
                     />
                     <Button variant="outline-success">Pesquisar</Button>
                  </Form>
               </Container>
            </Navbar>
         </header>
      </Headers>
   )
}