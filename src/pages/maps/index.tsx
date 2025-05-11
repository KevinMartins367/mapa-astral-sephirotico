import React, { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Container, Form, Button, Table } from 'react-bootstrap';
import { Origin, Horoscope } from "circular-natal-horoscope-js";


import GraphInfos from '../../interfaces/GraphInfos';
import HoroscopeStruture from '../../interfaces/HoroscopeStruture';
import OriginStruture from '../../interfaces/OriginStruture';

import dataService from '../../services/data';

import { Divs } from './styles';
import Header from '../header';

import Graph from '../../components/graph';
import KabbalahAngles from '../../components/kabbalah_angels';
import Autocomplete from '../../components/autocomplete';



const explode = (string: string) => {
    let grau = string.split("°");
    return grau[0];
}

function detail(horoscope: Horoscope): GraphInfos[] {
    const sephirothMapping: Record<string, string> = {
        kether: "neptune",
        chokmah: "uranus",
        binah: "saturn",
        daath: "pluto",
        chesed: "jupiter",
        geburah: "mars",
        tipheret: "sun",
        netzach: "venus",
        hod: "mercury",
        yesod: "moon",
        malkut: "ascendant",
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
    // const [origin, setOrigin] = React.useState<OriginStruture | null>({
    //     date: 3,
    //     month: 8,
    //     year: 1997,
    //     hour: 8,
    //     minute: 20,
    //     latitude: -23.603889,
    //     longitude: -46.918889,
    // });
    
    const [origin, setOrigin] = React.useState<OriginStruture | null>(null);
    const [graphInfos, setGraphInfos] = useState<GraphInfos[]>([]);
    const [horoscope, setHoroscope] = useState<Horoscope | null>(null);
    const [horoscopeData, setHoroscopeData] = useState<HoroscopeStruture | null>(null);

    const [angels, setAngels] = useState<any[]>([]);
    const [planets, setPlanets] = useState<Record<string, { name: string }>>({});
    const [signs, setSigns] = useState<Record<string, { name: string }>>({});
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    function angel_sign(sign: string, graus: number) {
        const signs = [
            'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
            'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
        ];

        const indice = signs.indexOf(sign);
        if (indice === -1) return null;

        const rangeIndex = Math.min(Math.floor(graus / 5), 5);
        const angel = angels[indice][sign][rangeIndex];
        return angel;
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
    function onSephiraChange(sephira: string) {

    }

    function setLagAndLat(val: any) {
        setLatitude(val.lat);
        setLongitude(val.lng);

    }

    function generateMaps(UserOrigin: OriginStruture) {
    
        const horoscopeData: HoroscopeStruture = {
            houseSystem: "placidus",
            zodiac: "tropical",
            aspectPoints: ['bodies', 'points', 'angles'],
            aspectWithPoints: ['bodies', 'points', 'angles'],
            aspectTypes: ["major", "minor", "conjunction", "opposition", "quincunx"],
            customOrbs: {},
            language: 'en',
            origin: new Origin(UserOrigin as any),
        };

        setHoroscopeData(horoscopeData);
        const horoscope = new Horoscope(horoscopeData);
        setHoroscope(horoscope);



    }


    useEffect(() => {

        if (origin) {
            generateMaps(origin);
        }
    }, [origin]);

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
    }, []);

    useEffect(() => {
        if (!Array.isArray(angels) || angels.length === 0 || !horoscope) {
            return;
        }
        let data = detail(horoscope);
        data = data.map((item) => {
            const sign = item.sign;
            const angel = angel_sign(sign, parseInt(item.graus));
            if (angel.angel) {
                item.angel = angel;
            }
            item.sign = getSignName(item.sign) || '';
            item.planet = getPlanetsName(item.planet) || '';
            return item;
        });
        setGraphInfos(data);

    }
        , [horoscope, angels, planets]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let newOrigin = {
            year: parseInt(date.split('-')[0]),
            month: parseInt(date.split('-')[1]) - 1,
            date: parseInt(date.split('-')[2]),
            hour: parseInt(time.split(':')[0]),
            minute: parseInt(time.split(':')[1]),
            state: state,
            latitude: latitude,
            longitude: longitude,

        };
        console.log(`🚀 ~ index.tsx:223 ~ handleSubmit ~ newOrigin:`, newOrigin)
        setOrigin(newOrigin);

    }


    return (
        <Divs>
            <Header />
            <main>
                <Container fluid="md" className='pt-5'>
                    <Row>
                        <Col sm={12} md={12} lg={12} className='pb-3'>
                            <Card className='text-center'>
                                <Card.Body>
                                    <Form onSubmit={(event) => handleSubmit(event)}>
                                        <Row>
                                            <Col sm={12} md={12} lg={2}>
                                                <Form.Group className="mb-3" controlId="Date">
                                                    <Form.Label>Data</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        placeholder="Data"
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={12} lg={2}>
                                                <Form.Group className="mb-3" controlId="Hora">
                                                    <Form.Label>Hora</Form.Label>
                                                    <Form.Control
                                                        type="time"
                                                        placeholder="Hora"
                                                        value={time}
                                                        onChange={(e) => setTime(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={12} lg={2}>
                                                <Form.Group className="mb-3" controlId="Estado">
                                                    <Form.Label>Estado</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Estado"
                                                        value={state}
                                                        onChange={(e) => setState(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={12} lg={2}>
                                                <Form.Group className="mb-3" controlId="Cidade">
                                                    <Form.Label>Cidade</Form.Label>
                                                    <Autocomplete
                                                        state={state}
                                                        onSelect={(val: any) => setLagAndLat(val)} />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={12} lg={2}>
                                            </Col>
                                            <Col sm={12} md={12} lg={2} className='pt-3'>
                                                <Button variant="primary" type="submit">
                                                    Produzir
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>

                        </Col>
                        {horoscope ? (
                            <>
                                <Col sm={12} md={12} lg={4} className='pb-3'>
                                    <aside>
                                        <Card  className='text-center'>
                                            <Card.Header>Mapa Astral</Card.Header>
                                            <Card.Body>
                                                <div className='graphBackground p-2'>
                                                    <Graph horoscope={horoscope} />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </aside>
                                </Col>
                                <Col sm={12} md={12} lg={8} className='pb-3'>
                                    <section>
                                        <Card className='text-center'>
                                            <Card.Body>
                                                {graphInfos.length > 0 ? (
                                                    <Table responsive className="table table-striped table-bordered table-hover">
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
                                                                    <td>{info.sign}</td>
                                                                    <td>{info.planet}</td>
                                                                    <td>{info.position}</td>
                                                                    <td>{info.angel.angel}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                ) : null}
                                            </Card.Body>
                                        </Card>
                                    </section>
                                </Col>
                                <Col sm={12} md={12} lg={4} className='pb-3'>
                                    <aside>
                                        <Card className='text-center'>
                                            <Card.Header>Mapa Sephirotico</Card.Header>
                                            <Card.Body>
                                                <KabbalahAngles angels={graphInfos} onSephiraChange={onSephiraChange} />
                                            </Card.Body>
                                        </Card>
                                    </aside>
                                </Col>
                                <Col sm={12} md={12} lg={8} className='pb-3'>
                                    <section>
                                        <Card className='text-center'>
                                            <Card.Body>
                                                {graphInfos.length > 0 ? (
                                                    <Table responsive className="table table-striped table-bordered table-hover">
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
                                                                    <td>{info.sign}</td>
                                                                    <td>{info.planet}</td>
                                                                    <td>{info.position}</td>
                                                                    <td>{info.angel.angel}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                ) : null}
                                            </Card.Body>
                                        </Card>
                                    </section>
                                </Col>
                            </>
                        ) : (
                            <Col sm={12} md={12} lg={12} className='pb-3'>
                                <Card className='text-center'>
                                    <Card.Body>
                                        <Card.Title>Selecione uma data, hora e cidade</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}

                    </Row>
                </Container>
            </main>

        </Divs>
    );
}