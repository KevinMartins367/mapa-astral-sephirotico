import React from 'react';
import { Card } from 'react-bootstrap';

import { Divs } from './styles';

import Major_arcana from '../major_arcana'
import Minor_arcana from '../minor_arcana'
import Caractere_hebraico from '../caractere_hebraico'
import Sephiroth from '../sephiroth'

export default function Infos(props: any) {



   return(
      <Divs>
         <Sephiroth sephira={`kether`} />
         {/* <Minor_arcana arcana={`A♣️`} /> */}
         {/* <Major_arcana arcana={'louco'} /> */}
         {/* <Caractere_hebraico caractere={'tav'} /> */}
      </Divs>
   )
}