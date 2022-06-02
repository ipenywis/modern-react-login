import React, {useEffect, useRef, useState} from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import '../../App.css';
import 'leaflet/dist/leaflet.css';

import denuncias from '../../denuncias.json';
import {addDoc, collection, GeoPoint, getDocs} from "@firebase/firestore";
import {db} from "../../firebase";
import firebase from "firebase/compat";

delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('../../images/marker-icon-2x.png').default,
    iconUrl: require('../../images/marker-icon.png').default,
    shadowUrl: require('../../images/marker-shadow.png').default
});



function MapPicker() {


    const [users, setUsers] = useState([])
    const usersCollectionRef = collection(db, "users") //referencia a la bd
    const [newDni, setNewDni] = useState("")
    const [newName, setNewName] = useState("")
    const [newPhone, setNewPhone] = useState("")
    const [usersList, setUsersList] = useState()
    const [content, setContent] = useState([]);





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
            setUsers(data.docs.map((doc) => ({...doc.data()
            })))
            //en la linea de arriba estamos recorriendo la coleccion y guardanco cada dato del documento en un array y tambien
            //trayendo el id de cada documento
        };

       getUsers();


       const usersList = []

           const usersRef = firebase.database().ref('users')
           usersRef.on('value', (snapshot) => {
               const usersVal = snapshot.val()
               for (let id in usersVal) {
                   usersList.push(usersVal[id])

               }
               setUsersList(usersList)
           })

        console.log(usersList)


        {
            let locations = []
            {
                if (usersList) {
                    usersList.map((userVal) => {
                        console.log(userVal)
                        locations.push([userVal.issue, userVal.address.lat, userVal.address.lon, userVal.img])
                    })

                    /*   (async () => {
                           setContent(await getContentData())
                       }) ();*/

                    console.log(locations)

                } else {
                    return ('')
                }
            }

            console.log(locations)
            for (let i = 0; i < locations.length; i++) {
                new L.marker([locations[i][1], locations[i][2]])
                    .bindPopup("<img src = ' " + locations[i][3] + "' />" + locations[i][0])
                    .addTo(map)
                console.log(locations[i][3])

                console.log('kasemaster')
            }
        }

        function createMarker(latitude,longitude,popupContent){
            L.marker([latitude,longitude]).addTo(map)
                .bindPopup(popupContent);
        }

        createMarker(34.07381780761041, -118.44177995896911,"This was a marker made from our function!")
        createMarker(34.0211224,-118.3964665,"Back to Culver City!")


/*
           let locations = [
        ["Locations 1", 6.625117, 39.145004],
        ["Locations 2", -6.5767859, 39.1304557],
        ["Locations 3", -6.8667841, 39.2530337],
        ["Locations 4", -6.7787336, 39.2273218],
        ["Locations 5", -6.7576158, 39.2768276],
    ];



*/



    }, [])


    return (
        <div>
            <div className="MapPicker">
                <Map ref={mapRef} center={[-31.4167, -64.18]} zoom={13}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
                </Map>
                {JSON.stringify(usersList)}
            </div>
        </div>
    );
}



export default MapPicker;