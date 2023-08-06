import React from 'react';
import Header from './components/Header';
import {Route, BrowserRouter as Router, Routes} from  'react-router-dom';
import Rent from './components/Rent';


function App() {
  return (
     <Router >
      <Header />
      <Routes>
      <Route path='/' element={<Rent />}/>
        <Route path='/rent' element={<Rent />}/>
      </Routes>
     </Router>
  );
}

export default App;
