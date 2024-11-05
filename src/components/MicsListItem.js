import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import GeopointToAddress from './GeopointToAddress';

const MicsListItem = ({mic, selectedId, handleSelect}) => {

	function renderButton(selectedId, micId) {

      if (selectedId==micId) {
         return <button onClick={() => handleSelect(micId)}>close>></button>
      } else {
         return <button onClick={() => handleSelect(micId)}>dates>></button>
      }

   }


	return (<div>

		 <Card
          className="bg-dark"
           style={{ width: '18rem', color: 'white', height: '200px' }}
        >
          <Card.Header>{mic.title}</Card.Header>
          <Card.Body>
            <Card.Title><GeopointToAddress geopoint={mic.location}/></Card.Title>
            <Card.Text>
              

               { renderButton(selectedId, mic.id) }
            </Card.Text>
          </Card.Body>
        </Card>
  
			
			
					 
			
			</div>);
}

export default MicsListItem;