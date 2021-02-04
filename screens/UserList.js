import React, {useState, useEffect}from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import firebase from '../database/firebase'
const UserList = (props) => {
    const [users, setUsers]=useState([]);
    useEffect(()=>{
        firebase.db.collection('users').onSnapshot(querySnapshot=>{
            querySnapshot.docs.forEach(doc=>{
                const {name, email, phone}=doc.data()
                users.push({
                    id:doc.id, 
                    name, 
                    email, 
                    phone
                });
            })
            setUsers(users);
        });
    },[])
    
    return (
        <ScrollView>
            <Button title="Create User" onPress={()=>props.navigation.navigate("CreateUserScreen")}/>
        </ScrollView>
    )
}

export default UserList
