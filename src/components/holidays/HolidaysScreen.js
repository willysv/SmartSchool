import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight, FlatList, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Http from 'smartstudent/src/libs/http';
//import { Button } from "react-native-paper";

class HolidaysScreen extends Component {

    state = {
        isLoading:false,
        token:"",
        mobile:"",
        this_sch:0,
        sid:"",
        data:[]
    }

    componentDidMount = async () => {
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
        form.append("scid",this.state.this_sch);
        const res = await Http.instance.post(`${Http.URL}getHoliday.php`,form);
        if (res.status=="success") {
            this.setState({data:res.rows});
        }
    }

    displayImage(item) {
        if (item.picture!="") {
            return (
                <View>
                    <Image
                        source={{uri:`${Http.URL}${item.picture}`}}
                        style={style.avatar}
                    />
                </View>);
        } else {
            return (<Image
                source={require('smartstudent/src/assets/avatar.png')}
                style={style.avatar}
            />);
        }
    }

    constructor(props) {
        super(props);
    }

    getColor(index) {
        const value=index%6;
        switch (value) {
            case 0:
                return "#FFE3FD";
            case 1:
                return "#FFF9E3";
            case 2:
                return "#F2FDFF";
            case 3:
                return "#EDFFF0";
            case 4:
                return "#FDF5FF";
            case 5:
                return "#FFF9F7";
            default:
                break;
        }
    }

    render() {
        return (
            <View style={style.container}>
                 <ActivityIndicator animating={this.state.isLoading} size="large" color="#0000ff" style={{position:"absolute",
                 alignSelf:"center",
                 top:200
                }}/>
                <View style={{padding:20}}>
                    <FlatList 
                        data={this.state.data}
                        renderItem= { ({item,index}) => 
                            <View style={{marginBottom:15, borderWidth:0.75, borderColor:"#ccc", padding:10,flexDirection:"row",borderRadius:20,backgroundColor:this.getColor(index)}}>
                                <View>
                                    <Text style={{fontSize:18,fontWeight:"bold",color:"#FFACC7"}}>{item.holiday}</Text>
                                    <Text style={{fontSize:18,fontWeight:"bold",color:"#000"}}>{item.dateHoliday}</Text>
                                </View>
                                <View style={{marginLeft:"auto"}}>
                                    {this.displayImage(item)}
                                </View>
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
        backgroundColor:"#fff",
        padding:0
    },
    filter: {
        //flex:1,
        flexDirection:"row"
    },
    calendar: {
        width:30,
        height:30,
        marginTop:10,
        resizeMode: 'stretch'
    },
    avatar: {
        height: 75,
        width: 75,
        resizeMode: 'cover',
        alignItems: 'center',
        borderRadius:75,
        overflow:"hidden"
    }
});

export default HolidaysScreen;