import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Switch as RouterSwitch,
  Route
} from "react-router-dom";
import World from "./components/World";
import Politics from "./components/Politics";
import Business from "./components/Business";
import Technology from "./components/Technology";
import Sports from "./components/Sports";
import Cards from "./components/Cards";
import Detailed from "./components/Detailed";
import DetailedNYT from "./components/DetailedNYT";
import Term from "./components/Term";
import Bookmark from "./components/Bookmark";
import { ToastContainer } from "react-toastify";
import {Zoom} from "react-toastify"


import "bootstrap/dist/css/bootstrap.css";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: "", showswitch: "true", loadings: true, bb: false };
    this.localStorageUpdated = this.localStorageUpdated.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("checked") === null) {
      localStorage.setItem("checked", JSON.stringify([]));
    }
    this.localStorageUpdated();
  }

  localStorageUpdated() {
    var value = JSON.parse(localStorage.getItem("checked"));
    if (value.length === 0) {
      this.updateState(true);
    } else {
      var ssv = JSON.parse(localStorage.getItem("checked"));
      this.updateState(ssv);
    }
  }
  updateState(value) {
    this.setState({ checked: value });
    localStorage.setItem("checked", JSON.stringify(value));
  }

  myCallback = dataFromChild => {
    this.setState({ checked: dataFromChild });
    localStorage.setItem("checked", JSON.stringify(dataFromChild));
  };
  myCallback2 = dataFromChild => {
    this.setState({ showswitch: dataFromChild });
  };
  myCallback3 = dataFromChild => {
    this.setState({ showswitch: dataFromChild });
  };
  myCallback4 = dataFromChild => {
    this.setState({ loadings: dataFromChild });
  };
  myCallback10 = dataFromChild => {
    this.setState({ bb: dataFromChild });
  };

  render() {
    return (
      <Router>
         <ToastContainer className="toast-container" transition={Zoom} />
        <Header
          callbackFromParent={this.myCallback}
          switchshow={this.state.showswitch}
          callbackFromParent4={this.myCallback4}
          che={this.state.checked}
          b={this.state.bb}
        />
        <RouterSwitch>
          <Route exact path="/">
            <Cards
              checked={this.state.checked}
              callbackFromParent3={this.myCallback3}
              
              loas={this.state.loadings}
            />
          </Route>
          <Route exact path="/world">
            <World
              checked={this.state.checked}
              callbackFromParent3={this.myCallback3}
              
              loas={this.state.loadings}
            />
          </Route>
          <Route exact path="/politics">
            <Politics
              checked={this.state.checked}
              callbackFromParent3={this.myCallback3}
              
              loas={this.state.loadings}
            />
          </Route>
          <Route exact path="/business">
            <Business
              checked={this.state.checked}
              callbackFromParent3={this.myCallback3}
              
              loas={this.state.loadings}
            />
          </Route>
          <Route exact path="/technology">
            <Technology
              checked={this.state.checked}
              callbackFromParent3={this.myCallback3}
              
              loas={this.state.loadings}
            />
          </Route>
          <Route exact path="/sports">
            <Sports
              checked={this.state.checked}
              callbackFromParent3={this.myCallback3}
              
              loas={this.state.loadings}
            />
          </Route>
          <Route exact path="/article">
            <Detailed
              callbackFromParent2={this.myCallback2}
              
              loas={this.state.loadings}
              callbackFromParent10={this.myCallback10}
            />
          </Route>
          <Route exact path="/articles">
            <DetailedNYT
              callbackFromParent2={this.myCallback2}
              
              loas={this.state.loadings}
              callbackFromParent10={this.myCallback10}
            />
          </Route>
          <Route exact path="/search">
            <Term
              callbackFromParent3={this.myCallback3}
              
              loas={this.state.loadings}
              callbackFromParent10={this.myCallback10}
            />
          </Route>
          <Route exact path="/favorites">
            <Bookmark
              callbackFromParent3={this.myCallback3}
              
              loas={this.state.loadings}
            />
          </Route>
        </RouterSwitch>
      </Router>
    );
  }
}

export default App;
