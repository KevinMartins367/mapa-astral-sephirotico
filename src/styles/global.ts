import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

body {
   color: ${props => props.theme.colors.primary} ;
   background-color: ${props => props.theme.colors.text_color_primary} ;

}
`;