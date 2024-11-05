import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const TimesList = ({times, signUp, userId, cancelSlot}) => {
	

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
											{ (time.artist=='open') ? <button onClick={() => signUp(time.time)}>take slot</button> : <h3>{time.artist}</h3> }
										</Card.Title>
										<Card.Text>
											{ (userId===time.uid) ? <button onClick={() => cancelSlot(time.id)}>cancel</button> : <br/> }
										</Card.Text>
									</Card.Body>
								</Card>
						 	</div>);
										}
											)}
			</div>);
}

export default TimesList;