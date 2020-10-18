import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch,Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';


export default function OrphanageData() {

  interface OrphanateParams{
    position:{
      latitude:number;
      longitude:number;
    }
  }
  
  const route = useRoute();
  const params = route.params as OrphanateParams;

  const [nome,setNome] = useState('');
  const [about,setAbout] = useState('');
  const [instructions,setInstructions] = useState('');
  const [open_on_weekends,setOpen] = useState(false);
  const [opening_hours,setHours] = useState('');
  const [images,setImages] = useState<string[]>([]);
  const navigation = useNavigation();

async function HandlerSelectImages(){

  const {status} = await ImagePicker.requestCameraRollPermissionsAsync();

 if(!status){
  alert('precisamos de acesso as suas fotos')
  return;
 } 

 const result = await ImagePicker.launchImageLibraryAsync({
   allowsEditing:true,
   quality:1,
   mediaTypes:ImagePicker.MediaTypeOptions.Images

 });

 if(result.cancelled){
   return;
 }

 const {uri} = result;

 setImages([...images,uri])

}

function handleCreateNewOrphanage(){

  const {latitude,longitude} = params.position;

  const data = new FormData();
  data.append('nome',nome);
  data.append('latitude',String(latitude));
  data.append('longitude',String(longitude));
  data.append('about',String(about));
  data.append('instructions',instructions);
  data.append('open_on_weekends',String(!!open_on_weekends));
  data.append('opening_hours',opening_hours);
  images.forEach((img,index) =>{
    data.append('images',
    { type:'image/jpg',
      uri:img,
      name:`image_${index}.jpg`

    } as any);
  })

  api.post('orphanages',data)
  .then(res => navigation.navigate('orphanagesMap'))
  .catch(error => alert('erro ao tentar cadastrar'))

}

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={text => setNome(text)}
        style={styles.input}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        value={about}
        onChangeText={text => setAbout(text)}
        style={[styles.input, { height: 110 }]}
        multiline
      />
      {/*  <Text style={styles.label}>Whatsapp</Text>
            <TextInput
              style={styles.input}
            /> */}

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadContainer}>
          {images.map(img =>{
            return(<Image
                  key={img}
                  source={{uri:img}}
                  style={styles.uploadedImage}

            />)

          })}
      </View>
      
      <TouchableOpacity style={styles.imagesInput} onPress={HandlerSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        value={instructions}
        onChangeText={text => setInstructions(text)}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        value={opening_hours}
        onChangeText={text => setHours(text)}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          value={open_on_weekends}
          onValueChange={setOpen}
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateNewOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  uploadContainer:{
    flexDirection:'row'
  },
  uploadedImage:{
    width:64,
    height:64,
    borderRadius:20,
    marginBottom:32,
    marginRight:8
  },
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: { 
    fontSize: 16,
    color: '#FFF',
  }
})