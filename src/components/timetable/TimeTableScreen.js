import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight, FlatList, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Http from 'smartstudent/src/libs/http';
//import { Button } from "react-native-paper";

class TimeTableScreen extends Component {

    state = {
        isLoading:false,
        token:"",
        mobile:"",
        scid:0,
        sid:"",
        selectedValue:"Day",
        data:[],
        dataDay:[
            {
                value:"Day",
                text:"Day"
            },
            {
                value:"Monday",
                text:"Monday"
            },
            {
                value:"Tuesday",
                text:"Tuesday"
            },
            {
                value:"Wednesday",
                text:"Wednesday"
            },
            {
                value:"Thursday",
                text:"Thursday"
            },
            {
                value:"Friday",
                text:"Friday"
            },
            {
                value:"Saturday",
                text:"Saturday"
            }
        ]
    }

    componentDidMount = async () => {
        const token = await AsyncStorage.getItem("token");
        const sid = await AsyncStorage.getItem("sid");
        //await AsyncStorage.removeItem("token");
        if (token==null) {
            this.props.navigation.navigate('LoginStack');
        }
        this.setState({token,sid});
    }

    async getData() {
        if (this.state.selectedValue=="Day") {
            alert("You must select the day");
            return;
        }
        const form = new FormData();
        form.append("authtoken",this.state.token);
        form.append("day",this.state.selectedValue);
        form.append("sid",this.state.sid);
        const res = await Http.instance.post(`${Http.URL}getTimetable.php`,form);
        if (res.status=="success") {
            this.setState({data:res.rows});
        }
        console.log(res);
    }

    constructor(props) {
        super(props);
    }

    renderDay() {
        const itemPicker=this.state.dataDay.map((item,index)=>{
            return (<Picker.Item key={index} label={item.text} value={item.value} />);
        });
        return itemPicker;
    }

    render() {
        return (
            <View style={style.container}>
                 <ActivityIndicator animating={this.state.isLoading} size="large" color="#0000ff" style={{position:"absolute",
                 alignSelf:"center",
                 top:200
                }}/>
                <View style={style.filter}>
                    <Picker
                        selectedValue={this.state.selectedValue}
                        style={{ height: 50, flex:1, color:"#000"}}
                        dropdownIconColor="#000"
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({selectedValue:itemValue});
                        }}
                    >
                        {this.renderDay()}
                    </Picker>
                    <TouchableHighlight onPress={()=>{
                            this.getData();
                    }}>
                        <Image
                            style={[style.calendar,{marginLeft:15}]}
                            source={require("smartstudent/src/assets/check.png")}
                        />
                    </TouchableHighlight>
                </View>
                <View style={{padding:20}}>
                    <FlatList 
                        data={this.state.data}
                        renderItem= { ({item}) => 
                            <View style={{marginBottom:15, borderWidth:0.75, borderColor:"#ccc", padding:5, shadowColor:"#000", shadowOffset: {width:0, height:1}, shadowOpacity:0.20, shadowRadius:1.41,elevation:2}}>
                                <Text style={{fontSize:24,fontWeight:"bold",color:"#FFACC7"}}>{item.subject}</Text>
                                <Text style={{fontSize:24,fontWeight:"bold",color:"#000"}}>{item.type}</Text>
                                <Text style={{fontSize:18,fontWeight:"bold",color:"#798ebb"}}>{item.name}</Text>
                                <Text style={{fontSize:18,fontWeight:"bold",color:"#000"}}>{item.period}</Text>
                                <Text style={{fontSize:18,fontWeight:"bold",color:"#000"}}>Class: {item.class}</Text>
                                <Text style={{fontSize:18,fontWeight:"bold",color:"#000"}}>Section: {item.section}</Text>
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
    }
});

export default TimeTableScreen;