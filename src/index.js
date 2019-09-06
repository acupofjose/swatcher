import React from "react";
import ReactDOM from "react-dom";

import { GlobalContext } from "./context/global";
import DefaultPage from "./pages/DefaultPage";

import "./styles.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.blocks = [];
    this.blockRefs = {};
    this.selectedBlock = null;
    this.state = {
      name: "Untitled Swatch",
      selectedBlockId: null,
      selectedColor: null,
      setSelectedBlock: this.setSelectedBlock
    };
  }

  render() {
    return (
      <GlobalContext.Provider value={this.state}>
        <div className="App">
          <div className="wrapper">
            <DefaultPage />
          </div>
        </div>
      </GlobalContext.Provider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
