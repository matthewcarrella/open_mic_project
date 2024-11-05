import React from 'react';
import MicsListItem from './MicsListItem';

const MicsList = ({mics, selected, selectedMic, handleSelect}) => {

   const selectedId = selected;


   function renderButton(selectedId, micId) {

      if (selectedId==micId) {
         return <button onClick={() => handleSelect(micId)}>unselect</button>
      } else {
         return <button onClick={() => handleSelect(micId)}>select</button>
      }

   }

 

	 return (
   <div>

    {mics.map((mic, index) => (
         <div key={index} >
              <MicsListItem key={index} mic={mic}/>
               { renderButton(selectedId, mic.id) }
         </div>
      
      ))}
   </div>
    
  );

}

export default MicsList;