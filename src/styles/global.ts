import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary: #FFFFFF;
    --secondary: #000000;
    --success: #419155;
    --success_hover: #5ba76e;
    --success_active: #74be87;
    --green: #06C167;
    --warning: #EED202 ;
    --shape_primary: #EEEEEE;
    --shape_secondary: #F6F6F6;
    --shape_dark: #E2E2E2;
    --text_light: #757575;
    --text_detail: #545454;
    --light_hover: #F0F0F0;
    --light_active: #DBDBDB;
    --dark_hover: #1A1A1A;
    --dark_active: #333333;
    --error: #DA3633;
  }

  html {
    font-size: 87.5%; /*  14px */
  }

  body {
    background-color: var(--primary);
  }

  body, input, textarea, button, select,::-webkit-file-upload-button {
    font: 400 1rem "Roboto", "Noto Sans JP", sans-serif;
  }

  button {
    cursor: pointer;
    border: none;
  }

  a {
    text-decoration: none;
    color: var(--secondary)
  }
`;
