import React, { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Container, Image } from 'react-bootstrap';
import { Origin, Horoscope } from "circular-natal-horoscope-js";


import GraphInfos from '../../interfaces/GraphInfos';
import HoroscopeStruture from '../../interfaces/HoroscopeStruture';
import OriginStruture from '../../interfaces/OriginStruture';

import dataService from '../../services/data';

import { Divs } from './styles';
import Header from '../header';

import Graph from '../../components/graph';



const explode = (string: string) => {
    let grau = string.split("°");
    return grau[0];
}

function detail(horoscope: Horoscope): GraphInfos[] {
    const sephirothMapping: Record<string, string> = {
        keter: "neptune",
        chokmah: "uranus",
        binah: "saturn",
        daath: "pluto",
        chesed: "jupiter",
        geburah: "mars",
        tipheret: "sun",
        netzach: "venus",
        hod: "mercury",
        yesod: "moon",
        malkuth: "ascendant",
    };

    return Object.entries(sephirothMapping).map(([sephira, bodyKey]) => {
        const body = bodyKey === "ascendant"
            ? horoscope["Ascendant"]
            : horoscope["CelestialBodies"][bodyKey];

        return {
            sephira,
            graus: explode(body.ChartPosition.Ecliptic.ArcDegreesFormatted30),
            position: body.ChartPosition.Ecliptic.ArcDegreesFormatted30,
            sign: body.Sign.key,
            planet: body.key,
            point: (horoscope.Aspects.points as Record<string, any>)[bodyKey],
        } as GraphInfos;
    });
}



export default function Maps() {
    const [ origin, setOrigin ] = React.useState<OriginStruture>({
        year: 1974,
        month: 8,
        date: 9,
        hour: 19,
        minute: 55,
        latitude: -22.0702705,
        longitude: -48.4333875
    });
    const [ graphInfos, setGraphInfos ] = useState<GraphInfos[]>([]);

    const horoscopeData: HoroscopeStruture = {
        houseSystem: "placidus",
        zodiac: "tropical",
        aspectPoints: ['bodies', 'points', 'angles'],
        aspectWithPoints: ['bodies', 'points', 'angles'],
        aspectTypes: ["major", "minor", "conjunction", "opposition", "quincunx"],
        customOrbs: {},
        language: 'en',
        origin: new Origin(origin),
    };

    const horoscope = new Horoscope(horoscopeData);

    const [ angels, setAngels ] = useState<any[]>([]);
    const [ planets, setPlanets ] = useState<Record<string, { name: string }>>({});
    const [ signs, setSigns ] = useState<Record<string, { name: string }>>({});

    function angel_sign(sign: string, graus: number) {
        const signs = [
            'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
            'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
        ];
    
        const indice = signs.indexOf(sign);
        if (indice === -1) return null;
    
        const rangeIndex = Math.min(Math.floor(graus / 5), 5);
        const angel = angels[indice][sign][rangeIndex];
        return angel ? angel.angel : null; // Retorna apenas o nome do anjo
    }

    function getPlanetsName(planet: string) {
        return planets[planet]?.name ?? null;
    }

    function getSignName(sign: string) {
        const icons = {
            'aries': '♈',
            'taurus': '♉',
            'gemini': '♊',
            'cancer': '♋',
            'leo': '♌',
            'virgo': '♍',
            'libra': '♎',
            'scorpio': '♏',
            'sagittarius': '♐',
            'capricorn': '♑',
            'aquarius': '♒',
            'pisces': '♓'
        }
        
        
        if (icons.hasOwnProperty(sign)) {
            const icon = icons[sign as keyof typeof icons];
            const signName = signs[icon]?.name ?? '';
            return signName;
        }
    }

    useEffect(() => {
        async function getAngels() {
            dataService().getAngels()
                .then((result: any) => {
                    setAngels(result.data);
                })
                .catch((error: any) => {
                    console.log("🚀 ~ file: index.tsx:20 ~ Get_arcanas ~ error:", error)
                })
        }

        async function getPlanets() {
            dataService().getPlanet()
                .then((result: any) => {
                    console.log(`🚀 ~ index.tsx:117 ~ .then ~ result.data:`, result.data)
                    setPlanets(result.data);
                })
                .catch((error: any) => {
                    console.log("🚀 ~ file: index.tsx:20 ~ Get_arcanas ~ error:", error)
                })
        }

        async function getSigns() {
            dataService().getSigns()
                .then((result: any) => {
                    setSigns(result.data);
                })
                .catch((error: any) => {
                    console.log("🚀 ~ file: index.tsx:20 ~ Get_arcanas ~ error:", error)
                })
        }


        getAngels();
        getPlanets();
        getSigns();
    }, [origin]);

    useEffect(() => {
        if (!Array.isArray(angels) || angels.length === 0) {
            return;
        }
        const data = detail(horoscope);
        console.log(`🚀 ~ index.tsx:130 ~ useEffect ~ data:`, data)
        setGraphInfos(data);
        
    }
    , [angels, planets]);


    return (
        <Divs>
            <Header />
            <main>
                <Container fluid="md" className='pt-5'>
                    <Row>
                        <Col sm={12} md={12} lg={4} className='pb-3'>
                            <aside>
                                <Card >
                                    <Card.Body>
                                        <div  className='graphBackground p-2'>
                                            <Graph horoscope={horoscope} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </aside>
                        </Col>
                        <Col sm={12} md={12} lg={8} className='pb-3'>
                            <section>
                                <Card className='text-center'>
                                    <Card.Header>Mapas</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Mapas</Card.Title>
                                            {graphInfos.length > 0 ? (
                                                <table className="table table-striped table-bordered table-hover">
                                                    <thead>
                                                        <tr className='table-dark'>
                                                            <th scope='col'>Sephira</th>
                                                            <th scope='col'>Signo</th>
                                                            <th scope='col'>Planeta</th>
                                                            <th scope='col'>Posição</th>
                                                            <th scope='col'>Anjo</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {graphInfos.map((info, index) => (
                                                            <tr className='table-dark' key={index}>
                                                                <td>{info.sephira}</td>
                                                                <td>{getSignName(info.sign)}</td>
                                                                <td>{getPlanetsName(info.planet)}</td>
                                                                <td>{info.position}</td>
                                                                <td>{angel_sign(info.sign, parseInt(info.graus))}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : null}
                                    </Card.Body>
                                </Card>
                            </section>
                        </Col>
                    </Row>
                </Container>
            </main>

        </Divs>
    );
}