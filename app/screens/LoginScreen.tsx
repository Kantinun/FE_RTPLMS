import React, { useState } from 'react';
import { View } from 'react-native';
import LoginScreen from "react-native-login-screen";

function MyLoginScreen(props) {
    // const [email,setEmail] = useState('')
    let email = ''
    return (
        <LoginScreen
        logoImageSource={require("../../assets/favicon.png")}
        onLoginPress={() => {props.loginHandler(email)}}
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