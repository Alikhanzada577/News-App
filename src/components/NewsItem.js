import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
      <div className='my-3 '>
        <div className="card" style={{width: "18rem"}}>
      <img src={imageUrl?imageUrl:"https://img.freepik.com/free-vector/question-mark-sign-brush-stroke-trash-style-typography-vector_53876-140880.jpg"} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a rel="noreferer" href={newsUrl} className="btn btn-dark">Read More</a>
      </div>
    </div>
    </div>
    )
  }
}

export default NewsItem