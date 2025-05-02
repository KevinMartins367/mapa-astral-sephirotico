import React, { useContext } from 'react';
import {Helmet} from "react-helmet";
import { ThemeContext } from 'styled-components';


export default function Helmets() {

   const theme = useContext(ThemeContext)!;

   return(
      <Helmet>
         <meta charSet="utf-8" />
         <link rel="icon" href={`${theme.favicon}`} />
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <meta name="theme-color" content={`${theme.colors.primary}`} />
         <meta name="description" content="Web site created using create-react-app" />
         <link rel="apple-touch-icon" href={`${theme.favicon}`} />
         <title>mapa-astral-sephirotico</title>
         <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
   )
}