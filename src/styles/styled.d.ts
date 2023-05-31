import 'styled-components';

declare module 'styled-components' {
   export interface DefaultTheme {
      title: string;
   
      favicon: string;
      icon: string;
      icon_dark: string;
      colors: {
         primary: string;
         secondary:  string;
         text_color_primary: string;
         text_color_secondary: string;
         background_color_primary: string;
         background_color_secondary: string;
      }
   }
}