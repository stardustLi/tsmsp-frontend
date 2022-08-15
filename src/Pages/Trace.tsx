import React, {useState} from 'react'
import {FlatList, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {setUserToken, TokenStore} from "../Globals/TokenStore";
import {UserLoginMessage} from "../Messages/UserLoginMessage";
import {UserRegisterMessage} from "../Messages/UserRegisterMessage";
import {UserUpdateTraceMessage} from "../Messages/UserUpdateTraceMessage";
import {UserGetTraceMessage} from "../Messages/UserGetTraceMessage";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const registerStore= create(() => ({
    newTrace: "",
    traceHistory:["暂无踪迹"]
}))

export const setNewTrace= (newTrace:string) => registerStore.setState({ newTrace })
export const setTraceHistory = (traceHistory:string[]) => registerStore.setState({traceHistory})

export function Trace({ navigation }: any){
    const {token} = TokenStore()
    const {newTrace, traceHistory}=registerStore()
    return <View style={styles.container}>
        <TextInput placeholder={"新轨迹地点名称"} value={newTrace} onChangeText={(newText)=>setNewTrace(newText)}/>
        <Pressable
            onPress={() => {
                fetch("http://localhost:6070/api", {
                    method: "POST",
                    headers: {},
                    body: JSON.stringify(new UserUpdateTraceMessage(token, newTrace))
                }).then((response) => response.json()).then((replyJson) => {
                    console.log(replyJson)
                    if (replyJson.status === 0) {
                        alert(replyJson.message)
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
            <Text> 上传新轨迹 </Text>
        </Pressable>
        <Pressable onPress={() => {
                    fetch("http://localhost:6070/api", {
                        method: "POST",
                        headers: {},
                        body: JSON.stringify(new UserGetTraceMessage(token, new Date().getTime() - 86400000, new Date().getTime()))
                    }).then((response) => response.json()).then((replyJson) => {
                        console.log(replyJson)
                        if (replyJson.status === 0) {
                            setTraceHistory(JSON.parse(replyJson.message) as string[])
                        }
                        else {
                            alert(replyJson.message)
                        }
                    }).catch((e) => console.log(e))}}
                   style={({ pressed }) => ({
                       opacity: pressed ? 0.5 : 1,
                   })}>
            <Text>获取我的历史轨迹</Text>
        </Pressable>
        <FlatList data={traceHistory} renderItem={({item}) => <Text>{item}</Text>}/>
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