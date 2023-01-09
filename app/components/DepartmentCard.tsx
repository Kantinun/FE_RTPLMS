/* eslint-disable react-native/no-inline-styles */
import {NavigationProp, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../config/colors';
import BigText from '../../assets/Texts/BigText';
import RegularText from '../../assets/Texts/RegularText';

const {white, black, primary} = colors;

const CardView = styled.View`
  flex-direction: column;
  width: 100%;
  height: 158px;
  padding-vertical: 10px;
  margin-top: 8px;
  background-color: ${white};
  border-width: 0.5px;
  border-radius: 4px;
  shadow-color: ${black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
`;

const CardHeadeer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 24px;
`;

const CardBody = styled.View`
  justify-content: space-around;
  align-items: center;
  padding-horizontal: 24px;
`;

const DepartmentCard = (props: any) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const screenName = props.detailScreenName;
  return (
    <CardView {...props}>
      <CardHeadeer style={{height: '20%', borderBottomWidth: 0.2}}>
        <RegularText>{props.title ? props.title : 'ชื่อแผนก'}</RegularText>
        <RegularText
          style={{color: primary}}
          onPress={() => {
            navigation.navigate(screenName, {
              id: props.detailID,
              shiftCode: props.shiftCode,
            })
          }}
          testID="DepartmentCard.DetailLink">
          รายละเอียด
        </RegularText>
      </CardHeadeer>
      <CardBody style={{height: '80%'}}>
        <RegularText>
          กำลังการผลิต: <BigText>{props.producttivity} </BigText>
          กก./ชม.
        </RegularText>
        <RegularText>
          เข้างานแล้ว:
          <BigText>
            {' '}
            {props.entered}/{props.member}{' '}
          </BigText>
          คน
        </RegularText>
      </CardBody>
    </CardView>
  );
};

export default DepartmentCard;
