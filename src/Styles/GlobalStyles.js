import { createGlobalStyle } from 'styled-components';

 
const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    outline:none;
  }
  html, body, #root{
    width:100%;
    height:100%;
    
    max-height: 100vh;
    max-width: 100vw;
  }
  body {
    margin: 0;
    padding: 0;
    background: #2C2C2C;
    font-family: Dosis;

    --primary: #C4C4C4;
    --secundary: #7B61FF;
    --background: #2C2C2C;
  } 
  button {
    cursor:pointer;
  }
    
  *,button,input{
    border:0;
    background:norange;
  }

`;
 
export default GlobalStyle;