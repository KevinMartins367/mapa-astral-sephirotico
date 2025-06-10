import React from 'react';
import { Card } from 'react-bootstrap';

import { Divs } from './styles';

import Sephiroth from '../sephiroth'
import Major_arcana from '../major_arcana';

export default function Infos(props: any) {
    const { sephira, path } = props;

    if (path && path != '') {
        return(
            <Divs>
                <Major_arcana arcana={path} />
            </Divs>
        )

    } else if (sephira && sephira != '') {

        return(
            <Divs>
                <Sephiroth sephira={sephira} />
            </Divs>
        )
    } else {
        
        return (
            <Divs>
                <Card className="text-center">
                    <Card.Body>
                        <Card.Text className='text-center p-5'>
                            Este é um projeto de código aberto para o Grimorio, uma ferramenta para consulta de dados da kabbalah, tarot e astrologia. O projeto é mantido por <a href='https://www.linkedin.com/in/kevin-martins-010532119/'>Kevin Martins</a>  , caso queira contribuir, entre em contato. Lembrando que o projeto é gratuito e não possui fins lucrativos, portanto, não é permitido o uso comercial. O projeto é um trabalho em andamento e pode conter erros. Caso encontre algum erro, por favor, entre em contato para que possamos corrigir, porém nem todas as sugestões serão aceitas, por varios motivos. 
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Divs>
        )
    }
}