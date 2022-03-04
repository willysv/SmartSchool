import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, ImageBackground, Image } from 'react-native';
import { TextInput } from "react-native-gesture-handler";

class LoginScreen extends Component {

    showMessage() {
        console.log("Presionando boton");
    }

    render() {
        return (
            <View style={style.container}>
                 <ImageBackground source={require('smartstudent/src/assets/background.png')} resizeMode="cover" style={style.image}>
                     <View style={style.logoContainer}>
                        <Image
                            style={style.logo}
                            source={require('smartstudent/src/assets/logo.png')}
                        />
                    </View>
                    <View style={style.groupData}>
                        <View style={style.sectionStyle}>
                            <Image
                                source={{
                                uri:
                                    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/input_username.png',
                                }}
                                style={style.imageStyle}
                            />
                            <TextInput
                                style={{flex: 1}}
                                placeholder="Username"
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={style.textInput}>
                            <TextInput
                                placeholder="Contraseña"
                                secureTextEntry={true}
                            />
                        </View>
                        <Pressable onPress={()=>this.showMessage()}>
                            <View style={style.btnSesion}>
                                <Text style={style.txtSession}>Entrar</Text>
                            </View>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const style=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#00F"
    },
    textInput: {
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff",
        marginLeft:15,
        marginRight:15,
        marginTop:10,
        borderRadius:10
    },
    btnSesion: {
        marginTop:20,
        marginLeft:30,
        marginRight:30,
        backgroundColor:"#aabbcc",
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50
    },
    txtSession:{
        color:"#fff",
        fontSize:20,
        fontWeight:"bold"
    },
    image: {
        flex: 1,
        justifyContent:"flex-start"
    },
    logo: {
        width: 300,
        height:45,
        resizeMode: 'stretch'
    },
    logoContainer: {
        justifyContent:"center",
        flex:0,
        flexDirection:"row",
        marginTop:250
    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(88, 159, 200, 0.1)',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 55,
        borderRadius: 50,
        marginLeft:30,
        marginRight:30
      },
      imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
      },
      groupData: {
          flex:1,
          justifyContent:"flex-end"
      }
});

export default LoginScreen;