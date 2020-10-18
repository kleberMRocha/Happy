import React from 'react';
import { StyleSheet, Text,View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps{
    title?: string;
    noCloseButton?: boolean;
}

function Header({title,noCloseButton}:HeaderProps){

    const navigation = useNavigation();

    function handleGoToMap(){
        navigation.navigate('orphanagesMap');
    }

    function handleGoBack(){
        navigation.goBack();
    }

    return(
    <View style={styles.containerHeader}>
        <BorderlessButton>
            <Feather name="arrow-left" onPress={handleGoBack} size={26} color="#15C3D6" />
        </BorderlessButton>

        <Text style={styles.title} >{title}</Text>
        {!noCloseButton && (<BorderlessButton onPress={handleGoToMap}>
            <Feather name="x" size={26} color="#ff669d" />
        </BorderlessButton>) || <View/>
        }

    </View>)
}

const styles = StyleSheet.create({
    containerHeader:{
        padding:24,
        backgroundColor:'#faf9fc',
        borderBottomWidth:1,
        borderColor:'#faf9fc',
        paddingTop:44,
        flexDirection:'row',
        justifyContent:'space-between'

    },
    title:{
        color:'#8fa7b3',
        fontSize:16
    }

});


export default Header;