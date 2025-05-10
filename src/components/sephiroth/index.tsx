import React, { useState, useEffect, useContext } from 'react';
import { Accordion, Card, Image } from 'react-bootstrap';

import { Sephiras } from './styles';

import data from '../../services/data';

import Minor_arcana from '../minor_arcana';

export default function Sephiroth(props: any) {

    const [sephira, setSephira]: any = useState('');

    useEffect(() => {
        async function Get_sephiroth() {
            data().getSephiroth()
                .then((result: any) => {
                    return result.data;

                })
                .then((full_sephiroth: any) => {
                    setSephira(full_sephiroth[props.sephira])
                })
                .catch((error: any) => {
                    console.log("🚀 ~ file: index.tsx:20 ~ Get_sephiroth ~ error:", error)

                })
        }
        if (props.sephira == '' || props.sephira == undefined) {
            return;
        }
        Get_sephiroth();
    }, [props.sephira]);

    return (
        <Sephiras>
            <Card>
                <Card.Header>
                    <h1>{sephira.name}</h1>
                </Card.Header>
                <Card.Body>
                    <ul>
                        <li>Planeta: {sephira.planeta} <span className='simbolo'>  {'   ' + sephira.simbolo}</span> </li>
                        <li>Pagina do Kabbalah Hermetica: {sephira.pages_kabbalah_hermetica} pg</li>
                        <li>Carruagem de acesso (persona na bíblia que tem uma conexão): {sephira.carruagem}</li>
                        <li>Mundo: {sephira.mundo} ( tradução:  {sephira.mundo_traducao} )</li>
                        <li>Casta (visão judaica): {sephira.casta_hebraica}</li>
                        <li>Anjo (visão judaica): {sephira.angel_hebraica}</li>
                        <li>Vogal hebraico: <span className='simbolo hebraic'> {sephira.vogal_hebraico} </span></li>
                        <li>tetragrama com vogal (para meditação): <span className='simbolo hebraic'> {sephira.tetragrama_vogais} </span> </li>
                        <li>Energia: {sephira.energia}</li>
                        <li>dedos correspondentes: {sephira.dedos}</li>
                    </ul>
                    <h2>Referencias</h2>
                    <ul>
                        <li><a href={sephira.link_wiki_mdd} target="_blank"> Wiki Projeto Mayhem</a></li>
                        <li><a href={sephira.link_youtube_cdh} target="_blank">Video CdH</a></li>
                        <li><a href={sephira.link_youtube_yair} target="_blank">Video Yair Alon</a></li>
                    </ul>

                    {((sephira.minor_arcana != '') && (Array.isArray(sephira.minor_arcana)) && (sephira.minor_arcana.length > 0)) ?
                        <div>
                            <Accordion>
                                {
                                    sephira.minor_arcana.map((arcana: any, index: number) => {

                                        return <Accordion.Item eventKey={index + ''}>
                                            <Accordion.Header>{arcana}</Accordion.Header>
                                            <Accordion.Body>
                                                <Minor_arcana arcana={arcana} />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    })
                                }
                            </Accordion>
                        </div> : ``
                    }

                </Card.Body>
            </Card>

        </Sephiras>
    )
}