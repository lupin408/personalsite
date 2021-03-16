//import logo from './logo.svg';
//import './App.css';
import React from 'react';

import Postbox from './Postbox.js';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [ 
],
comments: [],

hamburgerflag2: false
    };
  this.getRelativeTime = this.getRelativeTime.bind(this);
  
  
  this.showhambmenu = this.showhambmenu.bind(this);
  }
  componentDidMount(b) {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//var raw = JSON.stringify({"pagenum":"0"});

var requestOptions = {
  method: 'GET',
 // headers: myHeaders,
  
  redirect: 'follow'
};

fetch("http://localhost:3001/entries?pagenum=0", requestOptions)
  .then(response => response.text())
  .then(result => {console.log(result); this.setState({posts: JSON.parse(result).posts, comments: JSON.parse(result).comments})})
  .catch(error => console.log('error', error));

 
  }
  getRelativeTime = (d1, d2 = new Date()) => {
    var elapsed = d1 - d2
    var units = {
      year  : 24 * 60 * 60 * 1000 * 365,
      month : 24 * 60 * 60 * 1000 * 365/12,
      day   : 24 * 60 * 60 * 1000,
      hour  : 60 * 60 * 1000,
      minute: 60 * 1000,
      second: 1000
    }
    var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    // "Math.abs" accounts for both "past" & "future" scenarios
    for (var u in units) 
      if (Math.abs(elapsed) > units[u] || u === 'second') 
        return rtf.format(Math.round(elapsed/units[u]), u)
  }

    showhambmenu(a) {
     console.log('hi')
    this.setState({hamburgerflag2: !this.state.hamburgerflag2})
      
    }
 
  render() {
  return (
    <div className="App">
      
      <div  id={this.state.hamburgerflag2 ? 'hammenu' : 'hammenu2'}>
        <button className='hmbtn' id='cibtn'>Contact Info</button>
        <button className='hmbtn' id='ccbtn'>Color Change</button>
        <button className='hmbtn' id='gwbtn'>Graffiti Wall</button>
        <button className='hmbtn' id='udebtn'>Upload Data to Ethereum</button>
        <button className='hmbtn' id='epbtn'>EasyPGP</button>
        <button className='hmbtn' id='csbtn'>Coming Soon</button>
        <span id='signature1'>Eric Sanchirico</span>
      </div>
      <div id='btncont'>
         <img id='hamburgermenu' alt='menuicon' src='../hamburgericon.png' onClick={this.showhambmenu}></img>
         <img id='homemenu' alt='homeicon' src="../homeicon.png"></img>
         </div>
      <header className="App-header">
    
        <p id='para1'>
          Just a place for me to catalog my endeavors and thoughts relating to Computer Science and Blockchain
        </p>
       
      </header>
      <p id='intro1'>I am a software engineer that's worked as a full stack developmer, but my real joy is blockchain/Solidity/dApp engineering. 
        Alot of my work has been with optimizing low-end AWS EC2 servers (for example, creating effective custom load-balancers that allow t2.micro EC2 instances to handle upwards of
        dozens of thousands of RPS throughput).
        I have had an interest in cryptography since before I was an engineer (you can visit my cryptographic hobby-project here) and alot of my work has been 
        dedicated towards evangalizing cryptography &amp; privacy and improving access to encryption and cryptography.
        After participating in the blockchain space while it went though a decade of explosive growth, I decided to shift my professional focus towards contributing to this burgeoning industry.
        I currently write dApps on the Ethereum blockchain, with my current timesink being a PGP encrypted communications app utilizing client-side web3 providers as credentials.</p>
        <div id='posttitle'>Posts</div>
        <div id='maincontentpane'>
        <Postbox msgs={this.state.posts} comments={JSON.stringify(this.state.comments)} reltimefunc={this.getRelativeTime}/>
     
        </div>
    </div>
  );
}}

export default App;
