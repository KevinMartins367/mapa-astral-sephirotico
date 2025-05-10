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
                    <Card.Header>Sephiroth</Card.Header>
                    <Card.Body>
                        <Card.Title>Sephiroth</Card.Title>
                        <Card.Text>
                            Clique em uma sephira para ver mais informações.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Divs>
        )
    }
}