import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navigation from './components/Navigation';
import Artist from './screens/Artist';
import ArtistLogin from './screens/ArtistLogin';
import OrganizerLogin from './screens/OrganizerLogin';
import About from './screens/About';
import logo from './logo.svg';

import './App.css';
const App = () => {
  return (
    <div>
     
    <Router>
   <Navigation/>
      <Routes>
        <Route exact path="/" element={<ArtistLogin/>} />
        <Route path="/organizer" element={<OrganizerLogin/>} />
        <Route path="/about" element={<About />} />
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
