import React from "react";
import Tooltip from "rc-tooltip";
import { Helmet } from "react-helmet";
import { v4 as uuidv4 } from "uuid";
import { GetRecents } from "../firebase";
import { GlobalContext } from "../context/global";
import { GetExportPaletteUrl } from "../api";

import "./recentsPage.scss";

const defaultTitle = "Untitled Swatch";

class RecentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      items: [],
      perPage: 25,
      page: 0
    };
  }

  componentDidMount() {
    this.getRecents();
  }

  getRecents = async () => {
    this.context.setIsLoading(true);

    const result = await GetRecents(this.state.perPage);
    if (!result.empty) {
      this.setState({ ...this.state, items: result.docs });
    }
    this.context.setIsLoading(false);
  };

  nextPage = () => {
    this.getRecents(this.state.page + 1);
  };

  handleQuickExport = (name, colors) => {
    window.location.href = GetExportPaletteUrl(name, colors);
  };

  renderRecents = () => {
    const result = [];
    for (const doc of this.state.items) {
      const colors = [];

      for (const color of doc.data().colors) {
        colors.push(
          <div
            key={uuidv4()}
            className="color-block"
            style={{ backgroundColor: color }}></div>
        );
      }

      const title = doc.data().name;
      result.push(
        <div key={doc.id} className="swatch">
          <div className="meta">
            <a href={`/p/${doc.data().key}`}>
              <h2 className="title">
                {title !== defaultTitle
                  ? title
                  : doc.data().key.replace(/-/g, " ")}
              </h2>
            </a>
            <p className="date">
              {doc.data().createdAt.toDate().toLocaleString()}
            </p>
            <Tooltip trigger={["hover"]} overlay={<span>Quick Export</span>}>
              <button
                className="btn btn-export"
                onClick={this.handleQuickExport.bind(
                  this,
                  doc.data().name,
                  doc.data().colors
                )}>
                <i className="fad fa-file-export" />
              </button>
            </Tooltip>
          </div>
          <div className="color-blocks">{colors}</div>
          <div className="divider"></div>
        </div>
      );
    }
    return result;
  };

  render() {
    return (
      <div className="RecentsPage" role="main">
        <Helmet>
          <title>Swatcher : Recents</title>
        </Helmet>
        <div className="recents">{this.renderRecents()}</div>
      </div>
    );
  }
}

RecentsPage.contextType = GlobalContext;
export default RecentsPage;
