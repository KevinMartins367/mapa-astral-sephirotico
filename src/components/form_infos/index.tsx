import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import { Divs } from './styles';


export default function Form_infos() {

   return(
      <Divs>
         <Card>
            <Card.Body>
               <Form>
                  <Row>
                     <Col sm={12} md={2} lg={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                           <Form.Label>Data:</Form.Label>
                           <Form.Control type="date" placeholder="01/12/2000" />
                        </Form.Group>
                     </Col>
                     <Col sm={12} md={2} lg={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                           <Form.Label>Horário:</Form.Label>
                           <Form.Control type="time" placeholder="16:40" />
                        </Form.Group>
                     </Col>
                     <Col sm={12} md={2} lg={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                           <Form.Label placeholder='Selecionar um estado'>Estado:</Form.Label>
                           <Form.Select>
                              <option value="Acre">Acre</option>
                              <option value="Alagoas">Alagoas</option>
                              <option value="Amapá">Amapá</option>
                              <option value="Amazonas">Amazonas</option>
                              <option value="Bahia">Bahia</option>
                              <option value="Ceará">Ceará</option>
                              <option value="Espírito Santo">Espírito Santo</option>
                              <option value="Goiás">Goiás</option>
                              <option value="Maranhão">Maranhão</option>
                              <option value="Mato Grosso">Mato Grosso</option>
                              <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                              <option value="Minas Gerais">Minas Gerais</option>
                              <option value="Pará">Pará</option>
                              <option value="Paraíba">Paraíba</option>
                              <option value="Paraná">Paraná</option>
                              <option value="Pernambuco">Pernambuco</option>
                              <option value="Piauí">Piauí</option>
                              <option value="Rio de Janeiro">Rio de Janeiro</option>
                              <option value="Rio Grande do Norte">Rio Grande do Norte</option>
                              <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                              <option value="Rondônia">Rondônia</option>
                              <option value="Roraima">Roraima</option>
                              <option value="Santa Catarina">Santa Catarina</option>
                              <option value="São Paulo">São Paulo</option>
                              <option value="Sergipe">Sergipe</option>
                              <option value="Tocantins">Tocantins</option>
                              <option value="Distrito Federal">Distrito Federal</option>
                           </Form.Select>
                        </Form.Group>
                     </Col>
                     <Col sm={12} md={2} lg={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                           <Form.Label>Cidade:</Form.Label>
                           <Form.Control type="text" placeholder="São Paulo" />
                        </Form.Group>
                     </Col>
                     <Col className='text-end pt-3' sm={12} md={4} lg={4}>
                                    
                        <Button variant="primary" type="submit">
                           Produzir
                        </Button>
                     </Col>
                  </Row>

               </Form>
            </Card.Body>
         </Card>
      </Divs>
   )
}