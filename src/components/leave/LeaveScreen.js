import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView, ActivityIndicator, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import Http from 'smartstudent/src/libs/http';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
const INITIAL_DATE = moment().format("MM-DD-YYYY");
const END_DATE = moment().format("MM-DD-YYYY");

class LeaveScreen extends Component {

    state = {
        isLoading:false,
        token:"",
        mobile:"",
        name:"",
        sid:0,
        this_sch:0,
        txtDateInitial:INITIAL_DATE,
        txtDateEnd:END_DATE,
        modePicker:"date",
        dataNature:[],
        dateSelected:0,
        selectedValue:"Select Nature of leave",
        picture:{
            pic1:{
                fileName:"",
                uri:"",
                type:"",
                base64:""
            }
        },
        isDatePickerVisible:false,
        isPlaformIOS:(Platform.OS==="ios"),
        plaformIOS:Platform.OS,
        isOpenNature:false
    }

    componentDidMount = async () => {
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            this.loadData();
        });
    }

    loadData = async () => {
        const token = await AsyncStorage.getItem("token");
        const mobile = await AsyncStorage.getItem("mobile");
        const this_sch = await AsyncStorage.getItem("this_sch");
        const name = await AsyncStorage.getItem("name");
        const sid = await AsyncStorage.getItem("sid");
        //await AsyncStorage.removeItem("token");
        if (token==null) {
            this.props.navigation.navigate('LoginStack');
        }
        this.setState({token,mobile,this_sch,name,sid});
        const form = new FormData();
        form.append("authtoken",this.state.token);
        form.append("scid",this_sch);
        const res = await Http.instance.post(`${Http.URL}searchleave.php`,form);
        if (res.status=="success") {
            this.setState({dataNature:res.rows});
        }
    }

    constructor(props) {
        super(props);
    }

    saveEvent = async () => {
        this.setState({isLoading:true});
        if ((this.state.selectedValue=="Select Nature of leave")) {
            alert("There are empty fields");
            this.setState({isLoading:false});
            return;
        }
        const form = new FormData();
        form.append("authtoken",this.state.token);
        form.append("this_sch",this.state.this_sch);
        form.append("datefrom",this.state.txtDateInitial);
        form.append("dateto",this.state.txtDateEnd);
        form.append("tapa",this.state.selectedValue);
        form.append("sid",this.state.sid);
        if (this.state.picture.pic1.base64!="") {
            form.append("file1",{
                name:this.state.picture.pic1.fileName,
                type:this.state.picture.pic1.type,
                uri:
                    Platform.OS === "android"
                        ? this.state.picture.pic1.uri
                        : this.state.picture.pic1.uri.replace("file://", "")
            });
        }
        const res = await Http.instance.post(`${Http.URL}saveleavedetail.php`,form);
        this.setState({isLoading:false});
        if (res.status=="success") {
            alert(res.reason);
        } else {
            alert(res.reason);
        }
        this.setState({
            txtDateInitial:"",
            txtDateEnd:"",
            picture:{
                pic1:{
                    fileName:"",
                    uri:"",
                    type:"",
                    base64:""
                }
            }
        })
    }

    async savePhoto(obj,pic) {
        if (typeof(obj.assets)!="undefined") {
            const { picture }=this.state;
            picture[pic].fileName=obj.assets[0].fileName;
            picture[pic].uri=obj.assets[0].uri;
            picture[pic].type=obj.assets[0].type;
            picture[pic].base64=obj.assets[0].base64;
            this.setState(picture);
        }
    }

    async takePhoto(pic) {
        const options={
            mediaType:'mixed',
            includeBase64:true,
            includeExtra:true,
        };
        launchImageLibrary(options,(response)=>{this.savePhoto(response,pic)});
    }

    changeStateCalendar(newState,modePicker,dateSelected) {
        this.setState({isDatePickerVisible:newState,modePicker,dateSelected});
    }

    renderNature() {
        if (this.state.dataNature.length==0) {
            return (<Picker.Item label="Select Nature of leave" value="Select Nature of leave" />
        );
        } else {
            const itemPicker=this.state.dataNature.map((item,index)=>{
                return (<Picker.Item key={index} label={item.leave_name} value={item.tapa} />);
            });
            itemPicker.unshift(<Picker.Item key="-1" label="Select Nature of leave" value="Select Nature of leave" />);
            return  itemPicker;
        }
    }

    render() {
        return (
            <View style={style.container}>
                <ScrollView>
                <View style={style.containerText}>
                    <Text style={style.labelText}>From:</Text>
                    <TextInput
                        style={style.txtStyle}
                        placeholderTextColor="#FFF"
                        value={this.state.txtDateInitial}
                        onPressIn={()=>{
                            
                            this.changeStateCalendar(true,"date",1);
                        }}
                        underlineColorAndroid="transparent"
                        onChangeText={(txtDateInitial) => this.setState({txtDateInitial})}
                    />
                </View>
                <View style={style.containerText}>
                    <Text style={style.labelText}>To:</Text>
                    <TextInput
                        style={style.txtStyle}
                        placeholderTextColor="#FFF"
                        value={this.state.txtDateEnd}
                        onPressIn={()=>{
                            this.changeStateCalendar(true,"date",2);
                        }}
                        underlineColorAndroid="transparent"
                        onChangeText={(txtDateEnd) => this.setState({txtDateEnd})}
                    />
                </View>
                <View style={style.containerText}>
                    <Text style={style.labelText}>Nature of leave:</Text>
                    { (!this.state.isPlaformIOS ?  (
                        <Picker
                            selectedValue={this.state.selectedValue}
                            style={{ height: 50, flex:1, color:"#000"}}
                            dropdownIconColor="#000"
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({selectedValue:itemValue});
                            }}
                        >
                        
                            {this.renderNature()}
                        </Picker>
                    ) : <View style={style.btnPicker}>
                            <TouchableHighlight onPress={()=>{
                                    this.changeStatePickerClass(true);;
                            }}>
                                <Text style={style.textPicker}>{this.state.selectedValue}</Text>
                            </TouchableHighlight>
                        </View>
                    )}
                </View>
                <View style={[style.containerText,{alignItems:"flex-start",height:150}]}>
                    <Text style={[style.labelText,{marginTop:5}]}>Attachments:</Text>
                    <View style={{flex:1}}>
                        <TouchableHighlight onPress={()=>this.takePhoto("pic1")}>
                            <View style={style.btnPic}>
                                <Text style={style.txtSessionPic}>Attach Picture</Text>
                            </View>
                        </TouchableHighlight>
                        <Text style={{color:"#000"}}>{this.state.picture.pic1.fileName}</Text>
                    </View>
                </View>
                <TouchableHighlight onPress={()=>this.saveEvent()}>
                    <View style={style.btnSesion}>
                        <Text style={style.txtSession}>SAVE</Text>
                    </View>
                </TouchableHighlight>
                <DateTimePickerModal 
                    isVisible={this.state.isDatePickerVisible}
                    mode={this.state.modePicker}
                    onConfirm={(date)=>{
                        if (this.state.modePicker=="date") {
                            switch (this.state.dateSelected) {
                                case 1:
                                    this.setState({txtDateInitial:moment(date).format("MM-DD-YYYY")});
                                    break;
                                case 2:
                                    this.setState({txtDateEnd:moment(date).format("MM-DD-YYYY")});
                                    break;
                            }
                        } else {
                            this.setState({txtTimeGive:moment(date).format("HH:mm:ss")});
                        }
                        this.changeStateCalendar(false,this.state.modePicker);
                    }}
                    onCancel={()=>{
                        this.changeStateCalendar(false,this.state.modePicker);
                    }}
                />
                <ActivityIndicator animating={this.state.isLoading} size="large" color="#0000ff" style={{position:"absolute",
                 alignSelf:"center",
                 top:200
                }}/>
                </ScrollView>
            </View>
        )
    }
}

const style=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#FFF",
        padding:15,
        justifyContent:"flex-start"
    },
    labelText: {
        color:"#000",
        width:100
    },
    containerText: {
        flexDirection:"row",
        alignItems:"center",
        height:50
    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        borderWidth: 0,
        borderColor: '#000',
        height: 45,
        borderRadius: 20,
        marginLeft:30,
        marginRight:30,
        marginBottom:50
    },
    imageStyle: {
        padding: 10,
        margin: 20,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    txtStyle: {
        flex:1,
        color:"#000",
        borderBottomColor:"#000",
        borderBottomWidth:1,
        fontSize:14
    },
    labelTxt: {
        marginLeft:30,
        color:"#000",
        fontWeight:"bold"
    },
    btnSesion: {
        marginTop:20,
        marginLeft:30,
        marginRight:30,
        backgroundColor:"#06154a",
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50
    },
    btnPic: {
        marginTop:10,
        marginLeft:0,
        marginRight:0,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:"#CCC",
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:0
    },
       txtSession:{
        color:"#fff",
        fontSize:20,
        fontWeight:"bold"
    },
    txtSessionPic:{
        color:"#000",
        fontSize:16,
        fontWeight:"bold"
    }
});

export default LeaveScreen;