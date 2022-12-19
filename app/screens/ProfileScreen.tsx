import * as React from 'react';
import {Button, Text} from 'react-native';

const ProfileScreen = ({navigation, route}: any) => {
  return (
    <>
      <Text>This is {route.params.name}'s profile</Text>
      <Button
        title="back to Home"
        onPress={() => navigation.navigate('Dashboard')}
      />
    </>
  );
};

export default ProfileScreen;
