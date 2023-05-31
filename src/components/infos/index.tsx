import React from 'react';
import { Card } from 'react-bootstrap';

import { Divs } from './styles';

import Major_arcana from '../major_arcana'

export default function Infos(props: any) {



   return(
      <Divs>
         <Major_arcana arcana={'mago'} />
      </Divs>
   )
}