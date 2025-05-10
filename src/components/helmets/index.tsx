import React, { useContext } from 'react';
import { Helmet } from "react-helmet";
import { ThemeContext } from 'styled-components';


export default function Helmets() {

    const theme = useContext(ThemeContext)!;

    return (
        <Helmet>
            <meta charSet="utf-8" />
            <link rel="icon" href={`${theme.favicon}`} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content={`${theme.colors.primary}`} />
            <link rel="apple-touch-icon" href={`${theme.favicon}`} />
            <title>Grimório open source</title>
            <link rel="canonical" href="http://mysite.com/example" />
            <meta name="description" content="Este é um Grimório Open Source, sobre tarot, kabbalah e astrologia, navegue pela arvore da vida para acessar os conhecimentos" />
        </Helmet>
    )
}