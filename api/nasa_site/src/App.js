import React from 'react';
import DataSet from './Components/DataSet';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
// import logo from './logo.svg';
import './App.css';

function App() {
  const data = [
    {
      name: '9:15', uv: 1000
    },
    {
      name: '9:30', uv: 3000
    },
    {
      name: '9:45', uv: 2000
    },
    {
      name: '10:00', uv: 2780
    },
    {
      name: '10:15', uv: 1890
    },
    {
      name: '10:30', uv: 2390
    },
    {
      name: '10:45', uv: 3490
    },
  ];
  return (
    
    <div className="App">
      <div className='Logo' >
      <h1 id="logo"></h1>
          <img src="hermes.jpg" width={100} and height={50}/>
    </div>
      <h2>Mare</h2>
       <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
      <h2>Temperatura</h2>
       <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
      <DataSet/>
    </div>
  )
  



  // return (
  //   <div className="content-section implementation">
  //       <h3>http://7b6a84dd.ngrok.io/devices</h3>
  //       {/* <Chart type="line" data={data} /> */}
  //   </div>
  // );
}

export default App;
