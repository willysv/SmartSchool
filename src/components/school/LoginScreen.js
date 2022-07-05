import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableHighlight, ImageBackground, Image, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
//import messaging from '@react-native-firebase/messaging';
import Http from 'smartstudent/src/libs/http';

class LoginScreen extends Component {

    state = {
        user:"",
        pass:"",
        check1:true
    }

    componentDidMount = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token !==null) {
            this.props.navigation.navigate('ListStudenStack');
        }
        //this.checkNotificationPermission();
    }

    async checkNotificationPermission() {
        const enabled = await messaging().hasPermission();
        if (enabled) {
            console.log("has permision ");
        } else {
            this.requestPermission();
        }
    }

    async requestPermission() {
        try {
            await messaging().requestPermission();
        } catch (error) {}
    }

    constructor(props) {
        super(props);
        this.state={check1:true};
    }

    login = async () => {
        //const fcmtoken= await messaging().getToken();
        const fcmtoken="";
        console.log(fcmtoken);
        const form = new FormData();
        form.append("login",this.state.user);
        form.append("password",this.state.pass);
        form.append("fcmtoken",fcmtoken);
        const res = await Http.instance.post(`${Http.URL}login.php`,form);
        if ((res.status=="success") && (res.level==4)) {
            await AsyncStorage.setItem("token",res.authtoken);
            await AsyncStorage.setItem("mobile",this.state.user);
            this.props.navigation.navigate('ListStudenStack');
        } else {
            alert("Either user not exist or incorrect password");
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView 
                    style={{backgroundColor:'#F6F7FB'}}
                    resetScrollToCoords={{x:0, y:0}}
                    contentContainerStyle={style.container}
                    scrollEnabled={false}
                >
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
                                source={require('smartstudent/src/assets/iconuser.png')}
                                style={style.imageStyle}
                            />
                            <View style={style.separator}>

                            </View>
                            <TextInput
                                style={style.txtStyle}
                                placeholder="Username"
                                placeholderTextColor="#FFF"
                                underlineColorAndroid="transparent"
                                onChangeText={(user) => this.setState({user})}
                            />
                        </View>
                        <View style={style.sectionStyle}>
                            <Image
                                source={require('smartstudent/src/assets/iconpass.png')}
                                style={style.imageStyle}
                            />
                            <View style={style.separator}>

                            </View>
                            <TextInput
                                style={style.txtStyle}
                                placeholder="Password"
                                placeholderTextColor="#FFF"
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                                onChangeText={(pass) => this.setState({pass})}
                            />
                        </View>
                        <TouchableHighlight onPress={()=>this.login()}>
                            <View style={style.btnSesion}>
                                <Text style={style.txtSession}>Sign In</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={style.check1}>
                            <CheckBox
                                value={this.state.check1}
                                hideBox={true}
                                tintColors={{true:"#FFF", false:"black"}}
                                onValueChange={(value) =>
                                    this.setState({check1:value})
                                }
                            />
                            <Text style={style.txtCheck}>Remember me</Text>
                            <View style={style.separatorcheck}>

                            </View>
                            <Text style={style.txtCheck}>
                                Forgot Password?
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAwareScrollView>
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
        backgroundColor:"#06154a",
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
        flex:1,
        flexDirection:"row",
        alignItems:"center"
//        marginTop:250
    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(88, 159, 200, 0.4)',
        borderWidth: 0,
        borderColor: '#000',
        height: 55,
        borderRadius: 50,
        marginLeft:30,
        marginRight:30,
        marginBottom:20
      },
      imageStyle: {
        padding: 10,
        margin: 20,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
      },
      txtStyle: {
        flex:1,
        color:"#fff",
        fontSize:18
      },
      groupData: {
          flex:1,
          justifyContent:"flex-end",
          marginBottom:60,
          marginTop:-100
      },
      separator: {
        borderWidth: 0.7,
        borderColor: '#FFF',
        height:35,
        marginRight:10
      },
      check1: {
          flexDirection:"row",
          alignItems:"center",
          marginTop:20,
          justifyContent:"center"
      },
      txtCheck: {
          color:"#fff"
      },
      separatorcheck: {
        borderWidth: 0.7,
        borderColor: '#FFF',
        height:35,
        marginRight:10,
        marginLeft:10
      }
});

export default LoginScreen;