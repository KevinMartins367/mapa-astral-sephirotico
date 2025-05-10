import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ThemeContext } from 'styled-components';
import { Headers } from './styles'


import usePeristedState from '../../utils/usePersistedState';


export default function Header(props: any) {

    const [term, setTerm] = useState((props.term ?? ''));
    const [user, setUser] = usePeristedState<any>('user');

    return (
        <Headers>
            <header>
                <Navbar  collapseOnSelect expand="lg" bg="dark"  variant="dark" >
                    <Container >
                        <Navbar.Brand as={Link} to="/">

                            <Image
                                alt=""
                                src={`${process.env.PUBLIC_URL}/logo.png`}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            Grimório open source
                        </Navbar.Brand>
                        
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="text-light" as={Link} to="/">Home</Nav.Link>
                                <Nav.Link className="text-light" as={Link} to="/maps">Mapas</Nav.Link>
                            </Nav>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Arcanos, Anjos, Sephira"
                                    className="me-2"
                                    aria-label="Arcanos, Anjos, Sephira"
                                />
                                <Button variant="outline-success">Pesquisar</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </Headers>
    )
}