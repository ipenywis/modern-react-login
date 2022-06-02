import React, {useEffect, useState} from "react";
import {addDoc, collection, GeoPoint, getDocs} from "@firebase/firestore";
import {db} from "../firebase";


export default function Database () {
    const [newName, setNewName] = useState("")
    const [newPhone, setNewPhone] = useState(0)
    const [newAddress, setNewAddress] = useState("")
    const [newLat, setNewLat] = useState(0)
    const [newLng, setNewLng] = useState(0)

    const [users, setUsers] = useState([])
    const usersCollectionRef = collection(db, "users")

    const createUser = async () => {
        await addDoc(usersCollectionRef, {name: newName,
            phone: newPhone,
            address: newAddress,
            location: new GeoPoint(newLat, newLng)
    })
    }

    useEffect(() => {   //es mala practica hacer a un hook async, por eso creamos una funcion dentro del hook y esa es async

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({...doc.data(),
                id: doc.id
                })))
            //en la linea de arriba estamos recorriendo la coleccion y guardanco cada dato del documento en un array y tambien
            //trayendo el id de cada documento
        };

        getUsers();

        const location = users.map((user) => {
          console.log(["Location", user.location.latitude, user.location.longitude])

        })
        console.log(location)

    }, []);

    return (
        <div>
            <input
                placeholder="Name..."
                onChange={(event) => {
                    setNewName(event.target.value);
                }}
            />
            <input
                type="number"
                placeholder="Phone..."
                onChange={(event) => {
                    setNewPhone(event.target.value);
                }}
            />
            <input
                placeholder="Address..."
                onChange={(event) => {
                    setNewAddress(event.target.value);
                }}
            />
            <input
                placeholder="lat..."
                onChange={(event) => {
                    setNewLat(event.target.value);
                }}
            />
            <input
                placeholder="lng..."
                onChange={(event) => {
                    setNewLng(event.target.value);
                }}
            />

            <button onClick={createUser}>Create User</button>
            {users.map((user) => {
                return(
                <div>
                    {""}
                    <h1>Phone: {user.phone}</h1>
                    <h1>Name: {user.name}</h1>
                    <h1>Address: {user.address}</h1>
                    <h1>location: {["location", user.location.latitude, user.location.longitude]}</h1>
                  {/*  <h1>lng: {user.location.longitude}</h1>*/}
                </div>
                );
            })}
        </div>
    )
}
