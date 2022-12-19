import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../config/colors';

const {black} = colors;

const StyledSmallText = styled.Text`
  font-size: 16px;
  color: ${black};
`;

const SmallText = (props: any) => {
  return <StyledSmallText {...props}>{props.children}</StyledSmallText>;
};

export default SmallText;
