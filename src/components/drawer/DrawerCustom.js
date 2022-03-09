import React from 'react';
import { View, StyleSheet, Image, Linking, Pressable } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

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
                        <View style={{flexDirection:'column',marginTop: 40, marginBottom:40, alignItems:"center", marginRight:10}}>
                            <Pressable onPress={()=>props.navigation.navigate('Home')}>
                            <Image 
                                source={require("smartstudent/src/assets/avatar.png")}
                                size={50}
                            />
                            </Pressable>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            labelStyle={styles.itemMenu}
                            icon={({color, size}) => (
                                <Icon style={styles.searchIcon} name="info-circle" size={20} color={color}/>
                            )}
                            label="Información General"
                            onPress={() => {props.navigation.navigate('InfoGen')}}
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
    }
  });
//export default DrawerCustom;