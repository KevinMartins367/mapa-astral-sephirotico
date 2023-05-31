import React, { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';

import { Major_arcanas } from './styles';

import Caractere_hebraico from '../caractere_hebraico'

import data from '../../services/data';

export default function Major_arcana(props: any) {
   
   const [ arcana, setArcana ]: any = useState('');

   useEffect(() => {
      async function Get_arcanas() {
         data().getTarot()
         .then((result: any) => {
            return result.data;

         })
         .then((full_arcana: any) => {         
            setArcana(full_arcana[0].major_arcana[props.arcana])
         })
         .catch((error: any) => {
            console.log("🚀 ~ file: index.tsx:20 ~ Get_arcanas ~ error:", error)
            
         })
      }
      Get_arcanas();
   }, []);


   return(
      <Major_arcanas>
         
         <Card>
            <Card.Header>
               <h1>{ arcana.name ?? 'titulo de informações'}</h1>
            </Card.Header>

            <Card.Body>
               <Row>
                  <Col sm={12} md={6} lg={6}>
                     <ul>
                        { (( arcana.caractere_hebraico_link != `` ) && ( arcana.caractere_hebraico_link != undefined)) ? 
                           
                           <li>letra Hebraica:
                              <div>
                                 {}
                                 <Caractere_hebraico caractere={arcana.caractere_hebraico_link} />
                              </div>
                           </li>
                           : ``
                        }
                        <li>Runa: { arcana.runa }</li>
                        <li>Elemento: { arcana.elemento }</li>
                        <li>Cor (segundo GD):  <div style={{...props.style, backgroundColor: arcana.color, width: `40px`, height: `10px`, display: `inline-block`}}>   </div> <span>{ arcana.color }</span> </li>
                        <li>interpretação Goya ( templo vivente ): { arcana.tarot_crowley_goya_sign }</li>
                     </ul>

                  </Col>
                  <Col sm={12} md={6} lg={6}>
                     <h2>Referencias</h2>
                     <ul>
                        <li><a href={ arcana.link_wiki_mdd +`` } target="_blank"> Wiki Projeto Mayhem</a></li>
                        <li><a href={ arcana.link_youtube_cdh +`` } target="_blank">Video CdH</a></li>
                        <li><a href={ arcana.link_youtube_lupus +`` } target="_blank">Video Lupus In Fabula</a></li>
                        <li><a href={ arcana.link_youtube_jornada_do_ser +`` } target="_blank">Video Tarô Virtual</a></li>
                        <li>Tarot Hermetico: { arcana.pages_tarot_hermetico } pg</li>
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
                     <Image  className='img-fluid' alt='arcano Marselli' src={ arcana.image_marseille } />
                  </Col>
                  <Col sm={3} md={3} lg={3}>
                     <Image className='img-fluid' alt='arcano Crowley' src={ arcana.image_crowley } />
                  </Col>
                  <Col sm={3} md={3} lg={3}>
                     <Image className='img-fluid' alt='arcano CdH By Jiboli' src={ arcana.image_cdh } />
                  </Col>
               </Row>
            </Card.Footer>
         </Card>
      </Major_arcanas>
   )
}