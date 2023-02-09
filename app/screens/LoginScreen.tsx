import React, { useContext } from 'react';
import { View } from 'react-native';
import LoginScreen from "react-native-login-screen";
import { Appcontext } from '../../AppContext';
import { Account, doLogin } from '../services/account.service';

function MyLoginScreen(props) {
    let {state,authContext} = useContext(Appcontext)
    let email = '';
    return (
        <LoginScreen
        logoImageSource={require("../../assets/favicon.png")}
        logoImageStyle={{
            width: 100,
            height: 100,
            marginTop: 30,
            marginBottom: 17,                  
        }}
        onLoginPress={ async () => {
            
            const res: Account = await doLogin(email.toLocaleLowerCase(), '1234');
            if (res.id)
                authContext.signIn(res);

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