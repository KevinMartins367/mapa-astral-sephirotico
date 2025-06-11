import { createGlobalStyle } from 'styled-components';

let fontUrl = (process.env.REACT_APP_BASE_URL ?? `${window.location.origin}`)  + "assets/fonts/SBL_Hbrw.ttf";

export default createGlobalStyle`
@font-face {
    font-family: 'SBL Hebrew';
    src: url(${fontUrl}) format('truetype');
    font-weight: normal;
    font-style: normal;
}


body {
   color: ${props => props.theme.colors.text_color_primary} ;
   background-color: ${props => props.theme.colors.background_color_primary} ;

}

.card{
   color: ${props => props.theme.colors.text_color_primary} ;
   background-color: ${props => props.theme.colors.background_color_secondary} ;
}

.hebraic .kabbalah {
   font-family: 'SBL Hebrew';
}
.hebraic {
   font-family: 'SBL Hebrew';
   font-size: 42px;
}
`;