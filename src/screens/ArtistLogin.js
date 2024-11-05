import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { db } from '../firebase.js';
import { collection, doc, query, orderBy, Timestamp, onSnapshot, getDoc, getDocs, setDoc, deleteDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { CookiesProvider, useCookies } from 'react-cookie';
import Artist from './Artist';

const ArtistLogin = () => {


	const [cookies, setCookie] = useCookies(['open_mic_id', 'open_mic_name']);
	const [inputValue, setInputValue] = useState('');


  const handleChange = (event) => {
    setInputValue(event.target.value);
  };


	async function registerUser(event) {
				const data = {
  							name: inputValue, 
				};

				event.preventDefault();
				const docRef = await addDoc(collection(db, 'artists'), data);
				setCookie('open_mic_id', docRef.id, { path: '/'});
				setCookie('open_mic_name', inputValue, { path: '/'});
		}



	return (<CookiesProvider>
			<Container>
			<Row className="bg-primary text-center" style={{color: "white"}}>
					<Col>
						<h2>Artist</h2>
					</Col>
			</Row>
		
			<Row className="bg-warning text-center">
					<Col>
					
      						<div>
        						{cookies.open_mic_id ? <Artist userId={cookies.open_mic_id} />: 

        							 <form onSubmit={registerUser}>
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


export default ArtistLogin;