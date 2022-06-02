import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static propTypes={
    country: PropTypes.string,
    pageSize:PropTypes.number,
   category: PropTypes.string

  }
  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general'


  }
  capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
  }



  constructor(props) {
    super(props);
    
    this.state = {
      articles: [], //this.state used instead of this.props as state can be changed as per us unlike props
      loading: true, //empty array given and inital 4 articles removed
      page: 1,
      totalResults:0
    };
    document.title= `NewsVendor-${this.capitalize(this.props.category)}`
  }
  async updateNews(){
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f6c1d8234c6a48f39bb5fa754b41376f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
     this.setState({loading:true})
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(70)
    this.setState({ articles: parsedData.articles ,totalResults: parsedData.totalResults,loading:false });
    console.log(parsedData); 
    this.props.setProgress(100)

  }

   componentDidMount() {
    // console.log("cdm");runs after the render()part has run
    this.updateNews();
  
  }


  // handleNextClick = async () => {
  //   if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
   
  // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f6c1d8234c6a48f39bb5fa754b41376f&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
  // this.setState({loading:true})
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
   
  //   this.setState({ page: this.state.page + 1, articles: parsedData.articles,loading:false });
  //   console.log(parsedData);
  //  }
//   this.setState({ page: this.state.page + 1})
//   this.updateNews();
// }
   
  


//   handlePrevClick = async () => {
//  this.setState({ page: this.state.page - 1})
//       this.updateNews();
//   }

  fetchMoreData =async () => {
   
  
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f6c1d8234c6a48f39bb5fa754b41376f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  this.setState({page:this.state.page +1});
let data = await fetch(url);
let parsedData = await data.json();

this.setState({ articles: this.state.articles.concat(parsedData.articles),
   totalResults: parsedData.totalResults,
    });
console.log(parsedData); 
  };
 

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'35px 0px', marginTop:'90px'}}>NewsVendor-Top {this.capitalize(this.props.category)} headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="row">
          {/* {!this.state.loading &&this.state.articles.map((element) => { */}

            {/* //map ko key deni padti h jo unique ho n here url is unique....n div me deni h key
            //line 78 means first part agar false h(no loading) to run the second part */}
            {this.state.articles.map((element) => {
            return  <div className="col-md-4" key={element.url}>
                {/* though not needed slice here as it adjusted sizes on its own but still for info */}
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={ element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            
          })}
           </div>
        </InfiniteScroll>
          {/* col md 4 is --my row in medium devices has 12 capacity in a row..so each is of 4 (4 into3) so all space taken */}
       
        {/* <div className="container d-flex justify-content-between">
       <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo;Previous
          </button>
         
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark"
            onClick={this.handleNextClick} > Next&raquo; </button>
        </div> */}
      </div>
    );
  }
}

export default News;
