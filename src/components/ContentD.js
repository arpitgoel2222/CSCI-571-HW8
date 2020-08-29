import React, { Component } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton
} from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";

import { Modal } from "react-bootstrap";
import { IoMdShare } from "react-icons/io";

export class Content extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.getname = this.getname.bind(this);
    this.gettitle = this.gettitle.bind(this);
  }

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  getname() {
    console.log("aa");
    return (
      <p style={{ fontSize: "83%", fontWeight: "700", marginBottom: "0rem" }}>
        {this.props.name}
      </p>
    );
  }

  gettitle() {
    return <p style={{ fontSize: "70%" }}>{this.props.title}</p>;
  }

  render() {
    return (
      <span onClick={e => e.stopPropagation()}>
        <IoMdShare onClick={this.handleShow} />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.getname()}
              {this.gettitle()}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p
              style={{
                textAlign: "center",
                fontWeight: "550",
                fontSize: "120%"
              }}
            >
              {" "}
              Share via
            </p>
            <div style={{ display: "flex" }}>
              <div style={{ width: "33%" ,marginLeft:'8%'}}>
                <FacebookShareButton
                  style={{ marginLeft: "8%" }}
                  url={this.props.url}
                  hashtag="#CSCI_571_NewsApp"
                  className="network__share-button"
                >
                  <FacebookIcon size={50} round />
                </FacebookShareButton>
              </div>
              <div style={{ width: "33%" }}>
                <TwitterShareButton
                  style={{ marginLeft: "18%" }}
                  url={this.props.url}
                  className="network__share-button"
                  hashtags={["CSCI_571_NewsApp"]}
                >
                  <TwitterIcon size={50} round />
                </TwitterShareButton>
              </div>
              <div style={{ width: "33%" }}>
                <EmailShareButton
                  style={{ marginLeft: "20%" }}
                  url={this.props.url}
                  subject="#CSCI_571_NewsApp"
                  className="network__share-button"
                >
                  <EmailIcon size={50} round />
                </EmailShareButton>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </span>
    );
  }
}

export default Content;
