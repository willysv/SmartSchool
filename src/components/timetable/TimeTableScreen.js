import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight, FlatList, ActivityIndicator, Platform, Modal} from 'react-native';
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
        isPlaformIOS:(Platform.OS==="ios"),
        plaformIOS:Platform.OS,
        isOpenDay:false,
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

    changeStatePickerDay(isOpenDay) {
        this.setState({isOpenDay})
    }

    render() {
        return (
            <View style={style.container}>
                 <ActivityIndicator animating={this.state.isLoading} size="large" color="#0000ff" style={{position:"absolute",
                 alignSelf:"center",
                 top:200
                }}/>
                <View style={style.filter}>
                { (!this.state.isPlaformIOS ?  (
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
                    ) : <View style={style.btnPicker}>
                            <TouchableHighlight onPress={()=>{
                                    this.changeStatePickerDay(true);;
                            }}>
                                <Text style={style.textPicker}>{this.state.selectedValue}</Text>
                            </TouchableHighlight>
                        </View>
                    )}
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
                <Modal
                    transparent
                    animationType="fade"
                    visible={this.state.isOpenDay}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={style.contentContainer}>
                        <View style={style.modalView}>
                            <Text style={{marginTop:10}}>Select Day</Text>
                            <Picker
                                selectedValue={this.state.selectedValue}
                                style={{ height: 50, width:300, color:"#00f"}}
                                dropdownIconColor="#000"
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({selectedValue:itemValue});
                                }}
                            >
                                {this.renderDay()}
                            </Picker>
                            <View style={{position:"relative",bottom:-150}}>
                                <TouchableHighlight
                                    style={style.confirmButton}
                                    onPress={() => {
                                        this.setState({isOpenDay:false});
                                        }
                                    }>
                                    <View style={[style.btnSesion,{flex:0}]}>
                                        <Text style={style.txtSession}>CONFIRM</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    btnPicker:{
        backgroundColor:"#ccc",
        height:40,
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
        marginLeft:10        
    },
    textPicker: {
        fontSize:14,
        fontWeight:"bold"
    },
    contentContainer: {
        //height:200,
        justifyContent:"center",
        alignItems:"center",
        marginTop:22
    },
    modalView: {
        margin:20,
        width:300,
        height:290,
        backgroundColor:"#fff",
        borderRadius:20,
        //padding:20,
        alignItems:"center",
        shadowColor:"#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    btnSesion: {
        marginTop:12,
        marginLeft:"auto",
        marginRight:5,
        marginBottom:12,
        padding:5,
        backgroundColor:"#01B9F5",
        height:30,
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"flex-start"
    },
    calendar: {
        width:30,
        height:30,
        marginTop:10,
        resizeMode: 'stretch'
    }
});

export default TimeTableScreen;