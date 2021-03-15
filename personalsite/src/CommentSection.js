//import logo from './logo.svg';
//import './App.css';
import React from 'react';

class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentvisflag: false
    };
  
  this.postusercontent = this.postusercontent.bind(this);
  this.showthecommentbox = this.showthecommentbox.bind(this);
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
    
    fetch("http://ericsanchiri.co/newcomment", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
   
  }
  showthecommentbox(a) {
   
      this.setState({commentvisflag: !this.state.commentvisflag})
  }
  render() {
  return (
      <div className='commentmakingsection'>
          <button className='makeacomment' onClick={this.showthecommentbox}>Comment</button>
    {this.state.commentvisflag ? <div className='userpost'>

          <span className='textboxtitle'></span>
          <div className='formcontainer'>
          <form  className="usrform" onSubmit={this.postusercontent}>
           <input type="text" name="usrposttitle" defaultValue='Title' className='usrposttitle' onChange={this.handleChange3} ></input><div className='newpostlabel'>Comment</div> <input type="text" defaultValue='Name' className='usrname' name="usrname" onChange={this.handleChange1}></input>
          <textarea className='usrpost1' name="usrpost" form="usrform"  onChange={this.handleChange2}>...</textarea>
  
  <input type="submit" className='usrsubmit1' value='Post' ></input>
  
</form>


</div>
        </div> : null}
        </div>
  );
}}

export default CommentSection;