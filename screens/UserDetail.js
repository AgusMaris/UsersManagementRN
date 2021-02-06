import React,{useEffect, useState} from 'react'
import { ActivityIndicator } from 'react-native';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Alert } from 'react-native'
import firebase from '../database/firebase'

const UserDetail = (props) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser]=useState({
        id:'',
        name:'',
        email:'',
        phone:''
    })
    const HandleChangeText=(name,value)=>{
        setUser({...user, [name]:value})
    }
    const getUserById=async (id)=>{
        const dbRef=firebase.db.collection('users').doc(id);
        const doc= await dbRef.get();
        
        const user=doc.data();
        console.log(user);
        setUser({...user, id: doc.id});
        setLoading(false);
    }

    const updateUser=async()=>{
        const dbRef=firebase.db.collection('users').doc(props.route.params.userId);
        await dbRef.set({
            name:user.name,
            phone:user.phone,
            email:user.email,
            
        }),
        setUser({
            id:'',
            name:'',
            email:'',
            phone:''
        });
        props.navigation.navigate("UserList")
    }
    const deleteUser=async()=>{
        const dbRef=firebase.db.collection('users').doc(props.route.params.userId);
        await dbRef.delete();
        props.navigation.navigate("UserList");
        
    }
    const openConfirmationAlert=()=>{
        Alert.alert('Remove the user', 'Are you sure?',[
            {text:'Yes', onPress:()=>deleteUser()},
            {text:'No', onPress:()=>console.log("cancelar")}

        ])
    }
    
    useEffect(()=>{
        getUserById(props.route.params.userId);

    },[])
    if(loading){
        return(
            <View><ActivityIndicator size="large" color="#35afe0"></ActivityIndicator></View>
        )
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Name User" value={user.name} onChangeText={(value)=>HandleChangeText('name', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Email User" value={user.email} onChangeText={(value)=>HandleChangeText('email', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Phone User" value={user.phone} onChangeText={(value)=>HandleChangeText('phone', value)}/>
            </View>
            <View>
                <Button title="Update User" onPress={()=> updateUser()} color='#cce860'/>
                
            </View>
            <View>
                <Button title="Delete User" onPress={()=> openConfirmationAlert()} color='red'/>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35
    },
    inputGroup:{
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderColor:'#CCCCCC'
    }
})
export default UserDetail
