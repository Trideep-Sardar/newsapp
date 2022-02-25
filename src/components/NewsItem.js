import React from 'react'

const NewsItem=(props)=>{
      let {title,source,desc,date,author,url,imageUrl}=props;
    return (
      <>
          <div className="card">
          <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:"0"}}>
          <span className="badge bg-danger">
    {source}
  </span>
          </div>
  <img src={imageUrl?imageUrl:"https://cdn.zeebiz.com/sites/default/files/2022/02/04/174730-untitled-design-2022-02-04t120243799.jpg"} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{desc}</p>
    <p className="text-muted">{author?author:"unknown"} on {new Date(date).toGMTString()}</p>
    <a rel="noreferrer" href={url} target="_blank" className="btn btn-dark">Details</a>
  </div>
</div>
      </>
    )
  }

export default NewsItem;
