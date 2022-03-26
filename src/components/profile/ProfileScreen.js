import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableHighlight, Linking, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Http from 'smartstudent/src/libs/http';
import { FlatGrid } from "react-native-super-grid";

class ProfileScreen extends Component {

    state = {
        token:"",
        sid:"",
        data:[],
        this_sch:"",
        standard:"",
        section:"",
        dataGuardian:[]
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
        console.log(resGuardian);
        if (resGuardian.status=="success") {
            this.setState({dataGuardian:resGuardian.rows});
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
                    <Image
                            style={style.imgSchool}
                            source={require("smartstudent/src/assets/schoolprofile.png")}
                    />
                    <View style={{position:"absolute", top:0,left:0,width:"100%", height:"100%",justifyContent:"center", alignItems:"center"}}>
                        {
                        this.displayImage()
                        }
                        <Text style={style.full_name}>{this.getData("full_name")}</Text>
                    </View>
                </View>
                <View style={style.dataStudentColumn2}>
                    <View style={style.dataColumn}>
                        <Text style={style.otherData}>STANDARD</Text>
                        <Text style={style.otherData1}>{this.getData("standard")}</Text>
                    </View>
                    <View style={style.dataColumn}>
                        <Text style={style.otherData}>SECTION</Text>
                        <Text style={style.otherData1}>{this.getData("section")}</Text>
                    </View>
                    <View style={style.dataColumn}>
                        <Text style={style.otherData}>HOUSE</Text>
                        <Text style={style.otherData1}>{this.getData("house")}</Text>
                    </View>
                    <View style={style.dataColumn}>
                        <Text style={style.otherData}>BLOOD GROUP</Text>
                        <Text style={style.otherData1}>{this.getData("blood")}</Text>
                    </View>
                </View>
                <View style={{flexDirection:"row", padding:30, borderBottomColor:"#ccc",borderBottomWidth:0.75}}>
                    <View style={{width:125}}>
                        <Text style={{fontWeight:"bold",fontSize:16,color:"#000"}}>Address:</Text>
                    </View>
                    <View style={{flexDirection:"row", flex:1}}>
                        <Image
                            
                            source={require("smartstudent/src/assets/iconhouse.png")}
                        />
                        <Text style={style.otherData1}>{this.getData("address")}</Text>
                    </View>
                </View>
                <View style={{flexDirection:"row", padding:30, paddingTop:10, paddingBottom:10, borderBottomColor:"#ccc",borderBottomWidth:0.75}}>
                    <View style={{width:125}}>
                        <Text style={{fontWeight:"bold",fontSize:16,color:"#000"}}>Contact:</Text>
                    </View>
                    <View>
                        <View style={{flexDirection:"row"}}>
                            <Image
                                
                                source={require("smartstudent/src/assets/iconphone2.png")}
                            />
                            <Text style={style.otherData1}>{this.getData("mobile")}</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <Image
                                
                                source={require("smartstudent/src/assets/iconmail2.png")}
                            />
                            <Text style={style.otherData1}>{this.getData("email")}</Text>
                        </View>
                    </View>
                </View>
                <View style={[style.dataStudentColumn2,{backgroundColor:"#1B6DAD", marginBottom:20, borderRadius:0, borderWidth:0}]}>
                    <View style={style.dataColumn}>
                        <Text style={[style.otherData,{color:"#FFF"}]}>ADMISSION NO</Text>
                        <Text style={[style.otherData1,{color:"#FFF"}]}>{this.getData("admit_class")}</Text>
                    </View>
                    <View style={style.dataColumn}>
                        <Text style={[style.otherData,{color:"#FFF"}]}>ROOL NO</Text>
                        <Text style={[style.otherData1,{color:"#FFF"}]}>{this.getData("roll_no")}</Text>
                    </View>
                    <View style={style.dataColumn}>
                        <Text style={[style.otherData,{color:"#FFF"}]}>MODE</Text>
                        <Text style={[style.otherData1,{color:"#FFF"}]}>XYZ</Text>
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
                                <Text style={style.tituloText}>{item.g_mobile}</Text>
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
        padding:0
    },
    avatar: {
        height: 75,
        width: 75,
        resizeMode: 'cover',
        alignItems: 'center',
        borderRadius:75,
        borderColor:"#fff",
        borderWidth:1.5,
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
        paddingLeft:10,
        paddingRight:10,
        alignItems:"center",
        flexDirection:"row",
        shadowOffset: {
            width:100,
            height:-100
        },
        shadowRadius:20,
        shadowOpacity:0.75,
        shadowColor:"black",
        backgroundColor:"#FFF",
        borderRadius:0,
        borderColor:"#ccc",
        borderWidth:0.7,
        height:75
    },
    full_name: {
        fontSize:16,
        fontWeight:"bold",
        color:"#FFF"
    },
    otherData: {
        fontSize:12,
        textAlign:"center",
        color:"#000"
    },
    otherData1: {
        fontSize:14,
        textAlign:"center",
        fontWeight:"bold",
        marginTop:5,
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
    },
    imgSchool: {
        width:"100%"
    }, 
    dataColumn: {
        flex:1
    }
});

export default ProfileScreen;