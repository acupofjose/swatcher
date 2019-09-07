import React from "react";

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.line = 0;
    this.lines = [
      "",
      "It would appear that we're loading something...",
      "Well. We are.",
      "It would also appear that it's taking a while.",
      "It is.",
      "Maybe check your internet?",
      "Or my server is down.",
      "Who knows. Maybe Google blew-up.",
      "Firebase was supposed to be bullet-proof.",
      "Are you still here?"
    ];

    this.state = {
      text: this.lines[this.line]
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.updateText, 5000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  updateText = () => {
    if (this.line + 1 >= this.lines.length) {
      this.line = 0;
    }
    this.setState({ ...this.state, text: this.lines[++this.line] });
  };

  render() {
    return (
      <div className="loader-overlay">
        <div className="grid">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <p>{this.state.text}</p>
        </div>
      </div>
    );
  }
}

export default Loader;
