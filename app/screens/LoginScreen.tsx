import React, { useContext } from 'react';
import { View } from 'react-native';
import LoginScreen from "react-native-login-screen";
import { Appcontext } from '../../AppContext';

function MyLoginScreen(props) {
    let {state,authContext} = useContext(Appcontext)
    let email = ''
    return (
        <LoginScreen
        logoImageSource={require("../../assets/favicon.png")}
        logoImageStyle={{
            width: 100,
            height: 100,
            marginTop: 30,
            marginBottom: 17,                  
        }}
        onLoginPress={() => {
            if (email==='worker'||email=='manager')
                authContext.signIn({role: email})

        }}
        onSignupPress={() => {}}
        onEmailChange={(txt: string) => {
            email = txt
        }}
        onPasswordChange={(password: string) => {}}
        disableSocialButtons={true}
        emailPlaceholder='Username'
        />
    );
}

export default MyLoginScreen;