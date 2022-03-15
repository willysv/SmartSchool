import React, { Component } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Http from 'smartstudent/src/libs/http';
import iconMarker from 'smartstudent/src/assets/iconmapschool.png';

let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

class SchoolViewScreen extends Component {

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
        console.log("Toekn:", token);
        console.log("SID:", sid);
        this.setState({token,sid});
        const form = new FormData();
        form.append("authtoken",this.state.token);
        //form.append("sid",this.state.sid);
        const res = await Http.instance.post(`${Http.URL}searchschool.php`,form);
        console.log("Datos:", res);
        if (res.status=="success") {
            this.setState({data:res.rows,latitud:parseFloat(res.rows[0].s_lat),longitud:parseFloat(res.rows[0].s_lon)});
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
                            source={{uri:`${Http.URL}${item.s_pic}`}}
                            style={style.imgSchool}
                        />
                    </View>);
            } else {
                return (<Image
                    source={require('smartstudent/src/assets/imgschool.png')}
                    style={style.imgSchool}
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
                <View style={style.dataSchool}>
                    {
                    this.displayImage()
                    }
                    <View style={style.viewSchoolName}>
                        <Text style={style.txtSchoolName}>{this.getData("s_name")}</Text>
                    </View>
                </View>
                <View style={style.viewAddressSchool}>
                    <View>
                        <View style={{flexDirection:"row",width:((width-60)/2)}}>
                            <Image
                                style={style.iconI}
                                source={require("smartstudent/src/assets/iconaddress.png")}
                            />
                            <Text style={style.txtDataAddress}>
                                {this.getData("s_address")}
                            </Text>
                        </View>
                    </View>
                    <View style={style.separator}>

                    </View>
                    <View style={style.viewSchoolPhone}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Image
                                style={style.iconI}
                                source={require("smartstudent/src/assets/iconphone.png")}
                            />
                            <Text style={style.txtDataAddress}>{this.getData("s_mobile")}</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Image
                                style={style.iconI}
                                source={require("smartstudent/src/assets/iconmail.png")}
                            />
                            <Text style={style.txtDataAddress}>{this.getData("s_email")}</Text>
                        </View>
                    </View>
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
                    <MapView.Marker
                            coordinate={{latitude: this.state.latitud,
                            longitude: this.state.longitud}}
                            title={this.getData("s_name")}
                            description={""}
                            image={iconMarker}
                    />
                </MapView>
            </View>
        )
    }
}

const style=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#FFF",
        padding:0
    },
    imgSchool: {
        height: 225,
        width: 375,
        resizeMode: 'stretch',
    },
    dataSchool: {
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        marginTop:10
    },
    viewSchoolName: {
        position:"absolute",
        bottom:0,
        left:0,
        flex:1,
        height:60,
        width:width,
        backgroundColor:'rgba(0, 0, 0, 0.7)',
        justifyContent:"center"
    },
    txtSchoolName: {
        color:"#fff",
        marginLeft:20,
        fontWeight:"bold"
    },
    map: {
        flex:1,
        marginLeft:0,
        marginRight:0,
        marginBottom:0
    },
    viewAddressSchool: {
        backgroundColor:"#1F70AE",
        flexDirection:"row",
        paddingLeft:10,
        paddingRight:10,
        paddingTop:30,
        paddingBottom:30
    },
    viewSchoolPhone: {
        flex:1,
        marginLeft:10,
        width:(width-10)/2
    },
    txtDataAddress: {
        color:"#fff",
        fontWeight:"bold",
        fontSize:14
    },
    separator: {
      borderWidth: 0.5,
      borderColor: '#FFF',
      marginLeft:10
    }
});

export default SchoolViewScreen;