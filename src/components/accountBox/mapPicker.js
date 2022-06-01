import React, {useEffect, useRef, useState} from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import '../../App.css';
import 'leaflet/dist/leaflet.css';

import denuncias from '../../denuncias.json';
import {addDoc, collection, GeoPoint, getDocs} from "@firebase/firestore";
import {db} from "../../firebase";

delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('../../images/marker-icon-2x.png').default,
    iconUrl: require('../../images/marker-icon.png').default,
    shadowUrl: require('../../images/marker-shadow.png').default
});



function MapPicker() {

/*
    let locations = [{
        "type": "Feature",
        "id": 3,
        "properties": {
            "Name": "Brasil decime que se siente"
        },
        "geometry": {
            "type": "Point",
            "coordinates":
        }
    }]
*/


    const [newName, setNewName] = useState("")
    const [newPhone, setNewPhone] = useState(0)
    const [newAddress, setNewAddress] = useState("")
    const [newLat, setNewLat] = useState(0)
    const [newLng, setNewLng] = useState(0)
    const[newCoordinates, setNewCoordinates] = useState([])

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
    }, []);


    const mapRef = useRef();
/*    const locations = [users.map((user) => {
        return [user.location.latitude, user.location.longitude]
    })
    ]*/
    useEffect(() => {
        const { current = {} } = mapRef;
        const { leafletElement: map } = current;

        if ( !map ) return;


       /*const parksGeoJson = new L.GeoJSON(denuncias).addTo(map), {
            onEachFeature: (feature = {}, layer) => {
                const { properties = {} } = feature;
                const { Name } = properties;

                if ( !Name ) return;

                layer.bindPopup(`<p>${Name}</p>`);
            }
        });*/

      //  L.marker([50.5, 30.5], []).addTo(map);
/*        export function createMarker(latitude,longitude,popupContent){

            L.marker([latitude,longitude]).addTo(map)
                .bindPopup(popupContent);
        }*/

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({...doc.data(),
                id: doc.id
            })))
            //en la linea de arriba estamos recorriendo la coleccion y guardanco cada dato del documento en un array y tambien
            //trayendo el id de cada documento
        };

        getUsers();

       const location = users.map( (user) => {
           let coordinate =  ["Location", user.location.latitude, user.location.longitude]
           console.log(coordinate)
/*
           let locations = [
               ["Locations 1", -31.0002, -61.9929]];

           console.log(locations)*/

/*              let marker = new L.marker([locations[1], locations[2]])
                   .bindPopup(locations[0])
                   .addTo(map)*/

        })




/*
           let locations = [
        ["Locations 1", 6.625117, 39.145004],
        ["Locations 2", -6.5767859, 39.1304557],
        ["Locations 3", -6.8667841, 39.2530337],
        ["Locations 4", -6.7787336, 39.2273218],
        ["Locations 5", -6.7576158, 39.2768276],
    ];
                 for (let i = 0; i < locations.length; i++) {
                      new L.marker([locations[i][1], locations[i][2]])
                           .bindPopup(locations[i][0])
                           .addTo(map)
                   }

*/

    }, [])


    return (
            <div className="MapPicker">
                <Map ref={mapRef} center={[-31.4167, -64.18]} zoom={13}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
                </Map>
                {JSON.stringify(users)}
            </div>
    );
}



export default MapPicker;