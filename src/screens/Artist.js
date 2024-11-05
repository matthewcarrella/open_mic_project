import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, doc, query, orderBy, Timestamp, onSnapshot, getDoc, getDocs, setDoc, deleteDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import ArtistHeader from '../components/ArtistHeader';
import MicsList from '../components/MicsList';
import EventsList from '../components/EventsList';
import Horizol from '../Horizol';
import TimesList from '../components/TimesList';

const Artist = ({userId}) => {
	const [mics, setMics] = useState([]);
	const [events, setEvents] = useState([]);
	const [selected, setSelected] = useState(null);
	const [selectedMic, setSelectedMic] = useState(null);
	const [selectedEventId, setSelectedEventId] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [times, setTimes] = useState([]);
	const [slots, setSlots] = useState([])
	const [isCanceling, setIsCanceling] = useState(false);
	const [artistData, setArtistData] = useState({name: ''});

	async function fetchMics() {
    const collectionRef = collection(db, 'mics');
    const snapshot = await getDocs(collectionRef);
     const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
     setMics(docs);

  }


  function selectMic(id) {
  	if (selected==id) {
  		setSelected(null);
  	} else {
  		setSelected(id);
  		setSelectedEventId(null);
  		setTimes([]);
  	}
  	setTimes([]);
  }




   async function fetchSelectedMic() {
   	if (selected) {
    const collectionRef = collection(db, 'mics');
    const docRef = doc(collectionRef, selected);
    const docSnap = await getDoc(docRef);
     if (docSnap.exists()) {
        setSelectedMic(docSnap.data());
        console.log('DATA IS');
        console.log(docSnap.data());
      } else {
        console.log('No such document!');
      }
      setTimes([]);

  }


  }

  

    async function fetchEvents() {
  	if (selected) {
  		const collectionRef = collection(db, 'mics', selected, 'events');
  		const snapshot = await getDocs(collectionRef);
  		const docs = snapshot.docs.map((doc) => ({
  			id: doc.id,
  			...doc.data(),
  			}));
  		setEvents(docs);
  	} else {
  		setEvents(null);
  	}
  }

  function handleSelectEvent(id) {
  	console.log('selecting event with id');
  	console.log(id);
  	setSelectedEventId(id);
  
  }

  async function fetchSelectedEvent() {
  	if (selectedEventId) {
  	console.log('FETCHING DATA FOR EVENT');
   	const collectionRef = collection(db, 'mics', selected, 'events');
   	console.log('selected mic is');
   	console.log(selected);
   	console.log('selected event is');
   	console.log(selectedEventId);
   	const docRef = doc(collectionRef, selectedEventId);
   	const docSnap = await getDoc(docRef);
   	console.log("AWAITING DOCSNAP");
   	if (docSnap.exists()){
   		setTimes([]);
   		console.log("GOT EVENT DATA");
   		setSelectedEvent(docSnap.data());
   		
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
		console.log("STARTING AT");
		console.log(currentDate);
		let endDate = new Date(currentDate);
	endDate.setHours(endDate.getHours() + 2);
	console.log("ENDING AT");
	console.log(endDate);
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

  
      const collectionRef = collection(db, 'mics', selected, 'events', selectedEventId, 'slots');
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
        setSlots(documents);

        
    } catch (error) {
        console.log("there was an error" + error);
      }


      updateTimes();

      

      };


      function updateTimes() {
      	

	slots.forEach((slot, sindex) => {
			

			times.forEach((time, tindex) => {
				
				slot.time.setSeconds(0);
				time.time.setSeconds(0);
				slot.time.setMilliseconds(0);
				time.time.setMilliseconds(0);

				if (slot.time.getTime()===time.time.getTime()) {
				
					const copyTimes = times;
					copyTimes[tindex] = {time: time.time, id: slot.id, artist: slot.artist, uid: slot.uid};
					
		
					setTimes(copyTimes);
				

				

				}
			})



		})

}


async function signUpForSlot(date_time) {

	const userName = artistData.name;

		try {
		date_time.setSeconds(0);
		date_time.setMilliseconds(0);
		const timeStamp = Timestamp.fromDate(date_time);
		timeStamp.nanoseconds = 0;
		console.log("mic is" + selected);
		console.log("event is " + selectedEventId);
		
		const docRef = await addDoc(collection(db, "mics", selected, "events", selectedEventId, "slots"), {
			artist: userName,
			time: timeStamp,
			testthing: "it worked",
			uid: artistData.id

		});
	} catch (error) {
		console.log("there was an error" + error);
		

	}
	}

	async function cancelSlot(timeId) {
     console.log('------');
     console.log(selected);
     console.log(selectedEventId);
     console.log(timeId);
     console.log('-------')
  try {
    await deleteDoc(doc(db, "mics", selected, "events", selectedEventId, "slots", timeId));
    setIsCanceling(true);

    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document: ', error);
  }


};


async function fetchArtistData() {
   	if (userId) {
    const collectionRef = collection(db, 'artists');
    const docRef = doc(collectionRef, userId);
    const docSnap = await getDoc(docRef);
     if (docSnap.exists()) {
        setArtistData({id: docSnap.id, ...docSnap.data()});
        console.log('ARTIST DATA IS');
        console.log(docSnap.data());
      } else {
        console.log('No such document!');
      }
   

  }


  }


	
useEffect(() => {
	if (selectedEvent) {
		createDateTimeArray(selectedEvent.begins);
   		fetchSlotData();
   	}
}, [selectedEvent]);

useEffect(() => {
	fetchSelectedEvent();
	fetchSlotData();
	

},[selectedEventId]);


useEffect(() => {
		
		fetchSlotData();
	   
	
		
	

	}, [slots, times, events, selectedEventId]);

  useEffect(() => {
  	setTimes([]);
  	fetchMics();
  	fetchSelectedMic();
  	fetchEvents();
  }, [selected]);

  useEffect(() => {
  
  		setTimes([]);
  		fetchSelectedEvent();
  		setIsCanceling(false);

  }, [isCanceling]);

  useEffect(() => {
  	console.log("USER ID IS: " + userId);
  	fetchArtistData();
  	console.log("USER DATA FROM COMPONENT IS: " + artistData);
  }, [])


	return (
		<div>
			<ArtistHeader artistName={artistData.name}/>
			<br/><br/>
			<Horizol mics={mics} selected={selected} handleSelect={selectMic}/>
			
		<br/>
			<EventsList selectedMic={selectedMic} selectedEventId={selectedEventId} handleSelectEvent={handleSelectEvent} events={events} handleUnselect={() => setSelected(null)}/>
			<br/><br/>
			<TimesList times={times} signUp={signUpForSlot} userId="liwQwQnrA3donv9n6EiM" cancelSlot={cancelSlot}/>
		</div>
		)
}

export default Artist;