import * as React from 'react';
import {departmentCardData} from '../../../assets/typings';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import DepartmentCard from '../../components/DepartmentCard';
import MainContainer from '../../components/MainContainer';
import { get_departmentDetails } from '../../services/dashboard.service'
import { SearchBar, Button} from '@rneui/themed'
import { useState } from 'react';
import { Appcontext } from '../../../AppContext';
import moment from 'moment';

const DashboardScreen = ({navigation}: any) => {
  const {state} = React.useContext(Appcontext);
  const [searchText, setSearchText] = useState('');
  const [fetch_data, setFetch_data] =  useState<Array<departmentCardData>>([])
  const [Data, setData] = React.useState(Array<departmentCardData>);

  const department_details = get_departmentDetails(state.data.id);

  React.useEffect(() => {
    department_details.then((res)=> {
      res? setFetch_data(res): {department:[], shifts:[]}
      res? setData(res) : {department:[], shifts:[]}
    });
  }, []);
  
  const handle_search = (text: string) => {
    setSearchText(text)
    let new_data = fetch_data.filter((row_data)=> row_data.department.title.toLowerCase().includes(text.toLowerCase()))
    setData(new_data? new_data: fetch_data)
    
  }
  
  const renderDepartmentCard = ({item}: any) => {

    const current_shift = item.shift.filter((shift)=>{
      let now = moment()
      let shift_time = moment(`${shift.shiftDate} ${shift.shiftTime}`,"YYYY/MM/DD HH:mm:ss")
      return (shift_time.isBefore(now) && shift_time.add(8, 'hours').isAfter(now))? shift: null
      // Use pop() because fileter() will return Array but we need only the first object that match with condition then we use pop() to get it <3
    }).pop()

    return <DepartmentCard
      detailScreenName={item.detailScreenName}
      department={item.department}
      shift={item.shift}
      currentShift={current_shift}
      testID="DepartmentCard"
    />
  };

  return (
    <MainContainer>
      <SearchBar
            placeholder='Search Here...'
            containerStyle={{backgroundColor: 'white', borderRadius: 15}}
            inputContainerStyle={{backgroundColor: '#eeee'}}
            round={true}
            lightTheme={true}
            value={searchText}
            onChangeText={(text)=>{
              handle_search(text)
            }}
          ></SearchBar>
      <FlatList style={ {width: '100%'}} data={Data} renderItem={renderDepartmentCard} />
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
