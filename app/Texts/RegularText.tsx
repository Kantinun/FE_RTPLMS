import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../config/colors';

const {black} = colors;

const StyledRegularText = styled.Text`
  font-size: 16px;
  color: ${black};
  shadow-offset: 0;
`;

const RegularText = (props: any) => {
  return <StyledRegularText {...props}>{props.children}</StyledRegularText>;
};

export default RegularText;
