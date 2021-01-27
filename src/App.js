import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import backgroundImage from './components/background.jpg';
function App() {
  return (
    <div >
    <BrowserRouter >
    
      <div className='start'  >
       <Navbar />   
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;