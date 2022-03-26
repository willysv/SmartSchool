import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableHighlight, Pressable, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Http from 'smartstudent/src/libs/http';

class HomeworkDetailScreen extends Component {

    state = {
        token:"",
        sid:"",
        data:[],
        dataHomework:{},
        this_sch:""
    }

    componentDidMount = async () => {
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            this.loadData();
        });
    }

    loadData = async () => {
        const token = await AsyncStorage.getItem("token");
        const sid = await AsyncStorage.getItem("sid");
        const this_sch = await AsyncStorage.getItem("this_sch");
        //await AsyncStorage.removeItem("token");
        if (token==null) {
            this.props.navigation.navigate('LoginStack');
        }
        this.setState({token,sid,this_sch});
        const form = new FormData();
        form.append("authtoken",this.state.token);
        form.append("sid",this.state.sid);
        const res = await Http.instance.post(`${Http.URL}getstudents.php`,form);
        if (res.status=="success") {
            this.setState({data:res.rows});
        }
        this.setState({dataHomework:this.props.route.params.item});
    }

    displayImage1(item) {
        if ((item.pic1!="") && (item.pic1!=null)) {
            return (
                <View>
                    <Image
                        source={{uri:`${Http.URL}${item.pic1}`}}
                        style={style.imgEvent}
                    />
                </View>);
        } else {
            return (<Image
                source={require('smartstudent/src/assets/noimage.jpg')}
                style={style.imgEvent}
            />);
        }
    }


    constructor(props) {
        super(props);
    }

    displayImage() {
        item=this.state.data[0];
        if (typeof(item)!="undefined") {
            if (item.picture!="") {
                return (
                    <View>
                        <Image
                            source={{uri:`${Http.URL}${item.picture}`}}
                            style={style.avatar}
                        />
                        <Image
                                source={require('smartstudent/src/assets/circle.png')}
                                style={style.circle}
                            />
                    </View>);
            } else {
                return (<Image
                    source={require('smartstudent/src/assets/avatar.png')}
                    style={style.avatar}
                />);
            }
        }
    }

    getData(value) {
        item=this.state.data[0];
        if (typeof(item)!="undefined") {
            return item[value];
        }
    }

    getData1(value) {
        item=this.state.dataHomework;
        if (typeof(item[value])!="undefined") {
            return item[value];
        }
    }

    getDate(item,title) {
        const dateToFormat = moment(item).format("MM-DD-YYYY hh:mm");
        return (
            <View>
                <Text>{title}{dateToFormat}</Text>
            </View>
        );
    }

    backEevent() {
        this.props.navigation.popToTop();
    }

    openLink = async (url)=> {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    getAttach(item,value) {
        if ((item[value]!="") && (item[value]!=null)) {
            return (
                <Pressable onPress={()=>this.openLink(`${Http.URL}${item[value]}`)}>
                    <View>
                        <Image
                            source={require('smartstudent/src/assets/attach.png')}
                            style={style.attach}
                        /> 
                    </View>
                </Pressable>
            );
        }
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.dataStudent}>
                    <View>
                    {
                    this.displayImage()
                    }
                    </View>
                    <View style={style.dataStudentColumn2}>
                        <Text style={style.full_name}>{this.getData("full_name")}</Text>
                        <Text style={style.otherData}>Class: {this.getData("standard")}</Text>
                        <Text style={style.otherData}>Roll No: {this.getData("roll_no")}</Text>
                        <Text style={style.otherData}>ID: 000</Text>
                    </View>
                    <View style={style.busContainer}>
                        <Image
                            style={style.iconbus}
                            source={require("smartstudent/src/assets/bus.png")}
                        />
                    </View>
                </View>
                <View style={{marginBottom:10}}>
                    <View style={{flexDirection:"row"}}>
                        {this.getDate(this.getData1("given_on"),"Given on:")}
                    </View>
                    <Text>{item.assignment}</Text>
                    <Text>Given by: {this.getData1("given_by")}</Text>
                    <Text>Subject: {this.getData1("subject")}</Text>
                    <Text>{this.getData1("assignment")}</Text>
                    {this.getDate(this.getData1("submission_dt"),"Submission date:")}
                    <Text>{this.getData1("note")}</Text>
                    <View style={{flexDirection:"row"}}>
                        {this.getAttach(this.state.dataHomework,"attach1")}
                        {this.getAttach(this.state.dataHomework,"attach2")}
                        {this.getAttach(this.state.dataHomework,"attach3")}
                        {this.getAttach(this.state.dataHomework,"attach4")}
                        {this.getAttach(this.state.dataHomework,"attach5")}
                        <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end"}}>
                            <TouchableHighlight onPress={()=>this.backEevent()}>
                                <View style={style.btnSesion}>
                                    <Text style={style.txtSession}>Back</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const style=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#FFF",
        padding:20
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
        bottom:5
    },
    dataStudent: {
        flexDirection:"row",
        marginBottom:10
    },
    dataStudentColumn2: {
        marginLeft:10
    },
    full_name: {
        fontSize:16,
        fontWeight:"bold",
        color:"#000"
    },
    otherData: {
        fontSize:12,
        color:"#000"
    },
    iconbus: {
        width: 70,
        height:75,
        resizeMode: 'stretch'
    },
    busContainer: {
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-end"
    },
    imgEvent: {
        width:350,
        height:175,
        resizeMode: 'stretch'
    },
    btnSesion: {
        marginRight:10,
        backgroundColor:"#06154a",
        height:30,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,
        paddingLeft:5,
        paddingRight:5
    },
    txtSession:{
        color:"#fff",
        fontSize:12,
        fontWeight:"bold"
    },
    attach: {
        width:45,
        height:45
    }
});

export default HomeworkDetailScreen;