import React, {useState} from 'react'
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {setUserToken} from "../Globals/TokenStore";
import {UserLoginMessage} from "../Messages/UserLoginMessage";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const loginStore= create(() => ({
    userName:"",
    password:""
}))

export const setUserName= (userName:string) => loginStore.setState({ userName })
export const setPassword= (password:string) => loginStore.setState({ password })

export function Login({ navigation }: any){
    const {userName,password}=loginStore()
    return <View style={styles.container}>
        <TextInput placeholder={"用户名"} value={userName} onChangeText={(newText)=>setUserName(newText)}/>
        <TextInput placeholder={"密码"}  value={password} onChangeText={(newText)=>setPassword(newText)} secureTextEntry={true}/>
        <Pressable
            onPress={() => {
                    console.log("试图使用用户名"+userName+",密码"+password + "登录！")
                    fetch("http://localhost:6070/api", {
                        method: "POST",
                        headers: {},
                        body: JSON.stringify(new UserLoginMessage(userName, password))
                    }).then((response) => response.json()).then((replyJson) => {
                        console.log(replyJson)
                        if (replyJson.status === 0) {
                            setUserToken(replyJson.message)
                            navigation.navigate('Trace')
                        }
                        else {
                            alert(replyJson.message)
                        }
                    })
                    .catch((e) => console.log(e))
            }}
            style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
            })}>
            <Text> 登录 </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Register')}>
            <Text>切换至注册界面</Text>
        </Pressable>
        {/*<Pressable*/}
        {/*    onPress={() => navigation.navigate('NotFound')}*/}
        {/*    style={({ pressed }) => ({*/}
        {/*        opacity: pressed ? 0.5 : 1,*/}
        {/*    })}>*/}
        {/*    <Text> 按我跳转 </Text>*/}
        {/*</Pressable>*/}
        <StatusBar style="auto" />
    </View>
}