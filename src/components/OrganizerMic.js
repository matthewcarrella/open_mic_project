import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { db } from '../firebase.js';
import { collection, doc, query, orderBy, Timestamp, onSnapshot, getDoc, getDocs, setDoc, deleteDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import GeopointToAddress from './GeopointToAddress';
import EventsListItem from './EventsListItem';
import SlotsList from './SlotsList';


const OrganizerMic = ({micData}) => {
  const [show, setShow] = useState(false);
  const [dateTime, setDateTime] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventData, setSelectedEventData] = useState(null);
  const [times, setTimes] = useState([]);
  const [slots, setSlots] = useState([]);
  const [createEvent, setCreateEvent] = useState(false);

  const handleChange = (event) => {
    setDateTime(event.target.value);
  };


  function handleSelect(eventId) {
     setSelectedEvent(eventId);
  
  }


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


   async function fetchSelectedEvent() {
    if (selectedEvent) {

    const collectionRef = collection(db, 'mics', micData.id, 'events');

    const docRef = doc(collectionRef, selectedEvent);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()){
     

      setSelectedEventData({id: docSnap.id, ...docSnap.data()});
      
    } else {
      console.log("NO SUCH EVENT");
    }
   }
}



  function createDateTimeArray(startDate) {
      console.log("CREATING SLOT ARRAY");
      console.log(startDate.toDate());
    const result = [];
    const intervalMinutes = 20;
    let currentDate = new Date(startDate.toDate());

    let endDate = new Date(currentDate);
  endDate.setHours(endDate.getHours() + 2);

    while (currentDate <= endDate) {
    
      const nextDate = currentDate;

  
      result.push({time: new Date(currentDate), artist: "open"});
      currentDate.setMinutes(currentDate.getMinutes() + intervalMinutes);

    }

    setTimes(result);
    console.log('times are');
    console.log(result);
    console.log(times);
    

  }


  async function fetchSlotData() {
    try {

  
      const collectionRef = collection(db, 'mics', micData.id, 'events', selectedEvent, 'slots');
      const querySnap = await getDocs(collectionRef);
      const documents = [];
      querySnap.forEach((doc) => {
        
        const doc_data = doc.data();
        console.log("DOC DATA IS" + doc_data);
        console.log(doc_data.artist);
        console.log(doc_data.time);
        console.log(doc_data.uid);
        const formatTime = doc_data.time.toDate();
        const reactFormat = new Date(formatTime);
        documents.push({id: doc.id, artist: doc_data.artist, time: reactFormat, uid: doc_data.uid, test: "hard coded"});
      }); 

      console.log("SLOT DOCUMENTS ARE");
      console.log(documents);
        setSlots(documents);

        
    } catch (error) {
        console.log("there was an error" + error);
      }


      updateTimes();

      

      };


      function updateTimes() {
        console.log('UPDATING THE TIMEEEES');

  slots.forEach((slot, sindex) => {
      console.log("HERE IS A SLOT");
      console.log(slot);

      times.forEach((time, tindex) => {
        
        slot.time.setSeconds(0);
        time.time.setSeconds(0);
        slot.time.setMilliseconds(0);
        time.time.setMilliseconds(0);
        console.log("COMPARING");
        console.log(slot.time.getTime());
        console.log(time.time.getTime());


        if (slot.time.getTime()===time.time.getTime()) {
          console.log('THEY MATCH');
        
          const copyTimes = times;
          copyTimes[tindex] = {time: time.time, id: slot.id, artist: slot.artist, uid: slot.uid};
          
    
          setTimes(copyTimes);
        

        

        }
      })



    })

}



	async function addDate() {
   console.log("READY TO ADD A DATE");
   const dateObj = new Date(dateTime);
   let endDate = new Date(dateObj);
   endDate.setHours(endDate.getHours() + 2);
   const collectionRef = collection(db, 'mics', micData.id, 'events');

   const timestampBegins = Timestamp.fromDate(dateObj);
   const timestampEnds = Timestamp.fromDate(endDate);



    try {
      const docRef = await addDoc(collectionRef, {
        begins: timestampBegins,
        ends: timestampEnds
        // Add more fields as needed
      });

      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    const hasCreated = !createEvent;
    setCreateEvent(hasCreated);
    handleClose();
  };


   async function fetchEvents() {
  
      const collectionRef = collection(db, 'mics', micData.id, 'events');
      const snapshot = await getDocs(collectionRef);
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
      setEvents(docs);

  }
 

 useEffect(() => {
 	console.log("the component is loading properly");
 	console.log(micData);
  fetchEvents();
 }, [createEvent]);





 useEffect(() => {
  if (selectedEventData) {
    createDateTimeArray(selectedEventData.begins);
      fetchSlotData();
    }
}, [selectedEventData]);

useEffect(() => {
  fetchSelectedEvent();

  

},[selectedEvent]);


useEffect(() => {
  updateTimes();
}, [slots]);

 return (
  <div>
   <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event Date</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}><input aria-label="Date and time" type="datetime-local" onChange={handleChange} /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addDate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
              

              <button  onClick={handleShow}>Add dates</button>
            </Card.Text>
          </Card.Body>
          </Card></Col><Col xs={4}/>
    </Row>

    { events.map((event) => {
      return <EventsListItem key={event.id} event={event} selectedEventId={selectedEvent} handleSelectEvent={handleSelect}/>
    })}

    <SlotsList times={times}/>

    </div>);
}

export default OrganizerMic;


