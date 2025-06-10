import React, { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Container, Form, Button, Table } from 'react-bootstrap';

import { ReferencesStyles } from './styles';
import Header from '../header';

import Reference from '../../interfaces/References'; 

import dataService from '../../services/data';

export default function References() {

    const [references, setReferences] = useState<Reference[]>([]);

    useEffect(() => {
        async function fetchReferences() {
            try {
                const response = await dataService().getReferences();
                const data = await response.data;
                setReferences(data);
            } catch (error) {
                console.error('Error fetching references:', error);
            }
        }
        fetchReferences();
    }, []);

    return (
        <ReferencesStyles>
            <Header />
            <main>
                <Container fluid="md" className='pt-5'>
                    <Row>
                        <Col sm={12} md={12} lg={12} className='pb-3'>
                            <Card className='text-center'>
                                <Card.Header>
                                    <h2>Livros de Referências</h2>
                                </Card.Header>
                                <Card.Body>
                                    <Table  responsive="lg" className="table table-striped table-bordered table-hover"variant="dark" size="lg" >
                                        <thead>
                                            <tr>
                                                <th>Capa</th>
                                                <th className='text-wrap' style={{ width: '300px' }}>Título</th>
                                                <th>Autor</th>
                                                <th>Editora</th>
                                                <th>Ano</th>
                                                <th>Link</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {references.map((ref, index) => (
                                                <tr key={`ref-${index + 1}`}>
                                                    <td><img src={ref.cover} alt={ref.title} style={{ width: '100px' }} /></td>
                                                    <td className='text-wrap'>{ref.title}</td>
                                                    <td>{ref.authors.join(', ')}</td>
                                                    <td>{ref.publisher}</td>
                                                    <td>{ref.year}</td>
                                                    <td><a href={ref.url} target="_blank" rel="noopener noreferrer">Comprar</a></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
        </ReferencesStyles>
    );
}