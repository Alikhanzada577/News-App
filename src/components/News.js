import React, { useEffect ,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=>{
    const[articles,setArticles]=useState([] )
    const[loading,setLoading]=useState(false)
    const[page,setPage]=useState(1)
    const[totalResults,setTotalResults]=useState(0)
    // 
  const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

 

  const  updateNews=async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    console.log(JSON.stringify(parsedData, null, 2));
    setArticles(parsedData.articles);
    setTotalResults( parsedData.totalResults)
    setLoading(false)
     
    props.setProgress(100);
  }
  useEffect(()=>{
    document.title= `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
  },[])
 

  // const handlePrevClick = async () => {

  //   setState({
  //     page: state.page - 1
  //   })
        // setPage(page-1)
  //   updateNews();
  // }
  // const handleNextClick = async () => {

    // setPage(page+1)
  //   setState({
  //     page: state.page + 1

  //   })
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    
      
      
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1)
      setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(JSON.stringify(parsedData, null, 2));
   
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      setLoading(false)
    
  
  };

  
    return (
      <>
        <h1 className="text-center" style={{ margin: '80px 0px' }}>NewsMonkey - Top Headlines</h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>
        <div className="row">
          {articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} time={element.publishedAt ? element.publishedAt : "UnKnown"} />
            </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News