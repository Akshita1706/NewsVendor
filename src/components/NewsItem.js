import React, { Component } from 'react'

export class NewsItem extends Component {
   
  render() {
      let {title,description,imageUrl,newsUrl,author,date,source}= this.props;    //destructuring
    return (
      <div className="my-3 ">
        <div className="card" >
          <div>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger " style={{zIndex:'1', left:'90%'}}>
    {source} </span>
          </div>
      <img src={!imageUrl?"https://images.thequint.com/thequint%2F2022-03%2F16ffa27d-b910-4bd6-9ac6-696178649d9b%2Fgarena.jpg?rect=0%2C0%2C1440%2C756&w=1200&auto=format%2Ccompress&ogImage=true":imageUrl} className="card-img-top" alt="..."/>
     
      
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p> 
        <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
       
        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>  
        {/* target undeerscore blank opens it in new tab  also text muted means no colour..to change do text-danger or text-success*/}
      </div>
    </div></div>
    )
  }
}

export default NewsItem