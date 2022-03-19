import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Http from 'smartstudent/src/libs/http';

class EventDetailScreen extends Component {

    state = {
        token:"",
        sid:"",
        data:[],
        dataEvent:{},
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
        this.setState({dataEvent:this.props.route.params.item});
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

    getData1(value) {
        item=this.state.dataEvent;
        if (typeof(item[value])!="undefined") {
            return item[value];
        }
    }

    getDate() {
        const item=this.state.dataEvent;
        if (typeof(item["datetime"])!="undefined") {
            const dateToFormat = moment(item.datetime).format("MM-DD-YYYY hh:mm");
            return (
                <View style={{flex:1, flexDirection:"row",justifyContent:"flex-end"}}>
                    <Text>
                        {dateToFormat}
                    </Text>
                </View>
            );
        }
    }

    backEevent() {
        console.log("click");
        this.props.navigation.popToTop();
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
                        <Text style={style.otherDatsa}>ID: 000</Text>
                    </View>
                    <View style={style.busContainer}>
                        <Image
                            style={style.iconbus}
                            source={require("smartstudent/src/assets/bus.png")}
                        />
                    </View>
                </View>
                <View>
                    {this.displayImage1(this.state.dataEvent)}
                    <View style={{flexDirection:"row"}}>
                        <Text>{this.getData1("heading")}</Text>
                        {this.getDate()}
                    </View>
                    <Text>
                        {this.getData1("matter")}
                    </Text>
                    <TouchableHighlight onPress={()=>this.backEevent()}>
                        <View style={style.btnSesion}>
                            <Text style={style.txtSession}>Back</Text>
                        </View>
                    </TouchableHighlight>
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
    }
});

export default EventDetailScreen;