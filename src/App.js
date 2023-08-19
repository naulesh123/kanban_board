import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Status from './Status';
import Priority1 from './Priority1';
import Users from './Users';

function App() {
  const [selectedGrouping, setSelectedGrouping] = useState('');
  const [selectedOrdering, setSelectedOrdering] = useState('');

  const handleGroupingSelection = (value) => {
    setSelectedGrouping(value);
  };

  const handleOrderingSelection = (value) => {
    setSelectedOrdering(value);
  };

  return (
    <Router>
      <div className="App">
       
       <div style={{height:"40px",position:"relative"}}>
        <div style={{marginLeft:"15px",marginTop:"10px"}}><Dropdown onSelectGrouping={handleGroupingSelection} onSelectOrdering={handleOrderingSelection}></Dropdown></div>
       </div>  
        

         

        <Routes> 
          <Route path="/" element={<Status order={selectedOrdering}/>} />
          <Route path="/Priority1" element={<Priority1 order={selectedOrdering}/>} />
          <Route path="/Users" element={<Users order={selectedOrdering}/>} />
        </Routes>
       
      </div>
      

    </Router>
  );
}

export default App;
