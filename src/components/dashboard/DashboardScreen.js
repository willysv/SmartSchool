import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Http from 'smartstudent/src/libs/http';

class DashboardScreen extends Component {

    state = {
        token:"",
        sid:"",
        data:[],
        latitud:23.165496,
        longitud: 79.953592
    }

    componentDidMount = async () => {
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
        console.log("Datos:", res.rows);
        console.log("Toekn:", token);
        if (res.status=="success") {
            this.setState({data:res.rows});
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
                        <Image
                                source={require("smartstudent/src/assets/carruselphoto.png")}
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
                  <Image
                        style={style.iconImage}
                        source={require("smartstudent/src/assets/iconattendance.png")}
                    />
                    <Image
                        style={style.iconImage1}
                        source={require("smartstudent/src/assets/iconleave.png")}
                    />
                    <Image
                        style={style.iconImage1}
                        source={require("smartstudent/src/assets/iconholidays.png")}
                    />
                    <Image
                        style={style.iconImage1}
                        source={require("smartstudent/src/assets/iconmessage.png")}
                    />
                </View>
                <View style={style.listIcons}>
                  <Image
                        style={style.iconImage2}
                        source={require("smartstudent/src/assets/iconhomework.png")}
                    />
                    <Image
                        style={style.iconImage3}
                        source={require("smartstudent/src/assets/iconnews.png")}
                    />
                    <Image
                        style={style.iconImage4}
                        source={require("smartstudent/src/assets/iconevents.png")}
                    />
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
    }
});

export default DashboardScreen;