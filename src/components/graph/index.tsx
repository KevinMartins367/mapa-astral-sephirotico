import React, { useEffect, useRef, useState } from 'react';
import { Origin, Horoscope } from "circular-natal-horoscope-js";
import { Chart } from "@astrodraw/astrochart";

import { GraphUser } from './styles';

import dataService from '../../services/data';


function generateChartData(horoscope: Horoscope) {
    const { CelestialBodies, CelestialPoints, Houses } = horoscope;

    const planetsData = {
        Moon: [CelestialBodies.moon.ChartPosition.Ecliptic.DecimalDegrees],
        Venus: [CelestialBodies.venus.ChartPosition.Ecliptic.DecimalDegrees],
        Jupiter: [CelestialBodies.jupiter.ChartPosition.Ecliptic.DecimalDegrees],
        NNode: [CelestialPoints.northnode.ChartPosition.Ecliptic.DecimalDegrees],
        Lilith: [CelestialPoints.lilith.ChartPosition.Ecliptic.DecimalDegrees],
        Mars: [CelestialBodies.mars.ChartPosition.Ecliptic.DecimalDegrees],
        Saturn: [CelestialBodies.saturn.ChartPosition.Ecliptic.DecimalDegrees],
        Chiron: [CelestialBodies.chiron.ChartPosition.Ecliptic.DecimalDegrees],
        Uranus: [CelestialBodies.uranus.ChartPosition.Ecliptic.DecimalDegrees],
        Sun: [CelestialBodies.sun.ChartPosition.Ecliptic.DecimalDegrees],
        Mercury: [CelestialBodies.mercury.ChartPosition.Ecliptic.DecimalDegrees],
        Neptune: [CelestialBodies.neptune.ChartPosition.Ecliptic.DecimalDegrees],
        Pluto: [CelestialBodies.pluto.ChartPosition.Ecliptic.DecimalDegrees],
    };

    const cusps = Array.from({ length: 12 }, (_, i) => Houses[i]["ChartPosition"]["StartPosition"]["Ecliptic"]["DecimalDegrees"]
    );

    return { planets: planetsData, cusps };
}

export default function Graph(props: any) {
    const chartRef = useRef<HTMLDivElement>(null);
    const [ signs, setSigns ]: any = useState([]);

    useEffect(() => {

        async function getSigns() {
            dataService().getSigns()
                .then((result: any) => {
                    return result.data;

                })
                .then((full_arcana: any) => {
                    setSigns(Object.entries(full_arcana).map(([key, value]) => {
                        return [value];
                    }))
                })
                .catch((error: any) => {
                    console.log("🚀 ~ file: index.tsx:20 ~ Get_arcanas ~ error:", error)

                })
        }

        if (props.horoscope && props.horoscope != '') {
            getSigns();
        }

    }, [props.horoscope]);

    useEffect(() =>{
        
        if (!Array.isArray(signs) && signs.length === 0) {
            return;
        }
        const CHART_SETTINGS = {
            COLORS_SIGNS: Array.isArray(signs) ? signs.map((sign: any) => sign[0].color) : [],
            MARGIN: 80,
            SYMBOL_SCALE: 1,
            POINTS_TEXT_SIZE: 11,
        }
        if ( CHART_SETTINGS.COLORS_SIGNS.length === 0) {
            return;
        }
        const data = generateChartData(props.horoscope);


        if (chartRef.current) {
            const graphDiv = document.getElementById('graph_user');
            if (graphDiv) {
                // verifique se ja existe um svg no graphDiv e remova-o
                const existingSvg = graphDiv.querySelector('svg');
                if (existingSvg) {
                    existingSvg.remove();
                }
            }
            let width = 700;
            let height = 700;
            if (window.innerWidth < 768) {
                width = 600;
                height = 600;
            }

            const chart = new Chart(chartRef.current.id, width, height, CHART_SETTINGS);
            chart.radix(data).aspects();
        }
    }, [signs])

    return (
        <GraphUser>
            <div id='graph_user' ref={chartRef}></div>
        </GraphUser>
    );
}
