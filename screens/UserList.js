import React, {useState, useEffect}from 'react'
import { View, Text, Button, ScrollView, ActivityIndicator } from 'react-native'
import firebase from '../database/firebase'
import {ListItem, Avatar} from 'react-native-elements'
const UserList = (props) => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers]=useState([]);
    useEffect(()=>{
        firebase.db.collection('users').onSnapshot(querySnapshot=>{
            const users=[];
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
            setLoading(false);
            console.log(users);
        });
    },[])
    if(loading){
        return(
            <View><ActivityIndicator size="large" color="#35afe0"></ActivityIndicator></View>
        )
    }
    return (
        <ScrollView>
            
            {
                users.map(user=>{
                    return(
                        <ListItem key={user.id} bottomDivider onPress=
                        {()=>props.navigation.navigate('UserDetail',{
                            userId:user.id
                        })}>
                            <ListItem.Chevron></ListItem.Chevron>
                            <Avatar title={user.name.split(' ')[0][0]+ (user.name.split(' ')[1]?user.name.split(' ')[1][0]:"")} 
                                size="medium" titleStyle={{color:'gray'}}
                                containerStyle={{backgroundColor:'#f2f2f2'}}
                                rounded
                            >
                                
                            </Avatar>
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
            <View style={{padding:35}}>
                <Button title="Create User" onPress={()=>props.navigation.navigate("CreateUserScreen")}/>
            </View>
        </ScrollView>
    )
}

export default UserList
