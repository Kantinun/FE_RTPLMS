import React, { useContext } from 'react';
import { View } from 'react-native';
import LoginScreen from "react-native-login-screen";
import { Appcontext } from '../../AppContext';
import { Account, doLogin } from '../services/account.service';
import Toast from 'react-native-root-toast';

function MyLoginScreen(props) {
    let {state,authContext} = useContext(Appcontext)
    let email = '';
    let password = '';
    return (
        <LoginScreen
        logoImageSource={require("../../assets/favicon.png")}
        logoImageStyle={{
            width: 200,
            height: 200,
            marginTop: 30,
            marginBottom: 17,                  
        }}
        onLoginPress={ async () => {
            
            const res: Account = await doLogin(email.toLocaleLowerCase(), password);
            if (res.error){
                let toast = Toast.show('Email or Password incorrect', {
                    duration: Toast.durations.SHORT,
                    position: 50,
                    backgroundColor: 'red',
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
            }
            else if (res.id){
                authContext.signIn(res);
            }

        }}
        onSignupPress={() => {}}
        onEmailChange={(txt: string) => {
            email = txt
        }}
        onPasswordChange={(txt: string) => {password=txt}}
        disableSocialButtons={true}
        disableSignup
        emailPlaceholder='Username'
        />
    );
}

export default MyLoginScreen;