import BounceLoader from "react-spinners/BounceLoader";
import React, { Component } from "react";
const override = `display: block;margin: 0 auto;border-color: red;`;
class LS extends Component {
  render() {
    //console.log(this.props.loadsc)
    if (this.props.loadsc) {
      return (
        <div
          className="sweet-loading"
          style={{ textAlign: "center", marginTop: "20%" }}
        >
          <BounceLoader
            size={60}
            color={"#123abc"}
            loading={this.props.loadsc}
            css={override}
          ></BounceLoader>
          <p style={{ textAlign: "center", fontWeight: "bold" }}>Loading</p>
        </div>
      );
    } else {
      return null;
    }
  }
}
export default LS;
