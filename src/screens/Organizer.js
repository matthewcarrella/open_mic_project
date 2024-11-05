import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { db } from '../firebase.js';
import { collection, doc, query, orderBy, Timestamp, GeoPoint, onSnapshot, getDoc, getDocs, setDoc, deleteDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { setKey, setDefaults, getLatLng, fromAddress } from 'react-geocode';
import OrganizerMic from '../components/OrganizerMic';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GEOCODE_API_KEY;
setKey(GOOGLE_MAPS_API_KEY);


const Organizer = ({organizerId}) => {
	const [organizerData, setOrganizerData] = useState(null);
	const [organizerMic, setOrganizerMic] = useState(null);
	const [micName, setMicName] = useState('');
	const [streetAddress, setStreetAddress] = useState('');
	const [venueZip, setVenueZip] = useState('');
	const [venueCity, setVenueCity] = useState('');
	const [micCreated, setMicCreated] = useState(false);

	const handleNameChange = (event) => {
    setMicName(event.target.value);
  };

  const handleStreetChange = (event) => {
    setStreetAddress(event.target.value);
  };

  const handleZipChange = (event) => {
    setVenueZip(event.target.value);
  };

  const handleCityChange = (event) => {
    setVenueCity(event.target.value);
  };

	async function fetchOrganizerMic() {
   			if (organizerId) {
    				const collectionRef = collection(db, 'mics');
    				const docRef = doc(collectionRef, organizerId);
    				const docSnap = await getDoc(docRef);
     				if (docSnap.exists()) {
        					setOrganizerMic(docSnap.data());

      				} else {
       						 console.log('No such document!');
      				}
   

  			}


  }


  async function createOrganizerMic(event) {

  
  	event.preventDefault();
  	const name = micName;
  	const street = streetAddress;
  	const vZip = venueZip;
  	const vCity = venueCity;
  	const fullMicAddress = street + ", " + vCity + ", " + "NY" + ", " + vZip;
  	console.log("full mic address is: " + fullMicAddress);
  	const geoResponse = await fromAddress(fullMicAddress);
  	const { lat, lng } = geoResponse.results[0].geometry.location;
  	const geoPoint = new GeoPoint(lat, lng);
  	    const data = {
  							title: micName,
  							location: geoPoint
				};

	const docRef =  doc(db, 'mics', organizerId);
	setDoc(docRef, data);


		


  	console.log("creawting a mic");
  	setMicCreated(true);

//   	fetchOrganizerMic();
//   	setMicCreated(true);

  }


  async function fetchOrganizerData() {
   	if (organizerId) {
    const collectionRef = collection(db, 'organizers');
    const docRef = doc(collectionRef, organizerId);
    const docSnap = await getDoc(docRef);
     if (docSnap.exists()) {
        setOrganizerData(docSnap.data());

      } else {
        console.log('No such document!');
      }
   

  }


  }


  useEffect(() => {

  	fetchOrganizerData();
  	fetchOrganizerMic();
  }, [micCreated]);


  async function fetchOrganizerMic() {

    const docRef = doc(db, 'mics', organizerId); // Replace with your collection and document ID

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
 
          setOrganizerMic(docSnap.data());
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.error('Error getting document:', error);
      });
  }


	return (<div>
					{ (organizerData) ? <h2>{organizerData.name}</h2> : <h2></h2> }

			{ (organizerMic) ? <OrganizerMic micData={organizerMic}/> : 
		<div>
			<p>Please provide information about your venue</p>
				 <form onSubmit={createOrganizerMic}>
		<Row>
				<Col>
       					<label>
      							<h3 style={{float: "left", marginRight: "10px"}}>Name</h3>
      							<input type="text" value={micName} onChange={handleNameChange} />
      					</label>
      			</Col>
      			<Col>
      					 <label>
      <h3 style={{float: "left", marginRight: "10px"}}>Street</h3>
      <input type="text" value={streetAddress} onChange={handleStreetChange} />
      </label>
      			</Col>
      	</Row>
      	<Row>
      			<Col>
      					<label>
      <h3 style={{float: "left", marginRight: "10px"}}>City</h3>
      <input type="text" value={venueCity} onChange={handleCityChange} />
      </label>
      			</Col>
      			<Col>

       <label>
      <h3 style={{float: "left", marginRight: "10px"}}>Zip</h3>
      <input type="text" value={venueZip} onChange={handleZipChange} />
      </label>
      			</Col>

      </Row>
      
      
      <br/>

      <br/>
      <button type="submit">Submit</button>
        						</form></div>

		}
			</div>);
}

export default Organizer;