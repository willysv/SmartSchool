import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableHighlight, Linking, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar, CalendarProps} from 'react-native-calendars';
import moment from 'moment';
import Http from 'smartstudent/src/libs/http';
import { FlatGrid } from "react-native-super-grid";

const INITIAL_DATE = moment().format("YYYY-MM-YY");

class AttendanceScreen extends Component {

    state = {
        token:"",
        sid:"",
        data:[],
        dataAttendace:[],
        this_sch:"",
        standard:"",
        section:"",
        dataGuardian:[],
        totalPresent:0,
        totalAbsent:0,
        totalLeave:0,
        totalTardy:0,
        totalHoliday:0,
        markerDates:{}
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
        const standard = await AsyncStorage.getItem("standard");
        const section = await AsyncStorage.getItem("section");
        //await AsyncStorage.removeItem("token");
        if (token==null) {
            this.props.navigation.navigate('LoginStack');
        }
        this.setState({token,sid,this_sch, standard, section});
        const form = new FormData();
        form.append("authtoken",this.state.token);
        form.append("sid",this.state.sid);
        const res = await Http.instance.post(`${Http.URL}getstudents.php`,form);
        if (res.status=="success") {
            this.setState({data:res.rows});
        }
        const formG = new FormData();
        formG.append("authtoken",this.state.token);
        formG.append("sid",sid);
        const resGuardian = await Http.instance.post(`${Http.URL}searchguardiannew.php`,formG);
        if (resGuardian.status=="success") {
            this.setState({dataGuardian:resGuardian.rows});
        }
        const resAtt = await Http.instance.post(`${Http.URL}searchattendance.php`,formG);
        if (resAtt.status=="success") {
            this.setState({dataAttendace:resAtt.rows});
            let totalPresent=0;
            let totalAbsent=0;
            let totalLeave=0;
            let totalTardy=0;
            let totalHoliday=0;
            let markerDates={};
            let colorMarker="";
            resAtt.rows.forEach(item => {
                switch (item.state) {
                    case "present":
                        colorMarker=style.legend1.backgroundColor;
                        totalPresent++;
                        break;
                    case "absent":
                        colorMarker=style.legend2.backgroundColor;
                        totalAbsent++;
                        break;
                    case "leave":
                        colorMarker=style.legend3.backgroundColor;
                        totalLeave++;
                        break;
                    case "tardy":
                        colorMarker=style.legend4.backgroundColor;
                        totalTardy++;
                        break;
                    case "holiday":
                        colorMarker=style.legend5.backgroundColor;
                        totalHoliday++;
                        break;
                    default:
                        break;
                }
                markerDates[item.date]={selected:true, marked: true, selectedColor: colorMarker};
            });
            this.setState({totalAbsent,totalHoliday,totalLeave,totalPresent,totalTardy, markerDates});
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

    onDayPress() {

    }

    marked()  {

    }

    displayImage2(item) {
        if ((item.f_pic!="") && (item.f_pic!=null)) {
            return (
                <View>
                    <Image
                        source={{uri:`${Http.URL}${item.f_pic}`}}
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
                style={style.avatar1}
            />);
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
                <Calendar
                    testID='first_calendar'
                    enableSwipeMonths
                    current={INITIAL_DATE}
                    style={style.calendar}
                    onDayPress={()=>this.onDayPress}
                    markedDates={this.state.markerDates}
                />
                <View style={style.legends}>
                    <View style={style.legend1}>
                        <Text style={style.textLegend}>Present({this.state.totalPresent})</Text>
                    </View>
                    <View style={style.legend2}>
                        <Text style={style.textLegend}>Absent({this.state.totalAbsent})</Text>
                    </View>
                    <View style={style.legend3}>
                        <Text style={style.textLegend}>Leave({this.state.totalLeave})</Text>
                    </View>
                </View>
                <View style={style.legends}>
                    <View style={style.legend4}>
                        <Text style={{...style.textLegend, color:"#000"}}>Tardy({this.state.totalTardy})</Text>
                    </View>
                    <View style={style.legend5}>
                        <Text style={style.textLegend}>Holiday({this.state.totalHoliday})</Text>
                    </View>
                    <View style={style.legend6}>
                        <Text></Text>
                    </View>
                </View>
                <View>
                    <FlatGrid
                        itemDimension={100}
                        data={this.state.dataGuardian}
                        
                        itemContainerStyle={{flex:1,alignItems:"center"}}
                        renderItem={ ({item})=>
                            <View style={style.listaItem}>
                                {this.displayImage2(item)}
                                <Text style={style.tituloText}>{item.g_name}</Text>
                            </View>
                        }
                    />
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
    calendar: {
        marginBottom: 10,
        marginTop:20
    },
    legends: {
        flexDirection:"row"
    },
    legend1: {
        flex:1,
        backgroundColor:"#8FCC86",
        height:40,
        justifyContent:"center"
    },
    legend2: {
        flex:1,
        backgroundColor:"#FE0000",
        height:40,
        justifyContent:"center"
    },
    legend3: {
        flex:1,
        backgroundColor:"#33B5E6",
        height:40,
        justifyContent:"center"
    },
    legend4: {
        flex:1,
        backgroundColor:"#E9EBEA",
        height:40,
        justifyContent:"center"
    },
    legend5: {
        flex:1,
        backgroundColor:"#530678",
        height:40,
        justifyContent:"center"
    },
    legend6: {
        flex:1,
        backgroundColor:"transparent",
        height:40,
        justifyContent:"center"
    },
    textLegend: {
        color:"#fff",
        textAlign:"center"
    },
    tituloText: {
        fontSize:12,
        color:"#000",
        fontWeight:"bold",
        textAlign:"center"
    },
    avatar1: {
        height: 75,
        width: 75,
        resizeMode: 'cover',
        alignItems: 'center',
        overflow:"hidden"
    }
});

export default AttendanceScreen;