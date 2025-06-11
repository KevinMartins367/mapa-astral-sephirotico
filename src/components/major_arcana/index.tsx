import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';

import { Major_arcanas } from './styles';

import Caractere_hebraico from '../caractere_hebraico'
import Markdown from 'react-markdown'

import data from '../../services/data';

export default function Major_arcana(props: any) {

    const [arcana, setArcana]: any = useState('');
    const [content, setContent] = useState<string>('')

    useEffect(() => {
        async function Get_arcanas() {
            data().getTarot_Arcana_Major()
                .then((result: any) => {
                    return result.data;

                })
                .then((full_arcana: any) => {
                    setArcana(full_arcana[props.arcana]);
                })
                .catch((error: any) => {
                    console.log("🚀 ~ file: index.tsx:20 ~ Get_arcanas ~ error:", error)

                })
        }
        if (props.arcana && props.arcana != '') {
            Get_arcanas();
        }
    }, [props.arcana]);

    useEffect(() => {

        async function getMarkdown() {
            let link = arcana.interpretation;
            if (link != undefined && link != ``) {
                data().getMarkdown(link)
                    .then(res => {

                        setContent(res.data);
                    })
                    .catch((error: any) => {
                        console.log("🚀 ~ file: index.tsx:20 ~ Get_arcanas ~ error:", error)
                    })
            }
        }
        if (arcana != undefined && arcana != ``) {
            getMarkdown();
        }
    }, [arcana]);


    return (
        <Major_arcanas>

            <Card>
                <Card.Header>
                    <Row>
                        <Col sm={12} md={10} lg={10}>
                            <h2 >{arcana.name ?? 'titulo de informações'}</h2>
                        </Col>
                        <Col sm={12} md={2} lg={2}>
                            <button className='btn btn-primary' onClick={() => props.showModal(props.arcana, 'major')}>Combinações</button>
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>
                    <Row>
                        <Col sm={12} md={6} lg={6}>
                            <ul>
                                <li>Runa: <span className='simbolo hebraic'>{arcana.runa}</span></li>

                                {arcana.elemento && arcana.elemento !== "" && (
                                    <li>Elemento: {arcana.elemento}</li>
                                )}
                                {arcana.planeta && arcana.planeta !== "" && (
                                    <li>Planeta: {arcana.planeta}</li>
                                )}
                                {arcana.signo && arcana.signo !== "" && (
                                    <li>Signo: {arcana.signo}</li>
                                )}
                                <li>Cor (segundo Golden Dawn):  <div style={{ ...props.style, backgroundColor: arcana.color, width: `50px`, height: `20px`, display: `inline-block` }}>   </div> <span>{arcana.color}</span> </li>
                                <li>Titulo Thelemita: {arcana.thelemita_title}</li>

                                {((arcana.caractere_hebraico_link != ``) && (arcana.caractere_hebraico_link != undefined)) ?

                                    <li>letra Hebraica:
                                        <div>
                                            { }
                                            <Caractere_hebraico caractere={arcana.caractere_hebraico_link} />
                                        </div>
                                    </li>
                                    : ``
                                }
                            </ul>

                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <h2>Referencias</h2>
                            <ul>
                                <li><a href={arcana.link_wiki_mdd + ``} target="_blank"> Wiki Projeto Mayhem</a></li>
                                <li><a href={arcana.link_youtube_cdh + ``} target="_blank">Video CdH</a></li>
                                <li><a href={arcana.link_youtube_lupus + ``} target="_blank">Video Lupus In Fabula</a></li>
                                <li><a href={arcana.link_youtube_jornada_do_ser + ``} target="_blank">Video Tarô Virtual</a></li>
                                <li>Tarot Hermetico: {arcana.pages_tarot_hermetico} .pg</li>
                                <li>Pagina do Tarot O Templo Vivente Frater Goya: {arcana.pages_tarot_crowley_goya} .pg</li>
                                <li>Pagina do TARÔ DE CROWLEY - PALAVRAS-CHAVE: {arcana.pages_tarot_crowley_word_key} .pg</li>
                            </ul>

                        </Col>
                        <Col className='m-3' sm={12} md={12} lg={12}>
                            <h2>Síntese</h2>
                            <p className='m-3'>{arcana.synthesis}</p>
                        </Col>

                        {
                            (arcana.interpretation != undefined && arcana.interpretation != ``) ?
                                <Col className='m-3' sm={12} md={12} lg={12}>
                                    <h2>Interpretação</h2>
                                        <div className='m-3'>
                                            <Markdown 
                                                components={{
                                                    h3: ({ node, ...props }) => {
                                                        let text = '';
                                                        if (typeof props.children === 'string') {
                                                            text = props.children;
                                                        } else if (Array.isArray(props.children)) {
                                                            // Procura por <strong> e pega o texto dentro dela
                                                            const strongChild = React.Children.toArray(props.children).find(
                                                                (child: any) => React.isValidElement(child) && child.type === 'strong'
                                                            );
                                                            if (
                                                                React.isValidElement(strongChild) &&
                                                                typeof strongChild === 'object' &&
                                                                strongChild !== null &&
                                                                'props' in strongChild &&
                                                                (strongChild as { props?: { children?: React.ReactNode } }).props &&
                                                                (strongChild as { props: { children?: React.ReactNode } }).props.children
                                                            ) {
                                                                const strongChildContent = (strongChild as { props: { children: React.ReactNode } }).props.children;
                                                                text = strongChildContent !== undefined ? String(strongChildContent) : '';
                                                            } else {
                                                                text = React.Children.toArray(props.children).join('');
                                                            }
                                                        }
                                                        const id = arcana.name.toString()
                                                            .normalize('NFD')
                                                            .replace(/[\u0300-\u036f]/g, '')
                                                            .replace(/[^a-zA-Z0-9\s-]/g, '')
                                                            .trim()
                                                            .replace(/\s+/g, '-')
                                                            .toLowerCase()+ `-` + text
                                                            .toString()
                                                            .normalize('NFD')
                                                            .replace(/[\u0300-\u036f]/g, '')
                                                            .replace(/[^a-zA-Z0-9\s-]/g, '')
                                                            .trim()
                                                            .replace(/\s+/g, '-')
                                                            .toLowerCase();
                                                        
                                                        return <h3 {...props} id={id} />;
                                                    },
                                                    
                                                }}
                                            >
                                            {content ?? ''
                                            }
                                            </Markdown>
                                        </div>

                                </Col>
                                : ``
                        }
                    </Row>
                </Card.Body>

                <Card.Footer>
                    <h3>Cartas</h3>
                    <Row>
                        <Col sm={12} md={12} lg={3}>
                            <Image className='img-fluid' alt='arcano Rider Waite' src={`${process.env.PUBLIC_URL}/${arcana.image_rider_waite}`} />
                            <p>arcano Rider Waite</p>
                        </Col>
                        <Col sm={12} md={12} lg={3}>
                            <Image className='img-fluid' alt='arcano Marselli' src={`${process.env.PUBLIC_URL}/${arcana.image_marseille}`} />
                            <p>arcano Marselli</p>
                        </Col>
                        <Col sm={12} md={12} lg={3}>
                            <Image className='img-fluid' alt='arcano Crowley' src={`${process.env.PUBLIC_URL}/${arcana.image_crowley}`} />
                            <p>arcano Crowley</p>
                        </Col>
                        <Col sm={12} md={12} lg={3}>
                            <Image className='img-fluid' alt='arcano CdH' src={`${process.env.PUBLIC_URL}/${arcana.image_cdh}`} />
                            <p>arcano CdH </p>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Major_arcanas>
    )
                                                        
}