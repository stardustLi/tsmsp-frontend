import React, {useState} from 'react'
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {setUserToken} from "../Globals/TokenStore";
import {UserLoginMessage} from "../Messages/UserLoginMessage";
import {UserRegisterMessage} from "../Messages/UserRegisterMessage";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const registerStore= create(() => ({
    userName:"",
    password:"",
    realName:"",
}))

export const setUserName= (userName:string) => registerStore.setState({ userName })
export const setPassword= (password:string) => registerStore.setState({ password })
export const setRealName= (realName:string) => registerStore.setState({ realName })

export function Register({ navigation }: any){
    const {userName,password, realName}=registerStore()
    return <View style={styles.container}>
        <TextInput placeholder={"用户名"} value={userName} onChangeText={(newText)=>setUserName(newText)}/>
        <TextInput placeholder={"密码"}  value={password} onChangeText={(newText)=>setPassword(newText)} secureTextEntry={true}/>
        <TextInput placeholder={"真实姓名"}  value={realName} onChangeText={(newText)=>setRealName(newText)}/>
        <Pressable
            onPress={() => {
                console.log("试图使用用户名"+userName+",密码"+password + ",真实姓名"+realName + "登录！")
                fetch("http://localhost:6070/api", {
                    method: "POST",
                    headers: {},
                    body: JSON.stringify(new UserRegisterMessage(userName, password, realName))
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
            <Text> 注册 </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Root')}>
            <Text>切换至登录界面</Text>
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