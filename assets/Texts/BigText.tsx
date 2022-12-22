import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../app/config/colors';

const {black} = colors;

const StyledBigText = styled.Text`
  font-size: 30px;
  font-weight: 500;
  color: ${black};
  text-align: center;
`;

const BigText = (props: any) => {
  return <StyledBigText {...props}>{props.children}</StyledBigText>;
};

export default BigText;
