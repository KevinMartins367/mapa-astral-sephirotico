import React from 'react';
import { Card } from 'react-bootstrap';

import { Divs } from './styles';

import Sephiroth from '../sephiroth'
import Major_arcana from '../major_arcana';
import Modal_combinations from '../modal_combinations';

export default function Infos(props: any) {
    const { sephira, path } = props;

    const [showModal, setShowModal] = React.useState(false);
    const [selectedArcana, setSelectedArcana] = React.useState('');
    const [arcanaType, setArcanaType] = React.useState('');

    const handleShowModal = (arcana: string, type: string) => {
        setSelectedArcana(arcana);
        setArcanaType(type);
        setShowModal(true);
    };

    let content;

    if (path && path !== '') {
        content = (
            <Major_arcana arcana={path} showModal={handleShowModal} />
        );

    } else if (sephira && sephira !== '') {
        content = (
            <Sephiroth sephira={sephira} showModal={handleShowModal} />
        );
    } else {
        content = (
            <Card className="text-center">
                <Card.Body>
                    <Card.Text className='text-center p-5'>
                        Este é um projeto de código aberto para o Grimorio, uma ferramenta para consulta de dados da kabbalah, tarot e astrologia. O projeto é mantido por <a href='https://www.linkedin.com/in/kevin-martins-010532119/'>Kevin Martins</a>  , caso queira contribuir, entre em contato. Lembrando que o projeto é gratuito e não possui fins lucrativos, portanto, não é permitido o uso comercial. O projeto é um trabalho em andamento e pode conter erros. Caso encontre algum erro, por favor, entre em contato para que possamos corrigir, porém nem todas as sugestões serão aceitas, por varios motivos. 
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Divs>
            {content}
            <Modal_combinations
                show={showModal}
                onHide={() => setShowModal(false)}
                arcana={selectedArcana}
                arcana_type={arcanaType}
            />
        </Divs>
    );
}