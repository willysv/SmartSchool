import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, Image, FlatList } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatGrid } from "react-native-super-grid";
import Http from 'smartstudent/src/libs/http';

class ListStudentScreen extends Component {

    state = {
        token:"",
        mobile:"",
        data:[]
    }

    componentDidMount = async () => {
        const token = await AsyncStorage.getItem("token");
        const mobile = await AsyncStorage.getItem("mobile");
        //await AsyncStorage.removeItem("token");
        if (token==null) {
            this.props.navigation.navigate('LoginStack');
        }
        this.setState({token,mobile});
        const form = new FormData();
        form.append("authtoken",this.state.token);
        form.append("mobile",this.state.mobile);
        const res = await Http.instance.post(`${Http.URL}getstudents.php`,form);
        console.log("Datos:", res);
        console.log("Toekn:", token);
        if (res.status=="success") {
            this.setState({data:res.rows});
        }
    }

    constructor(props) {
        super(props);
        this.state={check1:true};
    }

    displayImage(item) {
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

    showDasboard = async (sid) => {
        await AsyncStorage.setItem("sid",sid);
        this.props.navigation.navigate('DashboardStack');
    }

    render() {
        return (
            <View style={style.container}>
                  <FlatGrid
                    itemDimension={100}
                    data={this.state.data}
                    renderItem={ ({item})=>
                        <Pressable onPress={()=>this.showDasboard(item.sid)}>
                            <View style={style.listaItem}>
                                {this.displayImage(item)}
                                <Text style={style.tituloText}>{item.full_name}</Text>
                            </View>
                        </Pressable>
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
        paddingTop:30
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
        top:5
    },
    listaItem: {
        alignItems:"center" 
    },
    tituloText: {
        fontSize:10
    }
});

export default ListStudentScreen;