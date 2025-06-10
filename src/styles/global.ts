import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
@font-face {
    font-family: 'SBL Hebrew';
    src: url('/assets/fonts/SBL_Hbrw.ttf') format('truetype');
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