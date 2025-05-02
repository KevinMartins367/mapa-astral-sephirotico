import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import { Divs } from './styles';

import Infos from '../../components/infos';
import Kabbalah from '../../components/kabbalah';
import Header from '../header';

export default function Home() {
    const [sephira, setSephira] = React.useState('');
    const [path, setPath] = React.useState('');

    const handleSephiraChange = (newSephira: string) => {
        setSephira(newSephira);
    };

    const handlePathChange = (newPath: string) => {
        setPath(newPath);
    };

    return (
        <Divs>
            <Header />
            <main>
                <Container fluid="md" className='pt-5'>
                    <Row>
                        {/* <Col className='pb-3' sm={12} md={12} lg={12}>
                     <Form_infos />
                  </Col> */}

                        <Col sm={12} md={12} lg={5} className='pb-3'>
                            <aside>
                                <Card>
                                    <Card.Body>
                                        <Kabbalah onSephiraChange={handleSephiraChange} handlePathChange={handlePathChange} />
                                    </Card.Body>
                                </Card>
                            </aside>
                        </Col>

                        <Col sm={12} md={12} lg={7} className='pb-3'>
                            <section>
                                <Infos sephira={sephira} path={path} />
                            </section>
                        </Col>
                    </Row>
                </Container>
            </main>
        </Divs>
    );
}
