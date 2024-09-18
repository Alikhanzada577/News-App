import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],  // Initialize articles as an empty array
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async updateNews() {
    const { page } = this.state;
    const { pageSize } = this.props;
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1967be5017434cf1b4539a01fd2303a4&page=${page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, this.updateNews);
  };

  handleNextClick = async () => {
    const { page } = this.state;
    const { pageSize } = this.props;
    const maxPages = Math.ceil(this.state.totalResults / pageSize);
    if (page + 1 <= maxPages) {
      this.setState({ page: page + 1 }, this.updateNews);
    }
  };

  render() {
    const { page, articles, loading, totalResults } = this.state;
    const { pageSize } = this.props;
    const maxPages = Math.ceil(totalResults / pageSize);

    return (
      <div className="container my-3">
        <h2>News Headlines</h2>
      {this.state.loading && <Spinner/>}
        <div className="row">
          {!loading && articles.map((element) => {
            return (
              <div className="col-md-3" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 41) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={page >= maxPages}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
