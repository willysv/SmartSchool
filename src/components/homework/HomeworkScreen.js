import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight, FlatList, Linking, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Http from 'smartstudent/src/libs/http';

class HomeworkScreen extends Component {

    state = {
        token:"",
        sid:"",
        data:[],
        dataHomework:[],
        this_sch:"",
        standard:"",
        section:""
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
        const formHomework = new FormData();
        formHomework.append("authtoken",token);
        formHomework.append("this_sch",this_sch);
        formHomework.append("standard",standard);
        formHomework.append("section",section);
        const resHomework = await Http.instance.post(`${Http.URL}searchhomework.php`,formHomework);
        if (resHomework.status=="success") {
            this.setState({dataHomework:resHomework.rows});
        }
    }

    displayImage1(item) {
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

    openLink = async (url)=> {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    getAttach(item,value) {
        if ((item[value]!="") && (item[value]!=null)) {
            return (
                <Pressable onPress={()=>this.openLink(`${Http.URL}${item[value]}`)}>
                    <View>
                        <Image
                            source={require('smartstudent/src/assets/attach.png')}
                            style={style.attach}
                        /> 
                    </View>
                </Pressable>
            );
        }
    }

    getData(value) {
        item=this.state.data[0];
        if (typeof(item)!="undefined") {
            return item[value];
        }
    }

    getDate(item,title) {
        const dateToFormat = moment(item).format("MM-DD-YYYY hh:mm");
        return (
            <View style={{flexDirection:"row"}}>
                <Text style={{color:"#000",fontWeight:"bold"}}>{title}</Text>
                <Text style={{color:"#000"}}>{dateToFormat}</Text>
            </View>
        );
    }

    async viewHomework(id,item) {
        await AsyncStorage.setItem("assid",id);
        this.props.navigation.navigate('HomeworkStack',{screen:"homeworkdetailview",params:{item}});
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
                <FlatList 
                    data={this.state.dataHomework}
                    renderItem = {
                        ({item}) => 
                            <View style={{marginBottom:10}}>
                                <View style={{flexDirection:"row",color:"#000"}}>
                                    {this.getDate(item.given_on,"Given on:")}
                                </View>
                                <Text style={style.titleHomework}>{item.assignment}</Text>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={[style.titleHomework,{fontWeight:"bold"}]}>Given by:</Text>
                                    <Text style={style.titleHomework}> {item.given_by}</Text>
                                </View>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={[style.titleHomework,{fontWeight:"bold"}]}>Subject:</Text>
                                    <Text style={style.titleHomework}>{item.subject}</Text>
                                </View>
                                <Text style={style.titleHomework}>{item.assignment}</Text>
                                {this.getDate(item.submission_dt,"Submission date:")}
                                <View style={{flexDirection:"row"}}>
                                    {this.getAttach(item,"attach1")}
                                    {this.getAttach(item,"attach2")}
                                    {this.getAttach(item,"attach3")}
                                    {this.getAttach(item,"attach4")}
                                    {this.getAttach(item,"attach5")}
                                    <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end"}}>
                                        <TouchableHighlight onPress={()=>this.viewHomework(item.assid,item)}>
                                            <View style={style.btnSesion}>
                                                <Text style={style.txtSession}>View Details</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                        
                    }
                />
            </View>
        )
    }
}

const style=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#FFF",
        padding:20,
        color:"#000"        
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
    },
    attach: {
        width:45,
        height:45
    },
    titleHomework: {
        color:"#000"
    }
});

export default HomeworkScreen;