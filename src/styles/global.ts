import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

body {
   color: ${props => props.theme.colors.text_color_primary} ;
   background-color: ${props => props.theme.colors.background_color_primary} ;

}

.card{
   color: ${props => props.theme.colors.text_color_primary} ;
   background-color: ${props => props.theme.colors.background_color_secondary} ;
}
`;