import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
          <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fsupermarioglitchy4.fandom.com%2Fwiki%2FBig_Chungus&psig=AOvVaw1eMFCu0sr3dnyd50N7eqfB&ust=1666989933396000&source=images&cd=vfe&ved=0CAkQjRxqFwoTCJCvp8qjgfsCFQAAAAAdAAAAABAD"></img>
        </div>
        <h4> Please Wait ...</h4>
      </div>
    )
  }
}

export default Spinner