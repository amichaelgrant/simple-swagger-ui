import React from 'react';
import logo from './logo.svg';
import SimpleSwaggerUi from "./SimpleSwaggerUi";
import './App.css';

function App() {
  return (
    <div className="App">
      <SimpleSwaggerUi
        dom_id={""}
        spec={{}}
        url="http://petstore.swagger.io/v2/swagger.json"
      />
    </div>
  );
}

export default App;
