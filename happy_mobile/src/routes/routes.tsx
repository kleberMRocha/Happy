import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import orphanagesMap from '../pages/OrphanagesMap';
import MainPage from '../pages/Main';
import OrphanageData from '../pages/OrphanageData';
import SelectMapPosition from '../pages/SelectMapPosition';
import OrphanageDetails from '../pages/OrphanageDetails';
import  Header  from  '../components/header';

const {Navigator,Screen} = createStackNavigator();

function Routes(){
    return(
        <NavigationContainer>
                <Navigator 
                screenOptions={{headerShown:false,
                cardStyle:{backgroundColor:'#f2f3f5'}}}>

                        <Screen name='MainPage' component={MainPage}/>

                        <Screen name='orphanagesMap' component={orphanagesMap}/>

                        <Screen name='OrphanageData' options={{
                            headerShown:true,
                            header: () => <Header title="Cadastro de Orfanatos"/>

                        }} component={OrphanageData}/>

                        <Screen name='SelectMapPosition'
                            options={{
                                headerShown:true,
                                header: () => <Header title="Adicione um orfanato"/>

                            }}
                         component={SelectMapPosition}/>

                        <Screen name='OrphanageDetails' options={{
                            headerShown:true,
                            header: () => <Header title='Detalhes do Orfanato' noCloseButton={true} />

                        }} component={OrphanageDetails}/>

                </Navigator>
        </NavigationContainer>
    )
}

export default Routes;

