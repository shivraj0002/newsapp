import React, { Component } from "react";

export class NewsItem extends Component {
  
  render() {
    let { title, discription, imageUrl, newsUrl, auther, newsDate , badge } =
      this.props;
     
          
    return (
      <div className="my-3">
        <div className="card" style={{ minHeight: "23rem", height:'35rem' }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'85%', zIndex:'1'}}>
            {badge}
          </span>
          <img
            src={imageUrl}
            className="card-img-top"
            alt="..."
            style={{ maxHeight: "240px", minHeight: "170px" , height:'240px' }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{discription}...</p>
            <p className="card-text">
              <small className="text-muted">By {!auther?"Unknown":auther} on {new Date(newsDate).toGMTString()}</small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
