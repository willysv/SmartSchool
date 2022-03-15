import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'react-moment';
import moment from 'moment';
import Http from 'smartstudent/src/libs/http';

class EventsScreen extends Component {

    state = {
        token:"",
        sid:"",
        data:[],
        dataEvent:[],
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
        const formEvent = new FormData();
        formEvent.append("authtoken",this.state.token);
        formEvent.append("this_sch",this_sch);
        const resEvent = await Http.instance.post(`${Http.URL}searchevents.php`,formEvent);
        if (resEvent.status=="success") {
            this.setState({dataEvent:resEvent.rows});
        }
    }

    displayImage1(item) {
        console.log(item.pic1);
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

    getDate(item) {
        const dateToFormat = moment(item.datetime).format("MM-DD-YYYY hh:mm");
        return (
            <View style={{flex:1, flexDirection:"row",justifyContent:"flex-end"}}>
            <Text>
                {dateToFormat}
            </Text>
            </View>
        );
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
                <FlatList 
                    data={this.state.dataEvent}
                    renderItem = {
                        ({item}) => 
                            <View>
                                {this.displayImage1(item)}
                                <View style={{flexDirection:"row"}}>
                                    <Text>{item.heading}</Text>
                                    {this.getDate(item)}
                                </View>
                                <Text>{item.matter}</Text>
                            </View>
                        
                    }
                />
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
        flexDirection:"row"
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
    }
});

export default EventsScreen;