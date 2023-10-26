// import React, { Component } from 'react'
// import NewsItem from './NewsItem'
// import Loading from './Loading';
// import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";


// export class News extends Component {
//   static defaultProps = {
//     country: 'in',
//     pageSize: 6,
//     category: 'general'
//   };

//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string
//   }
//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }

//   constructor(props) {
//     super(props);
//     console.log("Hello");
//     this.state = {
//       articles: [],
//       loading: true,
//       page: 1,
//       totalResults: 0
//     }
//     document.title = `${this.capitalizeFirstLetter(this.props.category)}-News Today`;
//   }
//   async updateNews() {
//     this.props.setProgress(10);
//     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     this.setState({ loading: true });
//     let data = await fetch(url);
//     this.props.setProgress(30);
//     let parsedData = await data.json();
//     this.props.setProgress(60);
//     console.log(parsedData);
//     this.setState({
//       articles: parsedData.articles,
//       totalResults: parsedData.totalResults,
//       loading: false
//     })
//     this.props.setProgress(100);
//   }

//   async componentDidMount() {
//     this.updateNews();
//   }

//   handleNextClick = async () => {
//     this.setState({
//       page: this.state.page + 1
//     })
//     this.updateNews();
//   }

//   handlePrevClick = async () => {
//     this.setState({
//       page: this.state.page - 1
//     })
//     this.updateNews();
//   }

//   fetchMoreData = async () => {
//     this.setState({
//       page: this.state.page + 1
//     })
//     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({
//       articles: this.state.articles.concat(parsedData.articles),
//       totalResults: parsedData.totalResults,
//     })
//   };

//   render() {
//     return (
//       <div className='container my-3'>
//         <h2 className='text-center' style={{marginTop:"100px"}}>Today's News Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
//         {this.state.loading && <Loading/>}
//         <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.articles.length !== this.state.totalResults}
//           loader={<Loading />}
//         >
//           <div className="row my-5">
//             {/* {!this.state.loading && this.state.articles?.map((element)=>{ */}
//             {this.state.articles?.map((element) => {
//               return <div className="col-md-4" key={element.url}>
//                 <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 55) : ""} imgUrl={element.urlToImage}
//                   newsUrl={element.url} source={element.source.name} date={element.publishedAt} author={element.author} />
//               </div>
//             })}
//           </div>
//         </InfiniteScroll>
//         {/* <div className='container d-flex justify-content-between'>
//         <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
//         <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
//         </div> */}
//       </div>
//     )
//   }
// }

// export default News;

//FUNCTION
import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=>  {

  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResults,settotalResults]=useState(0)
  
  
 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
   
  
    const updateNews= async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);
    console.log(parsedData);

    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100);
  }

  useEffect(()=>{
     document.title = `${capitalizeFirstLetter(props.category)}-News Today`;
    updateNews();
  },[])

  

  // const handleNextClick = async () => {
  //   setPage(page+1)
  //   updateNews();
  // }

  // const handlePrevClick = async () => {
  //   setPage(page-1)
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  };

  
    return (
      <div className='container my-3'>
        <h2 className='text-center' style={{marginTop:"100px"}}>Today's News Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        {loading && <Loading/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loading />}
        >
          <div className="row my-5">
            {/* {!this.state.loading && this.state.articles?.map((element)=>{ */}
            {articles?.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 55) : ""} imgUrl={element.urlToImage}
                  newsUrl={element.url} source={element.source.name} date={element.publishedAt} author={element.author} />
              </div>
            })}
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }


News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}


export default News;
