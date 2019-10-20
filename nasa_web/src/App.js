import React from 'react';
import DataSet from './Components/DataSet';
import * as echarts from 'echarts';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
// import logo from './logo.svg';
import './App.css';
import Hermes from './hermes.jpg'

function App() {
  const data = [
    {
      name: '9:15', Mare: 800, Baixa: 1100, Media: 1900, Alta: 3400
    },
    {
      name: '9:30', Mare: 1200, Baixa: 1100, Media: 1900, Alta: 3400
    },
    {
      name: '9:45', Mare: 1000, Baixa: 1100, Media: 1900, Alta: 3400
    },
    {
      name: '10:00', Mare: 2000, Baixa: 1100, Media: 1900, Alta: 3400
    },
    {
      name: '10:15', Mare: 1900, Baixa: 1100, Media: 1900, Alta: 3400
    },
    {
      name: '10:30', Mare: 2800, Baixa: 1100, Media: 1900, Alta: 3400
    },
    {
      name: '10:45', Mare: 3600, Baixa: 1100, Media: 1900, Alta: 3400
    }
  ];

  const data2 = [
    {
      name: '9:15', Temperatura: 14,  Ideal: 14, Baixo: 6, Muito_Baixo: 0, Alto: 26, Muito_Alto: 35
    },
    {
      name: '9:30', Temperatura: 8,  Ideal: 14, Baixo: 6, Muito_Baixo: 0, Alto: 26, Muito_Alto: 35
    },
    {
      name: '9:45', Temperatura: 1,  Ideal: 14, Baixo: 6, Muito_Baixo: 0, Alto: 26, Muito_Alto: 35
    },
    {
      name: '10:00', Temperatura: 17,  Ideal: 14, Baixo: 6, Muito_Baixo: 0, Alto: 26, Muito_Alto: 35
    },
    {
      name: '10:15', Temperatura: 28,  Ideal: 14, Baixo: 6, Muito_Baixo: 0, Alto: 26, Muito_Alto: 35
    },
    {
      name: '10:30', Temperatura: 36,  Ideal: 14, Baixo: 6, Muito_Baixo: 0, Alto: 26, Muito_Alto: 35
    },
    {
      name: '10:45', Temperatura: 15,  Ideal: 14, Baixo: 6, Muito_Baixo: 0, Alto: 26, Muito_Alto: 35
    }
  ];

  return ( 
    <div className="App App-backGroud">
      <img src={Hermes}  className="App-Hermes"/>
      <h2 className="App-Font">Mare</h2>
       <LineChart 
       width={800} 
       height={400} 
       data={data} 
       margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="Mare" stroke="#8884d8" />
        <Line type="monotone" dataKey="Baixa" stroke="#008000" />
        <Line type="monotone" dataKey="Media" stroke="#cccc00" />
        <Line type="monotone" dataKey="Alta" stroke="#ff0000" />
      </LineChart>
      <h2>Temperatura</h2>
       <LineChart width={800} height={400} data={data2} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey="name" />
       <YAxis />
       <Line type="monotone" dataKey="Temperatura" stroke="#8884d8" />
        <Line type="monotone" dataKey="Ideal" stroke="#008000" />
        <Line type="monotone" dataKey="Baixo" stroke="#cccc00" />
        <Line type="monotone" dataKey="Alto" stroke="#cccc00" />
        <Line type="monotone" dataKey="Muito_Alto" stroke="#ff0000" />
        <Line type="monotone" dataKey="Muito_Baixo" stroke="#ff0000" />
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
