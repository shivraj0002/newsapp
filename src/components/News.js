import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component
{
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  categoryCapatalizer = (str) =>
  {
    return str[0].toUpperCase() + str.substring(1);
  };
  constructor(props)
  {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsHunt - ${this.props.category === "general"
        ? "Home"
        : this.categoryCapatalizer(this.props.category)
      }`;
  }
  async componentDidMount()
  {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1826ac46adbb4d9dbdefb74ea1049d7d&page=1&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      loading: false,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }
  handelLoadingFunction = async () =>
  {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    )
    {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
        }&category=${this.props.category
        }&apiKey=1826ac46adbb4d9dbdefb74ea1049d7d&page=${this.state.page + 1
        }&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true,
      });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        loading: false,
        articles: parsedData.articles,
      });
    }
  };
  handleNextClick = async () =>
  {
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / this.props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=1826ac46adbb4d9dbdefb74ea1049d7d&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({
    //     loading: true,
    //   });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();

    // this.setState({
    //   loading: false,
    //   page: this.state.page + 1,
    //   articles: parsedData.articles,
    // });
    this.setState({
      page: this.state.page + 1,
    });
    this.handelLoadingFunction();
    
  };

  handlePrevClick = async () =>
  {
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=1826ac46adbb4d9dbdefb74ea1049d7d&page=${
    //   this.state.page + -1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading: true,
    // });
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // this.setState({
    //   loading: false,
    //   page: this.state.page + -1,
    //   articles: parsedData.articles,
    // });
    this.setState({
      page: this.state.page + -1,
    });
    this.handelLoadingFunction();
  };
  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
        }&category=${this.props.category
        }&apiKey=1826ac46adbb4d9dbdefb74ea1049d7d&page=${this.state.page + 1
        }&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true,
      });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        loading: false,
        articles: this.state.articles.concat(parsedData.articles),
      });
  };

  render()
  {
    return (
      <>
        <h1 className="text-center">{`Top ${this.categoryCapatalizer(
          this.props.category
        )} headlines - NewsHunt`}</h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />} >  
          <div className="container">
          <div className="row">
            {this.state.articles.map((element) =>
            {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 80) : ""}
                    discription={
                      element.description
                        ? element.description.slice(0, 200)
                        : ""
                    }
                    imageUrl={
                      !element.urlToImage
                        ? "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        : element.urlToImage
                    }
                    newsUrl={element.url}
                    auther={element.source.name}
                    badge={element.source.name}
                    newsDate={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark mx-3 my-2"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark mx-3 my-2"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
