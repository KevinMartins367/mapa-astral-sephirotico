import React from 'react';
import { Container, Row, Col, Card  } from 'react-bootstrap';

import { Divs } from './styles';

import  Header  from '../header';
import Form_infos from  '../../components/form_infos'
import Infos from  '../../components/infos'

export default function Home() {

   return(
      <Divs>
         <Header />
         <main>
            <Container fluid="md" className='p-5'>
               <Row>
                  <Col className='pb-3' sm={12} md={12} lg={12}>
                     <Form_infos />
                  </Col>

                  <Col sm={12} md={5} lg={5}>
                     <aside>
                        <Card>
                           <Card.Body>
                              desenho da Kabbalah
                           </Card.Body>
                        </Card>
                     </aside>
                  </Col>

                  <Col sm={12} md={7} lg={7}>
                     <section>
                        <Infos />
                     </section>
                  </Col>
               </Row>
            </Container>
         </main>
      </Divs>
   );
}
