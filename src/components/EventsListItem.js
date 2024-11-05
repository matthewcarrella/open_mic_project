import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const EventsListItem = ({event, handleSelectEvent, selectedEventId}) => {
	
	const begins = event.begins;
	const eventId = event.id;
	const beginsDate = begins.toDate();

	const [isSelectedEvent, setIsSelectedEvent] = useState(false);



	useEffect(() => {
		if (event.id==selectedEventId) {
			setIsSelectedEvent(true);
		} else {
			setIsSelectedEvent(false);
		}

	});

	return (<div style={{
       backgroundColor: isSelectedEvent ? 'green' : 'red',
      }}
    >
				<Row>
					<Col>
							<h3>{beginsDate.toLocaleString('en-US', {
	month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })}</h3>
					</Col>
					<Col>
							<button onClick={() => handleSelectEvent(eventId)}>view slots</button>
					</Col>
				</Row>
			

			</div>);
}

export default EventsListItem;