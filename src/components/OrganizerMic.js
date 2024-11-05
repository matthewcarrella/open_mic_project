import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GeopointToAddress from './GeopointToAddress';


const OrganizerMic = ({micData}) => {
	 function addDate() {
   console.loga("READY TO ADD A DATE");
 }

 useEffect(() => {
 	console.log("the component is loading properly");
 	console.log(micData);
 }, []);

 return (
 	<Row className="text-center">
 	<Col xs={4}/>

 	<Col xs={4}><Card
          className="bg-dark"
           style={{ width: '18rem', color: 'white', height: '200px' }}
        >
          <Card.Header>{micData.title}</Card.Header>
          <Card.Body>
            <Card.Title><GeopointToAddress geopoint={micData.location}/></Card.Title>
            <Card.Text>
              

              <button onClick={addDate}>Add dates</button>
            </Card.Text>
          </Card.Body>
          </Card></Col><Col xs={4}/></Row>);
}

export default OrganizerMic;


