import React, { Component } from "react";
import { PostList } from './PostList';
import { Pagination } from './Pagination';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super( ...arguments );
      this.props = props;
      this.state = {
			  posts: [],
        loading: false,
        currentPage: 1, 
        totalPages: 0,
        selectedPostCount: parseInt(window.reactObj.selectedPostCount) 
      };
        
      this.onChangePage = this.onChangePage.bind(this);
   // this.removeAnimation = this.removeAnimation.bind(this);
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.getPosts(this.state.selectedPostCount, this.state.currentPage);
  }

  onChangePage(value) {

    this.setState({ 
      loading: true,  
      currentPage: parseInt(value)
    });

   this.getPosts(this.state.selectedPostCount, value);
  
  }

  getPosts(per_page, current_page) {
    const wpHeaders = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'x-wp-total'
      }
    };

    // Call to word press API to get posts 
    axios(`/wp-json/wp/v2/posts?per_page=${per_page}&page=${current_page}`, wpHeaders)
    .then((posts) => {
      this.setState({ 
        loading: false,
        selectedPostCount: parseInt(per_page),
        currentPage: parseInt(current_page),
        totalPages: parseInt(posts.headers['x-wp-totalpages']),
        posts: posts.data,
        });
    } ).catch((error) => {
      console.log(error);
    });
  }
  
  render() {
    return (
      <section>
        <PostList posts={this.state.posts} />
        <Pagination onChangePage={this.onChangePage} currentPage={this.state.currentPage} totalPages={this.state.totalPages}/> 
      </section>
    );
  }
}

export default App;
