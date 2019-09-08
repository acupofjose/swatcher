import React from "react";
import ReactDOM from "react-dom";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import { GlobalContext } from "./context/global";
import DefaultPage from "./pages/defaultPage";
import Footer from "./components/footer";
import Loader from "./components/loader";

import "./styles/global.scss";
import "rc-tooltip/assets/bootstrap.css";

import RecentsPage from "./pages/recentsPage";

require("./firebase");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      setIsLoading: this.setIsLoading
    };
  }

  setIsLoading = isLoading => this.setState({ ...this.state, isLoading });

  conditionalLoader = () => (this.state.isLoading ? <Loader /> : null);

  render() {
    return (
      <GlobalContext.Provider value={this.state}>
        <Helmet>
          <title>Swatcher</title>
        </Helmet>
        <div className="floating-links">
          <a
            className="bmc-button"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.buymeacoffee.com/acupajoe">
            <img
              src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg"
              alt="Buy me a coffee"
            />
            <span style={{ marginLeft: "5px" }}>Buy me a coffee</span>
          </a>
        </div>
        <div className="App">
          <div className="wrapper">
            <Router>
              <header>
                <nav role="navigation">
                  <NavLink exact to="/" role="button" activeClassName="active">
                    Home
                  </NavLink>
                  <NavLink
                    exact
                    to="/recents"
                    role="button"
                    activeClassName="active">
                    Recents
                  </NavLink>
                </nav>
                <h1>Swatcher.</h1>
                <p>Making procreate swatches should be easy. Now it is.</p>
              </header>
              {this.conditionalLoader()}
              <Route path="/recents" exact component={RecentsPage} />
              <Route path="/p/:key" component={DefaultPage} />
              <Route path="/" exact component={DefaultPage} />
            </Router>
            <Footer />
          </div>
        </div>
        <div className="background" />
      </GlobalContext.Provider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
