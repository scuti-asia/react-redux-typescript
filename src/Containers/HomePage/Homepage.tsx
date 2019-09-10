import React, { Component } from "react";
import Header from "../../Components/Header";

class Homepage extends Component {
  render() {
    return (
      <div>
        <Header
          pageTitle="Home"
        />
        <p>Homepage</p>
      </div>
    );
  }
}

export default Homepage;
