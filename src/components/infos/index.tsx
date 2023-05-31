import React from 'react';
import { Card } from 'react-bootstrap';

import { Divs } from './styles';

import Major_arcana from '../major_arcana'
import Minor_arcana from '../minor_arcana'

export default function Infos(props: any) {



   return(
      <Divs>
         <Minor_arcana arcana={'2♣️'} />
      </Divs>
   )
}