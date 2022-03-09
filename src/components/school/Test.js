import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, Image, FlatList } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatGrid } from "react-native-super-grid";
import Http from 'smartstudent/src/libs/http';

class TestScreen extends Component {
    render() {
        return (
            <View style={style.container}>
                  <Text>Hola</Text>
            </View>
        )
    }
}

const style=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#FFF"
    },
    avatar: {
        height: 75,
        width: 75,
        resizeMode: 'cover',
        alignItems: 'center',
        borderRadius:75,
        overflow:"hidden"
    },
    circle: {
        height: 15,
        width: 15,
        resizeMode: 'stretch',
        alignItems: 'center',
        position:'absolute',
        left:60,
        top:5
    },
    listaItem: {
        alignItems:"center" 
    },
    tituloText: {
        fontSize:10
    }
});

export default TestScreen;