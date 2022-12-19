import React from 'react';
import MainContainer from '../components/MainContainer';
import BigText from '../Texts/BigText';

const DetailScreen = ({route}: any) => {
  return (
    <MainContainer>
      <BigText>
        Welcome to detail page of department id {route.params.id}.
      </BigText>
    </MainContainer>
  );
};

export default DetailScreen;
