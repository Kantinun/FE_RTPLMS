import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../config/colors';

const {white} = colors;

const StyledMain = styled.View`
  flex: 1;
  padding: 0 8px;
  backgroundcolor: ${white};
  // align-items: center;
  overflow: scroll;
`;
Object
const MainContainer = (props: any) => {
  return <StyledMain {...props}>{props.children}</StyledMain>;
};

export default MainContainer;
