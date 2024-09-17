import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
 articles = [
    {
        "source": {
            "id": "bbc-news",
            "name": "BBC News"
        },
        "author": null,
        "title": "Cricket: Today at the Test",
        "description": "Day three highlights from the second Test between England and Sri Lanka.",
        "url": "https://www.bbc.co.uk/iplayer/episode/m0022n87/cricket-today-at-the-test-england-v-sri-lanka-2024-second-test-day-three-highlights",
        "urlToImage": "https://ichef.bbci.co.uk/images/ic/1200x675/p0jhyw8y.jpg",
        "publishedAt": "2024-08-31T19:25:15Z",
        "content": "Day three highlights from the second Test between England and Sri Lanka."
    },
    {
        "source": {
            "id": null,
            "name": "BBC News"
        },
        "author": null,
        "title": "The Italian town that banned cricket",
        "description": "Nearly a third of Monfalcone's residents are foreign, and the mayor says the \"cultural essence\" of the town is in danger.",
        "url": "https://www.bbc.com/news/articles/cr5njmgmvq7o",
        "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/f9cd/live/eecbeb90-6aae-11ef-b43e-6916dcba5cbf.jpg",
        "publishedAt": "2024-09-06T00:13:51Z",
        "content": "Miah Bappy and other Bengalis have to play cricket outside the town of Monfalcone\r\nUnder the scorching sun on Italys Adriatic coast, a group of friends from Bangladesh are practising their cricket sk… [+6122 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "BBC News"
        },
        "author": null,
        "title": "Brave beat Phoenix in 'thrilling' Super Five after tie",
        "description": "Watch the final stages of Southern Brave's victory over Birmingham Phoenix after a remarkable Eliminator was decided by the first Super Five in the tournament's history.",
        "url": "https://www.bbc.com/sport/cricket/videos/c1d7eeqxxv4o",
        "urlToImage": "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/1e6d/live/259f7630-5cdd-11ef-b970-9f202720b57a.jpg",
        "publishedAt": "2024-08-17T20:38:04Z",
        "content": "Watch the final stages of Southern Brave's victory over Birmingham Phoenix after a remarkable Eliminator was decided by the first Super Five in the tournament's history.\r\nWATCH MORE: Cricket Video\r\nA… [+25 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "BBC News"
        },
        "author": "Stephan Shemilt at Emirates Old Trafford",
        "title": "Smith will be 'world-class for long period' - Bell",
        "description": "Jamie Smith will be a “world-class player over a long period of time”, according to former England international and Sri Lanka batting coach Ian Bell.",
        "url": "https://www.bbc.com/sport/cricket/articles/c5ylezy71p1o",
        "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_sport/cff0/live/d292dec0-6185-11ef-b970-9f202720b57a.jpg",
        "publishedAt": "2024-08-23T19:30:38Z",
        "content": "Jamie Smith will be a world-class player over a long period of time, according to former England international and Sri Lanka batting coach Ian Bell.\r\nSmith, 24, made his maiden Test century on the th… [+1313 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "BBC News"
        },
        "author": "Stephan Shemilt",
        "title": "Captain Pope looking to 'reward' England with runs",
        "description": "Stand-in captain Ollie Pope wants to \"reward\" his England side by scoring runs in the second Test against Sri Lanka at Lord's.",
        "url": "https://www.bbc.com/sport/cricket/articles/cpqjy4erx0ro",
        "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_sport/aaaf/live/fd58cc40-6532-11ef-8881-3361d84cbca1.jpg",
        "publishedAt": "2024-08-28T13:33:22Z",
        "content": "And Pope, who averages 34.64 from his 47 Tests, has sought the advice of Joe Root on combining the twin roles of captaincy and batting.\r\nRoot, 33, led England in a record 64 Tests before he was repla… [+1055 chars]"
    }]
  constructor(){
    super();
    console.log("hello i'm a constructor from news component");
    this.state ={
      articles:this.articles,
      loading:false,
      page:1,
    }
  }
  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1967be5017434cf1b4539a01fd2303a4&page=1&pageSize=20";
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(data);
    this.setState({articles:parseData.articles ,totalArticles:parseData.totalResults})
  }
  handlePrevClick=async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1967be5017434cf1b4539a01fd2303a4&page=${this.state.page-1 }&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(data);
    this.setState({
      page:this.state.page -1,
      articles:parseData.articles
    })
  }
  handleNextClick=async  ()=>{
    if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)){
      alert("No More Headlines for today")
  }else{
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1967be5017434cf1b4539a01fd2303a4&page=${this.state.page+1}&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(data);
    this.setState({
      page:this.state.page + 1,
      articles:parseData.articles
    })
  }
  }
  render() {
    return (
      <div className='container my-3'>
        <h2>News Monkey HeadLines</h2>
        
        <div className='row'>
        {this.state.articles.map((element)=>{
          return (
            <div className='col-md-3' key={element.url}>
            <NewsItem  title={element.title?element.title.slice(0,41):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
          );
        })}
            
        </div>
        <div  className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News