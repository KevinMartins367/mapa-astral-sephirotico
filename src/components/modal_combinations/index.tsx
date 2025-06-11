import React, { useState, useEffect } from 'react';
import { Modal, Table } from 'react-bootstrap';


import { Modal_combinations_Styles } from './styles';

import data from '../../services/data';

export default function Modal_combinations(props: any) {
    const [combinations, setCombinations]: any = useState([]);
    const [listMajorArcanas, setListMajorArcanas]: any = useState([]);
    const [listMinorArcanas, setListMinorArcanas]: any = useState([]);
    const [MajorArcanas, setMajorArcanas]: any = useState([]);
    const [MinorArcanas, setMinorArcanas]: any = useState([]);
    const [ arcanaSelectedIndex, setArcanaSelectedIndex ] = useState('');
    const [ arcanaType, setArcanaType ] = useState('');

    useEffect(() => {

        setArcanaSelectedIndex('');
        setCombinations([]);
        setMajorArcanas([]);
        setMinorArcanas([]);
        setListMajorArcanas([]);
        setListMinorArcanas([]);
        setArcanaType('');
        async function Get_MajorArcanas() {
            const majorArcanas = await data().getTarot_Arcana_Major().then((result: any) => {
                return result.data;
            });
            setListMajorArcanas(majorArcanas);
        }

        async function Get_MinorArcanas() {
            const minorArcanas = await data().getTarot_Arcana_Minor().then((result: any) => {
                return result.data;
            });
            setListMinorArcanas(minorArcanas);
        }

        Get_MajorArcanas();
        Get_MinorArcanas();



        if(props.arcana_type === 'major') {
            const majorArcana = listMajorArcanas[props.arcana];
            setMajorArcanas(majorArcana);
            setCombinations(Object.entries(listMinorArcanas).map(([index, minorArcana]: [string, any]) => {
                return {
                    index,
                    name: minorArcana.name,
                };
            }));
            setArcanaType('minor');
        } else if(props.arcana_type === 'minor') {
            const minorArcana = listMinorArcanas[props.arcana];
            setCombinations(Object.entries(listMajorArcanas).map(([index, majorArcana]: [string, any]) => {
                return {
                    index,
                    name: majorArcana.name,
                };
            }));
            setMinorArcanas(minorArcana);
            setArcanaType('major');
        }
    }, [props.arcana]);

    useEffect(() => {
        if (arcanaSelectedIndex !== '') {
            console.log(`🚀 ~ index.tsx:63 ~ useEffect ~ arcanaSelectedIndex:`, arcanaSelectedIndex)
            if( arcanaType === 'major') {
                const selectedArcana = listMajorArcanas[arcanaSelectedIndex];
                setMajorArcanas(selectedArcana);
            } else if( arcanaType === 'minor') {
                const selectedArcana = listMinorArcanas[arcanaSelectedIndex];
                setMinorArcanas(selectedArcana);
            }
        }
    }, [arcanaSelectedIndex]);

    return (
        <Modal_combinations_Styles>
            <Modal show={props.show} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Combinações de {props.arcana}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="select-container">
                        <label htmlFor="combination-select">Escolha uma combinação:</label>
                        <select className="form-select form-select-lg mb-3" id="combination-select" onChange={(e) => {
                            const selectedIndex = e.target.value;
                            setArcanaSelectedIndex(selectedIndex);
                        }}>
                            {combinations.map((combination: any) => (
                                <option key={combination.index} value={combination.index}>
                                    {combination.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {arcanaSelectedIndex && (
                        <>
                            <h3>Combinação Selecionada:</h3>
                            <Table responsive="lg" striped bordered hover variant="dark" size="lg">
                                <thead>
                                    <tr>
                                        <th>-</th>
                                        <th>O que?</th>
                                        <th>Como?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Nome:</td>
                                        <td>{MinorArcanas.name}</td>
                                        <td>{MajorArcanas.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Síntese:</td>
                                        <td>{MinorArcanas.synthesis}</td>
                                        <td>{MajorArcanas.synthesis}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </Modal_combinations_Styles>
    );
}