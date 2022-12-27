import * as React from 'react';
import {departmentCardData} from '../../assets/typings';
import {Button, FlatList, StyleSheet} from 'react-native';
import DepartmentCard from '../components/DepartmentCard';
import MainContainer from '../components/MainContainer';
import BigText from '../Texts/BigText';
import env from '../config/env';

const DashboardScreen = ({navigation}: any) => {
  const [Data, setData] = React.useState(Array<departmentCardData>);
  // const DATA: Array<departmentCardData> = [
  //   {
  //     detailID: 1,
  //     title: 'ต้มไก่',
  //     productivity: 100,
  //     entered: 20,
  //     member: 20,
  //     detailScreenName: 'Detail',
  //   },
  //   {
  //     detailID: 2,
  //     title: 'ต้มไก่',
  //     productivity: 100,
  //     entered: 20,
  //     member: 20,
  //     detailScreenName: 'Detail',
  //   },
  //   {
  //     detailID: 3,
  //     title: 'ต้มไก่',
  //     productivity: 100,
  //     entered: 20,
  //     member: 20,
  //     detailScreenName: 'Detail',
  //   },
  //   {
  //     detailID: 4,
  //     title: 'ต้มไก่',
  //     productivity: 100,
  //     entered: 20,
  //     member: 20,
  //     detailScreenName: 'Detail',
  //   },
  // ];
  const getCurrentShifts = async () => {
    try {
      const res = await fetch(`${env.API_BASE}:${env.API_PORT}/dashboard/1`);
      const json = await res.json();
      setData(dataHandler(json));
;
    } catch (error) {
      console.error(error);
    }
  };

const dataHandler = (data) => {
  let res: any = [];
  const len = data.department.length;
  for(let i=0; i < len ; i++){
    let shift = data.shifts[i].pop();
    let newData = {
      detailID: parseInt(data.department[i].department_id),
      title: String(data.department[i].name),
      productivity: parseInt(shift.successProduct),
      entered: parseInt(shift.allMember),
      member: parseInt(shift.checkInMember),
      detailScreenName: 'Detail',
    }
    console.log(newData);
    res.push(newData);
  }
  return res;
};
  React.useEffect(() => {
    getCurrentShifts();
  }, []);

  const renderDepartmentCard = ({item}: any) => (
    <DepartmentCard
      detailID={item.detailID}
      title={item.title}
      producttivity={item.productivity}
      entered={item.entered}
      member={item.member}
      detailScreenName={item.detailScreenName}
      testID="DepartmentCard"
    />
  );

  return (
    <MainContainer>
      <BigText style={styles.header}>ภาพรวมแผนก</BigText>
      <FlatList style={ {width: '100%'}} data={Data} renderItem={renderDepartmentCard} />
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
});

export default DashboardScreen;
