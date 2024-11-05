import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { db } from '../firebase.js';
import { collection, doc, query, orderBy, Timestamp, onSnapshot, getDoc, getDocs, setDoc, deleteDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { CookiesProvider, useCookies } from 'react-cookie';
import Organizer from './Organizer';

const OrganizerLogin = () => {


	const [cookies, setCookie] = useCookies(['open_mic_organizer_id', 'open_mic_organizer_name']);
	const [inputValue, setInputValue] = useState('');


  const handleChange = (event) => {
    setInputValue(event.target.value);
  };


	async function registerOrganizer(event) {
				const data = {
  							name: inputValue, 
				};

				event.preventDefault();
				const docRef = await addDoc(collection(db, 'organizers'), data);
				setCookie('open_mic_organizer_id', docRef.id, { path: '/'});
				setCookie('open_mic_organizer_name', inputValue, { path: '/'});
		}



	return (<CookiesProvider>
			<Container>
			<Row className="bg-primary text-center" style={{color: "white"}}>
					<Col>
						<h2>Organizer</h2>
					</Col>
			</Row>
		
			<Row className="bg-warning text-center">
					<Col>
					
      						<div>
        						{cookies.open_mic_organizer_id ? <Organizer organizerId={cookies.open_mic_organizer_id} />: 

        							 <form onSubmit={registerOrganizer}>
       <label>
      <h3 style={{color:"white", float: "left", marginRight: "10px"}}>Name</h3>
      <input type="text" value={inputValue} onChange={handleChange} />
      </label>
      <br/>

      <br/>
      <button type="submit">Submit</button>
        						</form>}
      						</div>
						
					</Col>
			</Row>
		</Container>
	</CookiesProvider>);



}


export default OrganizerLogin;