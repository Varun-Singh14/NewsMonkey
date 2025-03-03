import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  
  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=5e0aad4aee254cc6a13a98097acca03c&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
    });
  }
  
  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=5e0aad4aee254cc6a13a98097acca03c&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1
    })
  }

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)) {
      // TODO
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=5e0aad4aee254cc6a13a98097acca03c&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1
      })
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h1>NewsMonkey - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((item) => {
            return (
              <div key={item.url} className="col-md-4">
                <NewsItem
                  title={item.title ? item.title : ""}
                  description={item.description ? item.description : ""}
                  imgUrl={item.urlToImage ? item.urlToImage : "https://imgs.search.brave.com/INcL1UlEApJSSGbLNaE3EaK6CePCvs9hWWMg1kzyIdA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9vbmxpbmUtbmV3/cy1jb25jZXB0XzE3/MjQyOS04NDAuanBn/P3NlbXQ9YWlzX2h5/YnJpZA"}
                  newsUrl={item.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
        </div>
      </div>
    );
  }
}
