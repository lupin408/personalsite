//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import {Animated} from "react-animated-css";
import Postbox from './Postbox.js';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [  {
        posttitle: 'Post #2',
        postcontent: 'I made some cosmetic changes to the site, mostly worked on the background. Made a node and branch design that follows the cursor, tuned the colors alot too. I was very close to going with a color-changer that I implemented that made the branhces look like they were glowing, rather than a static color. After playing with it I decided to keep them a solid color becuase the color-fluctuation made it look flickery. Changed the background to white.',
        posttime: 1615566327805,
        postuser: 'Eric'
      }, {
        posttitle: 'I am starting my own site',
        postcontent: "It's about time I created a site. I finally gave in and made one. I am creating this from scratch obviously, using AWS, MySQL, and React. I would never be caught dead using Squarespace or another cookie-cutter website service. It's gonna take me a little time making it look pretty and putting pictures on it. Hopefully I'll look back on this in a decade and remember all the things I have done",
        posttime: 1615525759206,
        postuser: 'Eric'
    }
],
postUser: '',
postContent: '',
postTitle: '',
hamburgerflag2: false
    };
  this.getRelativeTime = this.getRelativeTime.bind(this);
  this.postusercontent = this.postusercontent.bind(this);
  this.handleChange1 = this.handleChange1.bind(this);
  this.handleChange2 = this.handleChange2.bind(this);
  this.handleChange3 = this.handleChange3.bind(this);
  this.showhambmenu = this.showhambmenu.bind(this);
  }
  componentDidMount(b) {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//var raw = JSON.stringify({"pagenum":"0"});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  
  redirect: 'follow'
};

fetch("http://localhost:3001/entries?pagenum=0", requestOptions)
  .then(response => response.text())
  .then(result => this.setState({posts: JSON.parse(result)}))
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
  handleChange1(a) {
this.setState({postUser: a.target.value})
  }
  handleChange2(a) {
    this.setState({postContent: a.target.value})
  }
  handleChange3(a) {
    this.setState({postTitle: a.target.value})
      }
    showhambmenu(a) {
     console.log('hi')
    this.setState({hamburgerflag2: !this.state.hamburgerflag2})
      
    }
  postusercontent(a) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"postcontent": this.state.postContent, "postuser": this.state.postUser, "posttitle": this.state.postTitle, "posttime": +new Date()});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3001/newpost", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
   
  }
  render() {
  return (
    <div className="App">
      {this.state.hamburgerflag2 ? 
      <div id='hammenu' >
        <button className='hmbtn' id='cibtn'>Contact Info</button>
        <button className='hmbtn' id='ccbtn'>Color Change</button>
        <button className='hmbtn' id='gwbtn'>Graffiti Wall</button>
        <button className='hmbtn' id='udebtn'>Upload Data to Ethereum</button>
        <button className='hmbtn' id='epbtn'>EasyPGP</button>
        <button className='hmbtn' id='csbtn'>Coming Soon</button>
        <span id='signature1'>Eric Sanchirico</span>
      </div> : null
      }
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
        dedicated towards evangalizing cryptography and privacy, improving access to encryption and cryptography, so naturally I was one of the earlier people involved in the cryptocurrency scene, way back in 2011.
        After participating in the space while it went though a decade of explosive growth, I decided to shift my professional focus towards contributing to this burgeoning industry.
        I currently write dApps on the Ethereum blockchain, with my current timesink being a PGP encrypted communications app utilizing client-side web3 providers as credentials.</p>
        <div id='posttitle'>Posts</div>
        <div id='maincontentpane'>
        <Postbox msgs={this.state.posts} reltimefunc={this.getRelativeTime}/>
        <div id='userpost'>
          <span id='textboxtitle'>Have something interesting and related to Computer Science that you want to post? Anyone can contribute content to my site (not that anyone visits here)!</span>
          <div id='formcontainer'>
          <form  id="usrform" onSubmit={this.postusercontent}>
           <input type="text" name="usrposttitle" defaultValue='Title' id='usrposttitle' onChange={this.handleChange3} ></input> <input type="text" defaultValue='Name' id='usrname' name="usrname" onChange={this.handleChange1}></input>
          <textarea id='usrpost1' name="usrpost" form="usrform" rows="26" cols="100" onChange={this.handleChange2}>...</textarea>
  
  <input type="submit" id='usrsubmit1' value='Post' ></input>
  <div id='newpostlabel'> New Post</div>
</form>


</div>
        </div>
        </div>
    </div>
  );
}}

export default App;
