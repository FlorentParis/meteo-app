import React from 'react';
import './App.css';
import FetchWeather from './FetchWeather';
import Input from './input';

function App() {
  return (
    <div className="App">
      <Input/>
      <FetchWeather/>
    </div>
  );
}

export default App;
