import * as React from 'react';
import {departmentCardData} from '../../../assets/typings';
import {FlatList, StyleSheet} from 'react-native';
import DepartmentCard from '../../components/DepartmentCard';
import MainContainer from '../../components/MainContainer';
import BigText from '../../../assets/Texts/BigText';
import { getCurrentShifts } from '../../services/dashboard.service'
import { SearchBar, Button} from '@rneui/themed'
import { useState } from 'react';

const DashboardScreen = ({navigation}: any) => {
  const [searchText, setSearchText] = useState('');
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
      title: 'ทอดไก่',
      productivity: 100,
      entered: 20,
      member: 20,
      detailScreenName: 'Detail',
    },
    {
      detailID: 3,
      title: 'ตุ๋นไก่',
      productivity: 100,
      entered: 20,
      member: 20,
      detailScreenName: 'Detail',
    },
    {
      detailID: 4,
      title: 'นึ่งไก่',
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

  // const renderDepartmentCard = ({data}: any) => {
  //   console.log('===============\n');
  //   console.log(data);
  //   console.log('=============');
  //   return <DepartmentCard
  //   // Data send into Card
  //   // struct in dashboard.service
  //     detailID={data.department.id}
  //     title={data.department.title}
  //     shift={data.shift}
  //     detailScreenName={data.detailScreenName}
  //     testID="DepartmentCard"
  //   />
  // };

  const renderDepartmentCard = ({item}: any) => (
    <DepartmentCard
      detailScreenName={item.detailScreenName}
      department={item.department}
      shift={item.shift}
      testID="DepartmentCard"
    />
  );

  // console.log(Data[0].department);
  return (
    <MainContainer>
      <SearchBar
            placeholder='Search Here...'
            containerStyle={{backgroundColor: 'white', borderRadius: 15}}
            inputContainerStyle={{backgroundColor: '#eeee'}}
            round={true}
            lightTheme={true}
            value={searchText}
            onChange={(text)=>{setSearchText(text)}}
          ></SearchBar>
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
  card_list: {
    justifyContent: 'center',
  },
});

export default DashboardScreen;
