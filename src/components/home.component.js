import React, { Component } from "react";

import UserService from "../services/user.service";
import Hero from "../components/Hero/Hero";
import Contact from '../components/Contact/Contact';
import GetStarted from '../components/GetStarted/GetStarted';
import Footer from '../components/Footer/Footer';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="App">
        <div>
          <Hero />
          </div>
          <Contact />
          <GetStarted/>
          <Footer />
        </div>
    );
  }
}
