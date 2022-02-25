import React, {useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


const News=(props)=>{
    let{country,showProgress,category,pageSize,apiKey}=props;
    const[articles,setArticles]=useState([]);
    const[loading,setLoading]=useState(false);
    const[page,setPage]=useState(1);
    const[totalArticle,setTotalArticles]=useState(0);

    const textCapital=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
    const updateNews=async(pageNo)=>{
        showProgress(30);
        setLoading(true)
        const url=`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&from=2022-01-06&sortBy=publishedAt&apiKey=${apiKey}&page=${pageNo}&pageSize=${pageSize}`;
        let data=await fetch(url);
        props.showProgress(50);
        let parsedData=await data.json();
        showProgress(70);
        setLoading(false);
        setArticles(parsedData.articles);
        setTotalArticles(parsedData.totalResults);
        showProgress(100);   
    }
    const fetchMoreData=async()=>{
        const url=`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&from=2022-01-06&sortBy=publishedAt&apiKey=${apiKey}&page=${page+1}&pageSize=${pageSize}`;
        setPage(page+1);    //here we need to set page after we updated page manually to overcome from set page call delay
        let data=await fetch(url);
        let parsedData=await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalArticles(parsedData.totalResults);
    }
    
    useEffect(()=>{
        document.title=`${textCapital(category)} : NewsMania`;
        updateNews(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    // const handleNext=async()=>{
    //     setPage(page+1);
    //     updateNews(page+1);
    // }
    // const handlePrev=async()=>{
    //     setPage(page-1);
    //     updateNews(page-1);
    // }
    return (
      <div>
            <h1 className='heading text-capitalize text-center mb-4' style={{marginTop:"10vh"}}>NewsMania: Top {props.category} Headlines</h1>  
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalArticle}
          loader={<Spinner/>}
        >
        <div className="container d-flex" style={{justifyContent:"center",alignItems:"center"}}>
            <div className="row">
            {articles.map((element)=>{
                return <div className="col-sm-6 col-md-4 my-2 " key={element.url}>
                    <NewsItem author={element.author} date={element.publishedAt} source={element.source.name} url={element.url} title={element.title?element.title.slice(0,50):""} desc={element.description?element.title.slice(0,90):""} imageUrl={element.urlToImage}/>
                </div>
            })}
            </div>
        </div>
            </InfiniteScroll>
            {/* <div className="container d-flex" style={{justifyContent:"space-between"}}>
                <button disabled={page<=1} onClick={handlePrev} className="btn btn-dark my-2">&#8592; Previous</button>
                <button disabled={page+1>Math.ceil(totalArticle/props.pageSize)} onClick={handleNext} className="btn btn-dark my-2">Next &#8594;</button>
            </div> */}
      </div>
    )
}
News.defaultProps={
    country:'in',
    pageSize:8,
    category:'general',
}
News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
}

export default News;

