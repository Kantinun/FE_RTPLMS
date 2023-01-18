import * as React from 'react';
import {departmentCardData} from '../../assets/typings';
import {Button, FlatList, StyleSheet} from 'react-native';
import DepartmentCard from '../components/DepartmentCard';
import MainContainer from '../components/MainContainer';
import BigText from '../../assets/Texts/BigText';
import { getCurrentShifts } from '../services/dashboard.service'

const DashboardScreen = ({navigation}: any) => {
  const [Data, setData] = React.useState(Array<departmentCardData>);
  const DATA: Array<departmentCardData> = [
    {
      detailID: 1,
      title: 'ต้มไก่',
      productivity: 100,
      entered: 20,
      member: 20,
      detailScreenName: 'Detail',
    },
    {
      detailID: 2,
      title: 'ต้มไก่',
      productivity: 100,
      entered: 20,
      member: 20,
      detailScreenName: 'Detail',
    },
    {
      detailID: 3,
      title: 'ต้มไก่',
      productivity: 100,
      entered: 20,
      member: 20,
      detailScreenName: 'Detail',
    },
    {
      detailID: 4,
      title: 'ต้มไก่',
      productivity: 100,
      entered: 20,
      member: 20,
      detailScreenName: 'Detail',
    },
  ];

  const currentShifts = getCurrentShifts();
  
  React.useEffect(() => {
    currentShifts.then((res)=> {
      setData(res)
    });
  }, []);

  const renderDepartmentCard = ({item}: any) => (
    <DepartmentCard
      detailID={item.detailID}
      title={item.title}
      shiftCode={item.shiftCode}
      producttivity={item.productivity}
      entered={item.entered}
      member={item.member}
      detailScreenName={item.detailScreenName}
      testID="DepartmentCard"
    />
  );

  return (
    <MainContainer>
      <FlatList style={ {width: '100%'}} data={DATA} renderItem={renderDepartmentCard} />
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'left',
    width: '100%',
  },
  card_list: {
    justifyContent: 'center',
  },
});

export default DashboardScreen;
