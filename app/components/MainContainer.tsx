import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../config/colors';

const {white} = colors;

const StyledMain = styled.View`
  flex: 1;
  padding: 24px;
  backgroundcolor: ${white};
  alignitems: center;
  overflow: scroll;
`;

const MainContainer = (props: any) => {
  return <StyledMain {...props}>{props.children}</StyledMain>;
};

export default MainContainer;
