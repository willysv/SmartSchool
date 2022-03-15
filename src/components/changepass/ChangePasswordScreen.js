import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Http from 'smartstudent/src/libs/http';

class ChangePasswordScreen extends Component {

    state = {
        token:"",
        mobile:"",
        currentpass:"",
        newpass:"",
        repeatpass:""
    }

    componentDidMount = async () => {
        const token = await AsyncStorage.getItem("token");
        const mobile = await AsyncStorage.getItem("mobile");
        //await AsyncStorage.removeItem("token");
        if (token==null) {
            this.props.navigation.navigate('LoginStack');
        }
        this.setState({token,mobile});
    }

    constructor(props) {
        super(props);
    }

    changepass = async () => {
        const form = new FormData();
        form.append("authtoken",this.state.token);
        form.append("cpass",this.state.currentpass);
        form.append("user",this.state.mobile);
        form.append("npass",this.state.newpass);
        form.append("rpass",this.state.repeatpass);
        const res = await Http.instance.post(`${Http.URL}changepass.php`,form);
        if (res.status=="success") {
            alert(res.reason);
        } else {
            alert(res.reason);
        }
    }


    render() {
        return (
            <View style={style.container}>
                <Text style={style.labelTxt}>Current Password</Text>
                <View style={style.sectionStyle}>
                    <Image
                        source={require('smartstudent/src/assets/iconpass.png')}
                        style={style.imageStyle}
                    />
                    <TextInput
                        style={style.txtStyle}
                        placeholderTextColor="#FFF"
                        underlineColorAndroid="transparent"
                        secureTextEntry={true}
                        onChangeText={(currentpass) => this.setState({currentpass})}
                    />
                </View>
                <Text style={style.labelTxt}>New Password</Text>
                <View style={style.sectionStyle}>
                    <Image
                        source={require('smartstudent/src/assets/iconpass.png')}
                        style={style.imageStyle}
                    />
                    <TextInput
                        style={style.txtStyle}
                        placeholderTextColor="#FFF"
                        underlineColorAndroid="transparent"
                        secureTextEntry={true}
                        onChangeText={(newpass) => this.setState({newpass})}
                    />
                </View>
                <Text style={style.labelTxt}>Re-enter Password</Text>
                <View style={style.sectionStyle}>
                    <Image
                        source={require('smartstudent/src/assets/iconpass.png')}
                        style={style.imageStyle}
                    />
                    <TextInput
                        style={style.txtStyle}
                        placeholderTextColor="#FFF"
                        underlineColorAndroid="transparent"
                        secureTextEntry={true}
                        onChangeText={(repeatpass) => this.setState({repeatpass})}
                    />
                </View>
                <TouchableHighlight onPress={()=>this.changepass()}>
                    <View style={style.btnSesion}>
                        <Text style={style.txtSession}>Submit</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const style=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#FFF",
        padding:0,
        justifyContent:"center"
    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        borderWidth: 0,
        borderColor: '#000',
        height: 45,
        borderRadius: 20,
        marginLeft:30,
        marginRight:30,
        marginBottom:50
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
        color:"#000",
        fontSize:14
    },
    labelTxt: {
        marginLeft:30,
        color:"#000",
        fontWeight:"bold"
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
    }
});

export default ChangePasswordScreen;