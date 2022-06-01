import React, {useEffect, useState} from "react";
import {addDoc, collection, getDocs} from "@firebase/firestore";
import {db} from "../firebase";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';


export default function MapTest() {

    const map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13,
        layers: [
            L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            })
        ]
    });

    L.marker([50.5, 30.5]).addTo(map);

    const [newName, setNewName] = useState("")
    const [newPhone, setNewPhone] = useState(0)
    const [newAddress, setNewAddress] = useState("")
    /*  const [newLat, setNewLat] = useState(0)
      const [newLng, setNewLng] = useState(0)*/

    const [users, setUsers] = useState([])
    const usersCollectionRef = collection(db, "users")

    const createUser = async () => {
        await addDoc(usersCollectionRef, {name: newName,
            phone: newPhone,
            address: newAddress,
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
    }, []);

    return (
        <div div id="map"></div>
  /*      <LeafletMap center={position} zoom={13} style={{ height: "100vh" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
                position={users.map((user) => {
                        return user.location.latitude, user.location.longitude

                    })}
                icon={icon}
                />
        </LeafletMap>*/
    )
}