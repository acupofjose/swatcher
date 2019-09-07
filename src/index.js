import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { GlobalContext } from "./context/global";
import DefaultPage from "./pages/DefaultPage";

import "rc-tooltip/assets/bootstrap.css";
import "./styles.scss";
import Loader from "./components/loader";
import Footer from "./components/footer";

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
        <div className="App">
          <div className="wrapper">
            <Router>
              {this.conditionalLoader()}
              <Route path="/" exact component={DefaultPage} />
              <Route path="/p/:key" component={DefaultPage} />
            </Router>
            <Footer />
          </div>
        </div>
      </GlobalContext.Provider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
