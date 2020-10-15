import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import orphanagesMap from '../pages/OrphanagesMap';
import MainPage from '../pages/Main';

const {Navigator,Screen} = createStackNavigator();

function Routes(){
    return(
        <NavigationContainer>
                <Navigator screenOptions={{headerShown:false}}>
                        <Screen name='MainPage' component={MainPage}/>
                        <Screen name='orphanagesMap' component={orphanagesMap}/>
                </Navigator>
        </NavigationContainer>
    )
}

export default Routes;

