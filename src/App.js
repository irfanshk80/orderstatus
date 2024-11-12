import React, {useEffect, useState} from "react";
import socketIOClient from "socket.io-client"
import { fetchPrinterOrders, fetchKitchenOrders } from "./api";
import Cards from "./components/Cards";
import Printers from "./components/Printers";

const ENDPOINT = 'http://134.136.244.245:8080';
// const ENDPOINT = 'http://192.168.1.15:8080';

class App extends React.Component {

  state = {
    data: {},
    categs: {}
  }

  //Can also define in willmount
  // constructor(...args) {
  //   super(...args);
  //   console.log('will set the sockets')
  //   this.socket = socketIOClient(ENDPOINT);
  //   this.socket.on('orderPlaced', data=>{
  //     console.log('socket triggered');
  //     console.log(data)
  //     // this.setState({data: {}})
  //     this.setState(data)
  //     console.log(this.state);
  //   })
  // }

  componentDidMount = async () => {
    console.log('component mounted');
    // const data = await fetchKitchenOrders();
    // console.log('kitchen orders fetched');
    // console.log(data);
    // // this.setState({data: {}})
    // this.setState({data: data.data})
    // console.log(this.state)
    this.socket = socketIOClient(ENDPOINT);
    this.socket.on('orderPlaced', this.handleSock);
    this.socket.on('done', this.sockDone);
  }

  componentWillUnmount = () => {
    console.log('component will UNmount')
    this.socket.removeListener('orderPlaced', this.handleSock);
  }

  sockDone = () => {
    console.log('Sock Done')
  }

  handleSock = async (data) => {
    console.log('socket triggered');
    const printerData = await fetchPrinterOrders(this.state.categs);
    console.log(printerData)
    const categs = this.state.categs;
    this.setState({...categs, ...data, data: printerData.data})
    // console.log(this.state.categs)
    // console.log(this.handlePrinter);
    // this.handlePrinter();
    // this.setState({data})
  }

  handlePrinter = async (e, categs) => {
    console.log(e.target.previousSibling);
    if (e.target.previousSibling)
      e.target.previousSibling.checked = true;
    const data = await fetchPrinterOrders(categs);
    console.log({categs});
    // this.setState({data: {}})
    this.setState({...categs, ...data, data: data.data, categs});
  }

  render(){
    const {data} = this.state;
    const {categs} = this.state;
    console.log('rendered ', data);
    return(
      <>
        <div className="grid place-items-center">
          <div className="w-64 grid place-items-center bg-red-900">
            <h2 className="text-white">Printers</h2>
            <Printers handlePrinter={this.handlePrinter}/>
          </div>
        </div>
        <h1>Orders</h1>
        <Cards data={data} categs={categs}/>
      </>
      
    )
  }

}

export default App;
