import React, { Component } from 'react'
export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, author, date,source } = this.props;
    return (
      <div>
        <div className="card my-3">
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
        <span className=" badge rounded-pill bg-danger">
             {source}
            </span>
          </div>
          <img src={imgUrl} className="card-img-top" style={{ width: '100%', height: "250px" }} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()} </small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
