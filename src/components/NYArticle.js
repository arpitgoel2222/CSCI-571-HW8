import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { FaRegBookmark } from "react-icons/fa";

import { FaBookmark } from "react-icons/fa";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton
} from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import ReactTooltip from "react-tooltip";
import CB from "./CB";
import commentBox from "commentbox.io";

export class NYArticle extends Component {
  constructor() {
    super();
    this.state = { showb: false, show: false };
    this.show = this.show.bind(this);
    this.show2 = this.show2.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  remove(data, title,tat) {
    this.setState({ show: false });
    var t = "Removing " + title;
    toast(t, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      autoClose:2500
    });
    var arr = [];

    arr = JSON.parse(localStorage.getItem("bookmark"));
    for (var xx in arr) {
      if (arr[xx].id === data.id) {
        arr.splice(xx, 1);
      }
    }
    localStorage.setItem("bookmark", JSON.stringify(arr));
    if(tat==="a")
    {
        this.props.cbf(false);
    }
  }


  componentDidMount() {
    this.removeCommentBox = commentBox("5664562892242944-proj");
  }

  componentWillUnmount() {
    this.removeCommentBox();
  }
  show() {
    this.setState({ showb: true });
  }
  show2() {
    this.setState({ showb: false });
  }
  add(data, title) {
    this.setState({ show: true });
    toast("Saving "+title, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      autoClose:2500
    });
    var arr = [];
    var flag = false;
    if (localStorage.getItem("bookmark") === null) {
      localStorage.setItem("bookmark", JSON.stringify([]));
    }
    arr = JSON.parse(localStorage.getItem("bookmark"));
    for (var xx in arr) {
      if (arr[xx].abstract === data[0].abstract) {
        console.log(arr[xx].id);
        flag = true;
      }
    }

    console.log(data[0]);
    if (flag === false) {
      arr.push(data[0]);
      localStorage.setItem("bookmark", JSON.stringify(arr));
    }
  }
  formatdate(datea) {
    var date3 = new Date(datea);
    var date = date3.getDate();
    var month = date3.getMonth() + 1;
    var year = date3.getFullYear();
    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }
    var current = year + "-" + month + "-" + date;
    return current;
  }
  render() {
    var article1 = this.props.article;
    var blocks1 = article1["0"];
    var main1 = "",
      main2 = "",
      main3 = "",
      main4 = "",
      main5 = "",
      main6 = "",
      imgsrc = "",
      abc = "";
    if (blocks1 != null) {
      main1 = blocks1["headline"];
      main2 = main1["main"];
      main3 = blocks1["pub_date"];
      main4 = blocks1["abstract"];
      main5 = blocks1["web_url"];
      main6 = blocks1.multimedia;
      if (main6.length === 0) {
        var obj = {};
        var obj2 = {};
        obj["0"] = obj2;
        obj2["url"] =
          "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        main6.push(obj2);
      }
      else {
        for (var i = 0; i < main6.length; i++) {
          if (main6[i].width >= 2000) {
            abc = main6[i].url;

            if (abc.substr(0, 5) !== "https") {
              abc = "https://www.nytimes.com/" + abc;
              console.log(abc);
              main6[0].url = abc;
              break;
            } else {
              main6[0].url = abc;
              break;
            }
          } else {
            main6[0].url =
              "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
          }
        }
      }
      imgsrc = main6[0].url;
    }
    if (this.state.show === false) {
      if (this.props.status1 === false) {
        return (
          <div style={{ marginLeft: "1%" }}>
            <Card
              style={{
                boxShadow: "4px 4px 8px 4px rgba(192,192,192,0.6)",
                marginTop: "25px",
                width: "98%",
                padding: "2%",
                cursor: "pointer"
              }}
            >
                
              <Card.Title style={{ fontWeight: "bold", paddingBottom: "5%" }}>
                {main2}
              </Card.Title>
              
              <div>
                <Card.Text style={{ marginTop: "-3.4%"}}>
                    <div style={{display:'flex'}}>
                
                  <div
                   style={{
                    fontStyle: "italic",
                    fontSize: "large",
                    width: "90%",
                    marginLeft:'0.5%'
                  }}
                    
                  >
                    {main3.split('T')[0]}
                  </div>
                  <div style={{display:'flex'}}>
                    
                      <FacebookShareButton
                        data-tip="Facebook"
                        url={main5}
                        hashtag="#CSCI_571_NewsApp"
                        className="Demo__some-network__share-button"
                      >
                        <FacebookIcon size={20} round />
                      </FacebookShareButton>
                      <ReactTooltip />
                      <TwitterShareButton
                        data-tip="Twitter"
                        url={main5 + "#CSCI_571_NewsApp"}
                        className="Demo__some-network__share-button"
                      >
                        <TwitterIcon size={20} round />
                      </TwitterShareButton>
                      <ReactTooltip />
                      <EmailShareButton
                        data-tip="Email"
                        url={main5}
                        subject="#CSCI_571_NewsApp"
                        className="Demo__some-network__share-button"
                      >
                        <EmailIcon size={20} round />
                      </EmailShareButton>
                      <ReactTooltip />
                    
                    
                  </div>
                  <div
                       style={{ paddingLeft: "5%", color: "red" ,marginRight:'2%', marginTop:'0.1%'}}
                      onClick={this.add.bind(this, article1, main2)}
                      
                    >
                      <FaRegBookmark data-tip="Bookmark" />
                      
                      <ReactTooltip />
                    </div>
                  </div>
                  <Card.Img
                    src={imgsrc}
                    width="98%"
                    height="98%"
                    style={{ marginTop: "1%" }}
                  />
                 
                  <span>{main4}</span>
                  
                </Card.Text>
              </div>
            </Card>
            <div style={{marginLeft:'-2%'}}>
              <CB id={article1.id} />
            </div>
          </div>
        );
      } else {
        return (
          <div style={{ marginLeft: "1%" }}>
            <Card
              style={{
                boxShadow: "4px 4px 8px 4px rgba(192,192,192,0.6)",
                marginTop: "25px",
                width: "98%",
                padding: "2%",
                cursor: "pointer"
              }}
            >
                
              <Card.Title style={{ fontWeight: "bold", paddingBottom: "5%" }}>
                {main2}
              </Card.Title>
              
              <div>
                <Card.Text style={{ marginTop: "-3.4%"}}>
                <div style={{display:'flex'}}>
                  <div
                    style={{
                        fontStyle: "italic",
                        fontSize: "large",
                        width: "90%",
                        marginLeft:'0.5%'
                      }}
                    
                  >
                      {main3.split('T')[0]}
                  </div>
                  <div style={{display:'flex'}}>
                    
                      <FacebookShareButton
                        data-tip="Facebook"
                        url={main5}
                        hashtag="#CSCI_571_NewsApp"
                        className="Demo__some-network__share-button"
                      >
                        <FacebookIcon size={20} round />
                      </FacebookShareButton>
                      <ReactTooltip />
                      <TwitterShareButton
                        data-tip="Twitter"
                        url={main5 + "#CSCI_571_NewsApp"}
                        className="Demo__some-network__share-button"
                      >
                        <TwitterIcon size={20} round />
                      </TwitterShareButton>
                      <ReactTooltip />
                      <EmailShareButton
                        data-tip="Email"
                        url={main5}
                        subject="#CSCI_571_NewsApp"
                        className="Demo__some-network__share-button"
                      >
                        <EmailIcon size={20} round />
                      </EmailShareButton>
                      <ReactTooltip />
                    
                    
                  </div>
                  <div
                       style={{ paddingLeft: "5%", color: "red" ,marginRight:'2%', marginTop:'0.1%'}}
                      onClick={this.remove.bind(this, article1, main2,"a")}
                      
                    >
                      <FaBookmark data-tip="Bookmark" />
                      
                      <ReactTooltip />
                    </div>
                  </div>
                  <Card.Img
                    src={imgsrc}
                    width="98%"
                    height="98%"
                    style={{ marginTop: "1%" }}
                  />
                  
                  <span>{main4}</span>
                 
                </Card.Text>
              </div>
            </Card>
            <div style={{marginLeft:'-2%'}}>
              <CB id={article1.id} />
            </div>
          </div>
        );
      }
    } else {
      return (
        <div style={{ marginLeft: "1%" }}>
          <Card
            style={{
                boxShadow: "4px 4px 8px 4px rgba(192,192,192,0.6)",
              marginTop: "25px",
              width: "98%",
              padding: "2%",
              cursor: "pointer"
            }}
          >
             
            <Card.Title style={{ fontWeight: "bold", paddingBottom: "5%" }}>
              {main2}
            </Card.Title>
            
            <div>
              <Card.Text style={{ marginTop: "-3.4%"}}>
          <div style={{display:'flex'}}>
                <div
                 style={{
                    fontStyle: "italic",
                    fontSize: "large",
                    width: "90%",
                    marginLeft:'0.5%'
                  }}
                >
                    {main3.split('T')[0]}
                </div>
                <div style={{display:'flex'}} >
                  
                    <FacebookShareButton
                      data-tip="Facebook"
                      url={main5}
                      hashtag="#CSCI_571_NewsApp"
                      className="Demo__some-network__share-button"
                    >
                      <FacebookIcon size={20} round />
                    </FacebookShareButton>
                    <ReactTooltip />
                    <TwitterShareButton
                      data-tip="Twitter"
                      url={main5 + "#CSCI_571_NewsApp"}
                      className="Demo__some-network__share-button"
                    >
                      <TwitterIcon size={20} round />
                    </TwitterShareButton>
                    <ReactTooltip />
                    <EmailShareButton
                      data-tip="Email"
                      url={main5}
                      subject="#CSCI_571_NewsApp"
                      className="Demo__some-network__share-button"
                    >
                      <EmailIcon size={20} round />
                    </EmailShareButton>
                    <ReactTooltip />
                  
                  
                </div>
                <div
                    style={{ paddingLeft: "5%", color: "red" ,marginRight:'2%', marginTop:'0.1%'}}
                    onClick={this.remove.bind(this, article1, main2)}
                    
                  >
                    <FaBookmark data-tip="Bookmark" />
                    
                    <ReactTooltip />
                  </div>
                </div>
                <Card.Img
                  src={imgsrc}
                  width="98%"
                  height="98%"
                  style={{ marginTop: "1%" }}
                />
                
                <span>{main4}</span>
                
              </Card.Text>
            </div>
          </Card>
          <div style={{marginLeft:'-2%'}}>
            <CB id={article1.id} />
          </div>
        </div>
      );
    }
  }
}

export default NYArticle;
