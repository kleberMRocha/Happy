import React from 'react';
import {Text,StyleSheet, View,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import logo from '../img/logo/Logotipo.png';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function MainPage(){
    const navigation = useNavigation();

    function HandleNavToMaps(){
        navigation.navigate('orphanagesMap');
    }

    return (
    <View style={styles.MainContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.textMain}>São Paulo</Text>
        <Text style={styles.textMain}>Guarulhos</Text>

        <View style={styles.btnContainer}>
            <TouchableOpacity onPress={HandleNavToMaps} style={styles.enterApp}  >
                <Feather name='arrow-right' size={32} color='#2AB5D1' />
            </TouchableOpacity>
        </View> 

    </View>


    );
}

const styles = StyleSheet.create({
    MainContainer:{
        backgroundColor:'#2AB5D1',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
        
    },
    mainGb:{
        backgroundColor:'#2AB5D1'
    },
    btnContainer:{
        width:'100%',
        height:200,
        justifyContent:'center',
        alignItems:'center'

    },
    enterApp:{
    
        backgroundColor:'#fff',
        width:120,
        height:60,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        margin:10
    },
    textMain:{
        color:'#fff',
      
    },logo:{
        margin:20,  
    }
});

export default MainPage;