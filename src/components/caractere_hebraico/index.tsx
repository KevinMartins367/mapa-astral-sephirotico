import React, { useState, useEffect, useContext } from 'react';
import { Card } from 'react-bootstrap';

import { Caractere_hebraicos } from './styles';

import data from '../../services/data';

export default function Caractere_hebraico(props: any){

   const [ caractere, setCaractere ]: any = useState('');
   
   useEffect(() => {
      async function Get_caractere() {
         data().getCaractere_hebraico()
         .then((result: any) => {
            return result.data;

         })
         .then((full_caractere: any) => {         
            console.log("🚀 ~ file: index.tsx:20 ~ .then ~ full_caractere:", full_caractere)
            setCaractere(full_caractere[props.caractere])
         })
         .catch((error: any) => {
            console.log("🚀 ~ file: index.tsx:20 ~ Get_caractere ~ error:", error)
            
         })
      }
      Get_caractere();
      console.log("🚀 ~ file: index.tsx:28 ~ Caractere_hebraico ~ caractere:", caractere)
   }, []);
   
   return(
      <Caractere_hebraicos>
         <Card>
            <Card.Header>
               <h2>{ caractere.name ?? 'titulo de informações'}</h2>
            </Card.Header>
            <Card.Body>
               <ul>
                  <li>Significado: <span className='hebraic'>{ caractere.caractere_hebraico }</span> {  caractere.significance } </li>
                  <li>Valor: { caractere.value } </li>
                  <li>Letra equivalente: { caractere.caractere_romane } </li>
                  <li>Planeta:  { caractere.planeta } </li>
                  <li>Correspondencia:  { caractere.correspondence } </li>
                  <li>Qualidade Positiva: { caractere.positive_polarity } </li>
                  <li>Qualidade Negativa: { caractere.negative_polarity } </li>
                  <li>Pagina do Kabbalah Hermetica: { caractere.kabbalah_hermetica }. pg </li>
                  <li>Ritual: { caractere.exercise } </li>
               </ul>
            </Card.Body>
            <Card.Footer>

            </Card.Footer>
         </Card>
      </Caractere_hebraicos>
   )
}