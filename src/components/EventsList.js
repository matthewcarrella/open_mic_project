import React, {useState } from 'react';
import EventsListItem from './EventsListItem';


const EventsList = ({events, selectedMic, selectedEventId,  handleUnselect, handleSelectEvent}) => {
	const currentEvents = events ? events : [];
	const micInfo = selectedMic ? selectedMic.title : '';


	 return (
   <div>
   		<h2>{micInfo}</h2>
      {currentEvents.map((event, index) => (
      	<div key={index}>
      		
      		<EventsListItem key={index} event={event} selectedEventId={selectedEventId} handleUnselect={handleUnselect} handleSelectEvent={handleSelectEvent}/>
      	</div>
      
      ))}
   </div>
    
  );

}

export default EventsList;