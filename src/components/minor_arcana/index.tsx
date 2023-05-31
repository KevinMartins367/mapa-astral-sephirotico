import React, { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';

import { Minor_arcanas } from './styles';

import data from '../../services/data';

export default function Minor_arcana(props: any){

   const [ arcana, setArcana ]: any = useState('');
   
   useEffect(() => {
      async function Get_arcanas() {
         data().getTarot()
         .then((result: any) => {
            return result.data;

         })
         .then((full_arcana: any) => {         
            setArcana(full_arcana[0].minor_arcana[props.arcana])
         })
         .catch((error: any) => {
            console.log("🚀 ~ file: index.tsx:20 ~ Get_arcanas ~ error:", error)
            
         }).finally(() =>{

            console.log("🚀 ~ file: index.tsx:27 ~ .then ~ arcana:", arcana.dados)
         })
      }
      Get_arcanas();
   }, []);


   return(
      <Minor_arcanas>
         <Card>
            <Card.Header>
               <h2>{ arcana.name ?? 'titulo de informações'}</h2>
            </Card.Header>
            <Card.Body>
               <Row>
                  <Col sm={12} md={6} lg={6}>
                     <ul>
                        <li>letra Hebraica: { arcana.caractere_hebraico_link }</li>
                        <li>elemento: { arcana.elemento }</li>
                        <li>Palavras chaves: { arcana.word_key }</li>
                        
                        { ( (arcana.dados != '') && (Array.isArray(arcana.dados) ) && (arcana.dados.length > 0 )) ? 
                        <li>Dados: { arcana.dados.map((dados: any) => {

                              return <i className={`bi-dice-${dados}-fill me-3`} style={{...props.style, fontSize: `2rem`, display: `inline-block`}}></i>
                           }) }</li> : ``
                        }

                        {
                           ( arcana.arquetipo_MBTI != `` ) ? 
                           <li>Arquétipo MBTI: { arcana.arquetipo_MBTI }</li> : ''
                        }
                        
                        { ( (arcana.name_angel != '') && (Array.isArray(arcana.name_angel) ) && (arcana.name_angel.length > 0 )) ? 
                        <li>Nome de Anjos: {` `} { arcana.name_angel.map((angel: any) => {

                              return <a href={`/?angel_name=${angel}`} target="_blank" className='me-3'>{angel}</a> 
                           }) }</li> : ``
                        }
                        { (arcana.astrologica != '') ? 
                        <li>{ ( arcana.arquetipo_MBTI != `` ) ? 'Intervalo Astral: ' : 'Face Planetaria: '}  { arcana.astrologica }</li> : ``
                        }
                        
                        <li>Correspondente sephirotico: { ` `+ arcana.sephiroth } </li>
                        <li>Correspondente de reino: { ` `+ arcana.reino } </li>
                        <li>interpretação Goya ( templo vivente ): { arcana.tarot_crowley_goya_sign }</li>
                     </ul>
                  </Col>
                  <Col sm={12} md={6} lg={6}>
                     <h2>Referencias</h2>

                     <ul>
                        <li><a href={ arcana.link_wiki_mdd +`` } target="_blank"> Wiki Projeto Mayhem</a></li>
                        
                        <li><a href={ arcana.link_youtube_jornada_do_ser +`` } target="_blank">Video Tarô Virtual</a></li>

                        <li>Tarot Hermetico: { arcana.pages_tarot_hermetico }pg</li>

                        <li>Pagina do Tarot O Templo Vivente Frater Goya: { arcana.pages_tarot_crowley_goya }pg</li>

                        <li>Pagina do TARÔ DE CROWLEY - PALAVRAS-CHAVE: { arcana.pages_tarot_crowley_word_key }pg</li>
                     </ul>
                  </Col>
               </Row>

            </Card.Body>
            <Card.Footer>
               <h3>Cartas</h3>
               <Row>
                  <Col sm={3} md={3} lg={3}>

                     <Image className='img-fluid' alt='arcano Rider Waite' src={ arcana.image_rider_waite } />
                  </Col>
                  <Col sm={3} md={3} lg={3}>
                     <Image className='img-fluid' alt='arcano Crowley' src={ arcana.image_crowley } />
                  </Col>
               </Row>
            </Card.Footer>
         </Card>
      </Minor_arcanas>
   )
}