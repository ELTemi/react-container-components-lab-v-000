import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'f98593a095b44546bf4073744b540da0';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

// Code SearchableMovieReviewsContainer Here
class SearchableMovieReviewsContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      reviews: [],
      searchTerm: ""
    };
  }

  handleInputChange = event => this.setState({ searchTerm: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    fetch('https://api.nytimes.com/svc/movies/v2/reviews/search.json?' + `api-key=${NYT_API_KEY}&query=${this.state.searchTerm}`)
      .then(response => response.json())
      .then(response => this.setState({ reviews: response.results}))
  }

  render() {
    return (
      <div className="searchable-movie-reviews">
        <form onSubmit={this.handleSubmit}>
          <input id="search-input" type="text" onChange={this.handleInputChange}/>
          <input type="submit"/>
        </form>
        <MovieReviews reviews={this.state.reviews}/>
      </div>
    )
  }
}

export default SearchableMovieReviewsContainer;
