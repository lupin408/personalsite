import React from 'react';
import CommentSection from './CommentSection.js'
var Postbox = (props) => (
<div id='fullbox'>
    {props.msgs.map((a) => 
    <div className="indmsg"> 
        <h3>{a.posttitle}</h3>
        {(a.postuser !== 'Eric' ? <span className='alternateauthor'> {a.postuser}</span> : null)}
        <span> {props.reltimefunc(a.posttime)}</span>
        <div class='encmsgs'>{a.postcontent}</div>
        
        <CommentSection />
        
    </div>
    
    )}
</div>
);
export default Postbox;