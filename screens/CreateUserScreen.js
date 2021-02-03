import React, {useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase'

const CreateUserScreen = (props) => {
    const [state, setState]=useState({
        name:'',
        email:'',
        phone:''
    })
    const HandleChangeText=(name,value)=>{
        setState({...state, [name]:value})
    }
    const SaveNewUser= async ()=>{
        await firebase.db.collection('users').add(state)
        props.navigation.navigate('UserList')
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Name User" onChangeText={(value)=>HandleChangeText('name', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Email User" onChangeText={(value)=>HandleChangeText('email', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Phone User" onChangeText={(value)=>HandleChangeText('phone', value)}/>
            </View>
            <View>
                <Button title="Save User" onPress={()=> SaveNewUser()}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputGroup:{
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderColor:'#CCCCCC'
    },
    container:{
        flex:1,
        padding:35
    }
})

export default CreateUserScreen
