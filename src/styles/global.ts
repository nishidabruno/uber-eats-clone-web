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
    --green: #06C167;
    --warning: #EED202 ;
    --shape_primary: #EEEEEE;
    --shape_secondary: #F6F6F6;
    --shape_dark: #E2E2E2;
    --text_light: #757575;
    --text_detail: #545454;
    --light_hover: #F0F0F0;
    --dark_hover: #1A1A1A;
    --error: #DA3633;
  }

  /* @media (max-width: 1080px) {
    html {
      font-size: 81.25%; // 13px
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 75%; // 12px
    }
  }
  
  @media (min-width: 1080px) {
    html {
      font-size: 87.5%; // 14px
    }
  } */

  html {
    font-size: 87.5%; /*  14px */
  }

  body {
    background-color: var(--primary);
  }

  body, input, textarea, button, select,::-webkit-file-upload-button {
    font: 400 1rem "Roboto", sans-serif;
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
