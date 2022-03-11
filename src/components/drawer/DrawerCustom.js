import React from 'react';
import { View, StyleSheet, Image, Linking, Pressable } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props) {

    closeSesion = async () => {
        await AsyncStorage.removeItem("token");
        props.navigation.navigate('LoginStack');
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
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'column',marginTop: 0, marginBottom:20, alignItems:"flex-end", marginRight:0}}>
                            <Pressable onPress={()=>props.navigation.navigate('Home')}>
                            <Image 
                                style={styles.imgMenu}
                                source={require("smartstudent/src/assets/logomenu.png")}
                            />
                            </Pressable>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            labelStyle={styles.itemMenu}
                            icon={({color, size}) => (
                                <Image
                                    style={styles.iconImage}
                                    source={require("smartstudent/src/assets/iconlist.png")}
                                />
                            )}
                            label="List"
                            onPress={() => {props.navigation.navigate('ListStudenStack')}}
                        />
                        <DrawerItem 
                            labelStyle={styles.itemMenu}
                            icon={({color, size}) => (
                                <Image
                                    style={styles.iconImage}
                                    source={require("smartstudent/src/assets/iconstudent.png")}
                                />
                            )}
                            label="Student"
                            onPress={() => {props.navigation.navigate('InfoGen')}}
                        />
                        <DrawerItem 
                            labelStyle={styles.itemMenu}
                            icon={({color, size}) => (
                                <Image
                                    style={styles.iconImage}
                                    source={require("smartstudent/src/assets/iconschool.png")}
                                />
                            )}
                            label="School"
                            onPress={() => {props.navigation.navigate('InfoGen')}}
                        />
                        <DrawerItem 
                            labelStyle={styles.itemMenu}
                            icon={({color, size}) => (
                                <Image
                                    style={styles.iconImage}
                                    source={require("smartstudent/src/assets/iconpassmenu.png")}
                                />
                            )}
                            label="Password"
                            onPress={() => {props.navigation.navigate('InfoGen')}}
                        />
                        <DrawerItem 
                            labelStyle={styles.itemMenu}
                            icon={({color, size}) => (
                                <Image
                                    style={styles.iconImage}
                                    source={require("smartstudent/src/assets/iconlogout.png")}
                                />
                            )}
                            label="Log Out"
                            onPress={() => {
                                this.closeSesion();
                            }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            {/*
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <MaterialCommunityIcons style={styles.searchIcon} name="exit-to-app" size={20} color={color}/>
                    )}
                    label="Salir"
                    onPress={() => {BackHandler.exitApp()}}
                />
            </Drawer.Section>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    contactIcon: {
        borderBottomColor:"#CCC",
        borderBottomWidth:1
    },
    iconImage: {
        width: 40,
        height:40,
        resizeMode: 'stretch'
    },
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    itemMenu: {
        fontSize:16
    },
    imgMenu: {
        width: 280,
        marginLeft:-11,
        marginTop:-10,
        height:200,
        resizeMode: 'stretch'
    }
  });
//export default DrawerCustom;