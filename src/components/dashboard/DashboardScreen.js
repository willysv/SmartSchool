import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Http from 'smartstudent/src/libs/http';
import { FlatGrid } from "react-native-super-grid";

class DashboardScreen extends Component {

    state = {
        token:"",
        sid:"",
        data:[],
        dataGuardian:[],
        latitud:23.165496,
        longitud: 79.953592
    }

    componentDidMount = async () => {
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            this.loadData();
        });
    }

    loadData = async () => {
        const token = await AsyncStorage.getItem("token");
        const sid = await AsyncStorage.getItem("sid");
        //await AsyncStorage.removeItem("token");
        if (token==null) {
            this.props.navigation.navigate('LoginStack');
        }
        this.setState({token,sid});
        const form = new FormData();
        form.append("authtoken",this.state.token);
        form.append("sid",this.state.sid);
        const res = await Http.instance.post(`${Http.URL}getstudents.php`,form);
        if (res.status=="success") {
            this.setState({data:res.rows});
            await AsyncStorage.setItem("this_sch",res.rows[0].this_sch);
            await AsyncStorage.setItem("standard",res.rows[0].standard);
            await AsyncStorage.setItem("section",res.rows[0].section);
        }
        const resGuardian = await Http.instance.post(`${Http.URL}searchguardiannew.php`,form);
        if (res.status=="success") {
            this.setState({dataGuardian:resGuardian.rows});
        }
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

    getData(value) {
        item=this.state.data[0];
        if (typeof(item)!="undefined") {
            return item[value];
        }
    }

    doAction(option) {
        switch (option) {
            case 1:
                this.props.navigation.navigate('AttendanceStack',{screen:"attendanceview"});
                break;
            case 2:
                this.props.navigation.navigate('HolidaysStack',{screen:"holidayview"});
                break;
            case 3:
                this.props.navigation.navigate('LeaveStack',{screen:"leaveview"});
                break;
            case 4:
                this.props.navigation.navigate('MessageStack',{screen:"messageview"});
                break;
            case 5:
                this.props.navigation.navigate('HomeworkStack',{screen:"homeworklistview"});
                break;
            case 6:
                this.props.navigation.navigate('TimeTableStack',{screen:"timetableview"});
                break;
            case 7:
                this.props.navigation.navigate('EventsStack',{screen:"eventslistview"});
                break;
        
            default:
                break;
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
                <MapView
                    style={style.map}
                    region={{
                        latitude: this.state.latitud,
                        longitude: this.state.longitud,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                    
                >
                </MapView>
                <View style={style.listIcons}>
                    <TouchableHighlight onPress={()=>this.doAction(1)}>
                        <Image
                            style={style.iconImage}
                            source={require("smartstudent/src/assets/iconattendance.png")}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.doAction(3)}>
                        <Image
                            style={style.iconImage1}
                            source={require("smartstudent/src/assets/iconleave.png")}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.doAction(2)}>
                        <Image
                            style={style.iconImage1}
                            source={require("smartstudent/src/assets/iconholidays.png")}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.doAction(4)}>
                        <Image
                            style={style.iconImage1}
                            source={require("smartstudent/src/assets/iconmessage.png")}
                        />
                    </TouchableHighlight>
                </View>
                <View style={style.listIcons}>
                    <TouchableHighlight onPress={()=>this.doAction(5)}>
                        <Image
                            style={style.iconImage2}
                            source={require("smartstudent/src/assets/iconhomework.png")}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.doAction(6)}>
                        <Image
                            style={style.iconImage3}
                            source={require("smartstudent/src/assets/icontimetable.png")}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.doAction(7)}>
                        <Image
                            style={style.iconImage4}
                            source={require("smartstudent/src/assets/iconevents.png")}
                        />
                    </TouchableHighlight>
                    <Image
                        style={style.iconImage5}
                        source={require("smartstudent/src/assets/icontransport.png")}
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
    iconImage: {
        width: 90,
        height:75,
        resizeMode: 'stretch'
    },
    iconImage1: {
        width: 72,
        height:80,
        resizeMode: 'stretch'
    },
    iconImage2: {
        width: 82,
        height:80,
        resizeMode: 'stretch'
    },
    iconImage3: {
        width: 60,
        height:80,
        resizeMode: 'stretch',
        marginLeft:10
    },
    iconImage4: {
        width: 60,
        height:74,
        resizeMode: 'stretch',
        marginLeft:15,
        marginRight:-3
    },
    iconImage5: {
        width: 78,
        height:74,
        resizeMode: 'stretch'
    },
    listIcons: {
        flexDirection:"row",
        justifyContent:"space-between"
    },
    avatar: {
        height: 75,
        width: 75,
        resizeMode: 'cover',
        alignItems: 'center',
        borderRadius:75,
        overflow:"hidden"
    },
    avatar1: {
        height: 75,
        width: 75,
        resizeMode: 'cover',
        alignItems: 'center',
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
    map: {
        flex:1,
        marginLeft:-20,
        marginRight:-20,
        marginBottom:20
    },
    tituloText: {
        fontSize:12,
        color:"#000",
        fontWeight:"bold"
    },
    listaItem: {
        alignItems:"center" 
    }
});

export default DashboardScreen;