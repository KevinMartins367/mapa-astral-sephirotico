import React from 'react';
import { Container, Row, Col, Card  } from 'react-bootstrap';

import { Divs } from './styles';

import  Header  from '../header'

export default function Home() {

   return(
      <Divs>
         <Header />
         <Container fluid="md" className='p-3'>
            <Row>
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
                     <Card>
                        <Card.Body>
                           infos
                        </Card.Body>
                     </Card>

                  </section>
               </Col>
            </Row>
         </Container>
      </Divs>
   );
}
