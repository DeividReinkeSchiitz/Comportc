import React from 'react';

import {
   Container,
   Title,
   SelectStyled,
   TextContainer,
   Asterisk
} from './styles';

function SelectedInput(props) {
   return (
      <Container >
         <TextContainer>
            <Title>
               {props.title}
            </Title>
            <Asterisk>
               *
            </Asterisk>
         </TextContainer>

         <div onClick={props.onClick}>
            <SelectStyled
               value={props.value}
               onChange={props.onChange}
               options={props.options}
               placeholder={props.title}
               />
         </div>
      </Container>
   );
}

export default SelectedInput;