import styled from 'styled-components';
import Select from 'react-select';

export const Container = styled.div`
  display: flex;
  flex:1;
  align-self: flex-end;
  max-width:200px;
  flex-direction:column;
  margin-right:6vw;
  margin-bottom: 20px;
`;

export const TextContainer = styled.div`
   display:flex;
   flex:1;
   margin-bottom: 8px;
   justify-content:space-between;   
   -webkit-touch-callout: none; 
   -webkit-user-select: none; 
   -khtml-user-select: none; 
   -moz-user-select: none; 
   -ms-user-select: none; 
    user-select: none; 
`;

export const Title = styled.span`
   font-size:20px;
   color:white;
`;

export const Asterisk = styled.span`
   color:#7B61FF;
   font-size:25px;
`;

export const SelectStyled = styled(Select)`
`;
