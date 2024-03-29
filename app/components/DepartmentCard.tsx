/* eslint-disable react-native/no-inline-styles */
import {NavigationProp, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../config/colors';
import BigText from '../../assets/Texts/BigText';
import RegularText from '../../assets/Texts/RegularText';
import moment from 'moment';
import { useEffect } from 'react';

const {white, black, primary} = colors;

const CardView = styled.View`
  flex-direction: column;
  width: 100%;
  height: 158px;
  padding-vertical: 10px;
  margin-top: 8px;
  background-color: ${white};
  border-width: 0.5px;
  border-radius: 15px;
  border-color: #aaaa
  shadow-color: ${black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
`;

const CardHeadeer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 24px;
  border-color: #7777
`;

const CardBody = styled.View`
  justify-content: space-around;
  align-items: center;
  padding-horizontal: 24px;
`;




const DepartmentCard = (props: any) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const screenName = props.detailScreenName;

  const [currentShift, setCurrentShift] = React.useState(props.currentShift);

  React.useEffect(()=>{
    if(currentShift != props.currentShift){
      setCurrentShift(props.currentShift);
    }
  },[props.currentShift]);
  
  return (
    <CardView {...props}>
      <CardHeadeer style={{height: '20%', borderBottomWidth: 0.2}}>
        <RegularText>{props.department.title ? props.department.title : 'ชื่อแผนก'}</RegularText>
        <RegularText
          style={[{color: primary}, !currentShift && {color: 'grey'}]}
          onPress={() => {
            navigation.navigate(screenName, {
              department: props.department,
              shift: props.currentShift
            })
          }}
          testID="DepartmentCard.DetailLink"
          disabled={!currentShift ? true : false}
        >
          รายละเอียด
        </RegularText>
      </CardHeadeer>
      { typeof currentShift != "undefined" ?
        <CardBody style={{height: '80%'}}>
        <RegularText>
          กำลังการผลิต: <BigText>{props.currentShift.actualPerformance.toFixed(2)} </BigText>
          กก./ชม.
        </RegularText>
        <RegularText>
          เข้างานแล้ว:
          <BigText>
            {' '}
            {props.currentShift.entered}/{props.currentShift.member}{' '}
          </BigText>
          คน
        </RegularText>
      </CardBody>
      :
      <CardBody style={{height: '80%'}}>
        <RegularText>No running shift</RegularText>
      </CardBody>
      }
    </CardView>
  );
};

export default DepartmentCard;
