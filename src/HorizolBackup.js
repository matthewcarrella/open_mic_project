import React from 'react';
import HScrollGrid from 'react-horizontal-scroll-grid';

const Horizol = ({mics}) => {
    const keys = [1, 2, 3, 4, 5, 6];
    // const cards = keys.map(elem => <li key={elem}> Test </li>);
    const cards = mics.map(mic => <li key={mic.id}> {mic.title} </li>);
    return (
        <>
            <HScrollGrid
                gridWidth={400}
                gridHeight={100}
                cardWidth={100}
                backgroundColor="antiquewhite"
            >
                {cards}
            </HScrollGrid>

            <HScrollGrid
                gridWidth={700}
                gridHeight={100}
                cardWidth={200}
                backgroundColor="antiquewhite"
            >
                {cards}
            </HScrollGrid>

            <HScrollGrid
                gridWidth={1000}
                gridHeight={300}
                cardWidth={400}
                backgroundColor="#ecf2a7"
            >
                {cards}
            </HScrollGrid>
        </>
    )
};

export default Horizol;



//     const keys = [1, 2, 3, 4, 5, 6];
//     // const cards = keys.map(elem => <li key={elem}> Test </li>);
//     // const cards = mics.map(mic => <li key={mic.id}> {mic.title} </li>);
//     const cards = mics.map(mic => <MicsListItem key={mic.id} mic={mic} selectedId={selected} handleSelect={handleSelect}/ >);
//     return (
//         <div style={{overflowX: "auto"}} >
   

//             <HScrollGrid
//                 style={{overflowX: "auto"}}
//                 gridWidth={700}
//                 gridHeight={100}
//                 cardWidth={400}
//                 backgroundColor="antiquewhite"
//             >
//                 {cards}
//             </HScrollGrid>

//         </div>
//     )
// };