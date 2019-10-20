import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const DataSets = ({status, temperature, altitude}) => {
    return (
        
        <section className="vaga text cinza">
            {/* <h2>Maluco</h2> */}
            <h2>{status}</h2>
            <h2>{temperature}</h2>
            <h2>{altitude}</h2>
        </section>
    )
}

class DataSet extends React.Component{
    constructor() {
        super();
        this.state = {
            'data': []
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch('http://7b6a84dd.ngrok.io/devices')
            .then(res => res.json())
            .then(res => this.setState({'data': res}))
    }

    

    render() {
        return (
            <div>
            {this.state.data.map(function(item) {

                return (
                    <div>
                        <h2>{item.status}</h2>
                        <h2>{item.temperature}</h2>
                        <h2>{item.altitude}</h2>
                    </div>
                    // <DataSets status={item.status} temperature={item.temperature} altitude={item.altitude}/>
                ) 
                // return (
                //     <LineChart width={600} height={300} data={item} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                //         <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                //         <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                //         <XAxis dataKey="status" />
                //         <YAxis />
                //         <Tooltip />
                //     </LineChart>
                // )
            }
            )}
            </div>
        )
    } 
    // constructor(props) {
    //     super(props);
    //     this.dataBoias = {
    //         data: []
    //     }
    // }
    // consult() {
    //     var url = 'http://7b6a84dd.ngrok.io/devices';
    //     fetch(url)
    //         .then(res=>{
    //             this.setDataBoias({data: res})
    //         })
        
    // }

    // render() {
    //     return (
    //         <div>
    //             <h2>Booora</h2>
    //             {
    //                 this.dataBoias.data.map((item, index) => {   
    //                     return(
    //                         <h2>{item.status}</h2>
    //                         // <DataSets status={item.status} temperature={item.temperature} altitude={item.altitude} />
    //                     )
    //                 })
    //             }
    //         </div>
    //     )
    // }
}

export default DataSet;
