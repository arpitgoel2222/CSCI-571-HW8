import React, { Component } from "react";
import commentBox from "commentbox.io";

export class CB extends Component {
  componentDidMount() {
    commentBox("5730933827174400-proj", {
      className: "commentbox",
      tlcParam: "tlc",
      backgroundColor: null,
      textColor: null,
      subtextColor: null,
      createBoxUrl(boxId, pageLocation) {
        var comId= window.location.search.split("=")[1]
        if(comId.includes("nytimes"))
        {
          var id = (window.location.search.split("=")[1])
          comId= id.split("com/")[1]
        }
        pageLocation.search = comId // removes query string!
        pageLocation.hash = boxId; // creates link to this specific Comment Box on your page
        return comId; // return url string
      }
    });
  }

  render() {
    var id;
    if (this.props.id != null) {
      id = this.props.id;
    }
    return (
      <div
        className="commentbox"
        id={id}
        style={{ marginTop: "3%", padding: "2%", width: "100%" }}
      />
    );
  }
}

export default CB;
