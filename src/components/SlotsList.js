import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const SlotsList = ({times}) => {
	

	return (<div>
			
				{ times.map((time, index) => { 

					return(<div key={index}>
								<Card className="bg-secondary">
									<Card.Header>
										{time.time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })}
									</Card.Header>
									<Card.Body>
										<Card.Title>
											{ (time.artist=='open') ? <h3></h3> : <h3>{time.artist}</h3> }
										</Card.Title>
										
									</Card.Body>
								</Card>
						 	</div>);
										}
											)}
			</div>);
}

export default SlotsList;