import React, {useEffect, useRef, useState} from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap'
import {useAuth} from "../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';
import {addDoc, collection, GeoPoint} from "@firebase/firestore";

import { toast } from "react-toastify"
import reference from '../firebase'
import firebase from "firebase/compat/app"
import { getDatabase, ref, set } from "firebase/database";
import 'firebase/compat/database'
import L from "leaflet";

export default function Register() {

    const [error, setError] = useState('') //vacio porque no va a tener un error por default
    const [info, setInfo] = useState(true)
/*    const [state, setState] = useState(initialState)
    const [data, setData] = useState({})*/

    const [newDni, setNewDni] = useState("")
    const [newName, setNewName] = useState("")
    const [newPhone, setNewPhone] = useState("")
    const [registeredUsersList, setRegisteredUsersList] = useState()
    const [usersList, setUsersList] = useState()



    const createRegisteredUsers = () =>{
        const registeredUsersRef = firebase.database().ref('registeredUsers/')
        const regisUsers = {
            dni: newDni,
            phone_number: newPhone,
            name: newName
        };
        registeredUsersRef.push(regisUsers);

    }

    useEffect(() => {

        const usersRef = firebase.database().ref('users')
        usersRef.on('value', (snapshot) => {
            const usersVal = snapshot.val()
            const usersList = []
            for (let id in usersVal) {
                usersList.push(usersVal[id])
            }
            console.log(usersList)
            setUsersList(usersList)
        })


    }, [])



    return (
        <div>

            <input
                placeholder="Dni..."
                onChange={(event) => {
                    setNewDni(event.target.value);
                }}
            />
            <input
                placeholder="Phone..."
                onChange={(event) => {
                    setNewPhone(event.target.value);
                }}
            />
            <input
                placeholder="Name..."
                onChange={(event) => {
                    setNewName(event.target.value);
                }}
            />

            <button onClick={createRegisteredUsers}>Create User</button>

            {usersList ? usersList.map((userVal) => {
                let locations = [userVal.address.lat, userVal.address.lon]
                console.log(userVal.address.lat)
                console.log(locations)
/*
                for (let i = 0; i < locations.length; i++) {
                    new L.marker([locations[i][1], locations[i][2]])
                        .bindPopup(locations[i][0])
                        .addTo(map)

                    console.log('kasemaster')
                }*/
                return(
                    <div>
                        {""}
                        <h1>address: {[userVal.address.lat, userVal.address.lon] }</h1>
                        <h1>issue: {userVal.issue}</h1>
                        <h1>Phone_number: {userVal.phone_number}</h1>
                        <h1>Location: {locations}</h1>

                    </div>
                );
            }): ''}
        </div>
    )



};

