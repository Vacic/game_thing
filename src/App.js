import React from 'react';
import './css/main.css';
import BattleScreen from './components/BattleScreen';
import Equipment from './components/Equipment';
import Inventory from './components/Inventory';

function App() {
  return (
    <div className="App">
      <div className="container">
        <BattleScreen />
        <Equipment />
        <Inventory />
      </div>
    </div>
  );
}

export default App;
