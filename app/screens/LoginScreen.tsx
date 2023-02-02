import React, { useContext } from 'react';
import { View } from 'react-native';
import LoginScreen from "react-native-login-screen";
import { Appcontext } from '../../AppContext';

function MyLoginScreen(props) {
    let {isAuthenticated} = useContext(Appcontext)
    let email = ''

    return (
        <LoginScreen
        logoImageSource={require("../../assets/favicon.png")}
        onLoginPress={() => {
            if (email==='worker'||email=='manager')
                props.tmp.signIn({role: email})

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