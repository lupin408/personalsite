//import logo from './logo.svg';
//import './App.css';
import React from 'react';

class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentvisflag: false,
      comments: [],
      postUser: '',
postContent: '',
postTitle: '',
realpostTitle: ''
    };
  
  this.postusercontent = this.postusercontent.bind(this);
  this.showthecommentbox = this.showthecommentbox.bind(this);
  this.handleChange1 = this.handleChange1.bind(this);
  this.handleChange2 = this.handleChange2.bind(this);
  this.handleChange3 = this.handleChange3.bind(this);
  }
  componentDidMount() {
      let comms = [];
      //console.log(this.props.comments)
      let fin = JSON.parse(this.props.comments)
      console.log(fin, this.props.posttitle)
  if (fin.length > 0) {
      for (let i = 0; i < fin.length; i++) {
        
            if (fin[i].forpost === this.props.posttitle) {
               console.log('hi')
                comms.push(fin[i])
            }
      }
  }
  this.setState({comments: comms})
  }
  handleChange1(a) {
    this.setState({postUser: a.target.value})
      }
      handleChange2(a) {
        this.setState({postContent: a.target.value})
      }
      handleChange3(a) {
        this.setState({postTitle: a.target.value})
        console.log(a.target.value)
          }
  postusercontent(a) {
      a.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"commcontent": this.state.postContent, "commuser": this.state.postUser, "commtitle": this.state.postTitle, "commtime": +new Date(), "forpost": this.props.posttitle});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3001/newcomment", requestOptions)
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
          
          {this.state.comments.length > 0 ? this.state.comments.map(b => 
          <div className='commspot'> <div className='commtitle'>Comments</div>
            <div className='commuser'>{b.usrname}:</div>
            <div className='commbody'>{b.commentcontent}</div>
            </div>
            ): null}
            
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