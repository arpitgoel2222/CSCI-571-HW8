import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { FaTrash } from "react-icons/fa";
import ContentD from "./ContentD.js";
import Badge from "react-bootstrap/Badge";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
import { CardDeck } from "react-bootstrap";
import TextTruncate from "react-text-truncate";

export class Bookmark extends Component {
  constructor() {
    super();
    this.state = { shows: false, article: "", data: "", ls: "",refresh:false};
    this.removeitem = this.removeitem.bind(this);
    this.opencard = this.opencard.bind(this);

  }

  handle(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  opencard(id, evt) {
    if (id.includes("nytimes")) {
      this.props.history.push(`/articles?trueid=${id}`);
    } else {
      this.props.history.push(`/article?trueid=${id}`);
    }
  }
  getarticles() {
    var articles = JSON.parse(localStorage.getItem("bookmark"));
    this.setState({ data: articles });
  }
  componentDidMount() {
    this.somefn();
    this.getarticles();
    console.log("vvb")
  }

  removeitem(item) {
    if (item.webUrl) {
      if (item.webUrl.includes("guardian")) {
        var toastdata = "Removing " + item.webTitle;
        toast(toastdata, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
          autoClose:2500
        });
      }
    } else {
      var toastdata1 = "Removing " + item.headline.main;
      toast(toastdata1, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true
      });
    }
    var arr = JSON.parse(localStorage.getItem("bookmark"));

    for (var xx in arr) {
      if (arr[xx].id === item.id) {
        arr.splice(xx, 1);
      }
    }
    localStorage.setItem("bookmark", JSON.stringify(arr));

    this.getarticles()
  }
  getcolor(section) {
    var color;
    var textcolor;
    switch (section) {
      case "world": {
        textcolor = "white";
        color = "#4169E1";
        break;
      }
      case "politics": {
        textcolor = "white";
        color = "#008080";
        break;
      }
      case "business": {
        textcolor = "white";
        color = "#00BFFF";
        break;
      }
      case "technology": {
        textcolor = "black";
        color = "#ADFF2F";
        break;
      }
      case "sport": {
        textcolor = "black";
        color = "gold";
        break;
      }
      case "sports": {
        textcolor = "black";
        color = "gold";
        break;
      }
      case "GUARDIAN": {
        textcolor = "white";
        color = "black";
        break;
      }
      case "NYTIMES": {
        textcolor = "black";
        color = "lightgray";
        break;
      }
      default: {
        textcolor = "white";
        color = "darkgray";
      }
    }
    return (
      <Badge
        style={{ backgroundColor: color, color: textcolor, fontSize: "90%" ,whiteSpace:'normal'}}
      >
        {section.toUpperCase()}
      </Badge>
    );
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
  somefn() {
    this.props.callbackFromParent3(this.state.shows);
  }
  render() {
    var y;
    for (var x in this.state.data) {
      if (this.state.data[x].webUrl) {
        if (this.state.data[x].webUrl.includes("guardian")) {
          if (this.state.data[x].blocks.main.elements[0].assets.length === 0) {
            y = this.state.data[x].blocks.main.elements[0].assets;
            var obj = {};
            obj["file"] =
              "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
            y.push(obj);
          }
        }
      }
    }
    for (var xxx in this.state.data) {
      if (this.state.data[xxx].web_url) {
        if (this.state.data[xxx].web_url.includes("nytimes")) {
          if (this.state.data[xxx].multimedia.length === 0) {
            y = this.state.data[xxx].multimedia;
            var obj22 = {};
            obj22["url"] =
              "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
            y.push(obj22);
          }
        }
      }
    }

    if (this.state.data === null || this.state.data === "undefined") {
      return (
        <div
          style={{
            textAlign: "center",
            marginTop: "3%",
            fontWeight: "700",
            fontSize: "larger"
          }}
        >
          <p>You have no saved articles</p>
        </div>
      );
    } else if (this.state.data.length === 0) {
      return (
        <div
          style={{
            textAlign: "center",
            marginTop: "3%",
            fontWeight: "700",
            fontSize: "larger"
          }}
        >
          <p>You have no saved articles</p>
        </div>
      );
    } else {
      return (
        <>
          <h3 style={{ marginLeft: "2%", marginTop: "1%" }}>Favorites</h3>
          <CardDeck
            style={{
              marginLeft: "1.5%",
              marginRight: "1.5%",
              marginBottom: "1%"
            }}
          >
            {this.state.data.map(item => {
              if (item.webUrl) {
                if (item.webUrl.includes("guardian")) {
                  return (
                    <span
                      style={{ marginLeft: "-1%", marginBottom: "1%" }}
                      class="col-12 col-lg-4 col-md-6 col-sm-12 col-xl-3"
                    >
                      <Card
                        style={{
                          boxShadow: "4px 4px 8px 4px rgba(192,192,192,0.6)",
                          marginTop: "25px",

                          cursor: "pointer",
                          margin: "1%",

                        }}
                        onClick={this.opencard.bind(this, item.id)}
                      >
                        <div style={{  marginTop: "4%" ,marginLeft:'-1%'}}>
                          <Card.Title
                            style={{
                              fontWeight: "bold",
                              paddingBottom: "2%",
                              fontSize: "medium",
                              marginLeft: "5%",
                              fontStyle: "italic",
                              paddingRight:'1%'
                            }}
                          >
                             <TextTruncate
                            line={2}
                            element="span"

                            text={item.webTitle}
                          />
                            <span onClick={this.handle}>
                              &nbsp;
                              <ContentD
                                title={item.webTitle}
                                url={item.webUrl}
                                name="GUARDIAN"
                              />
                              <span onClick={this.removeitem.bind(this, item)} style={{fontWeight:'500'}}>
                                &nbsp;
                                <FaTrash />
                              </span>
                            </span>
                          </Card.Title>

                          <Card.Body style={{ marginTop: "-5%" ,marginLeft:'-1%'}}>
                            <div
                              style={{
                                border: "solid 0.5px lightgray",
                                width: "105%",
                                height: "50%",
                                textAlign: "center",
                                paddingTop: "0.2%",
                                marginLeft:'-1%',
                                paddingRight:'1%'

                              }}
                            >
                              <Card.Img
                                src={
                                  item.blocks.main.elements[0].assets[
                                    item.blocks.main.elements[0].assets.length -
                                      1
                                  ].file
                                }
                                width="95%"
                                height="95%"
                                style={{width:'98%',marginTop:'1%',marginBottom:'1%'}}
                              />
                            </div>
                            <div style={{ padding: "0% 2%",width:'102%' }}>
                              <Card.Text
                                style={{ marginTop: "3%", display: "flex" ,width:'100%'}}
                              >
                                <div
                                  style={{
                                    fontStyle: "italic",
                                    fontSize: "medium",
                                    width: "100%",
                                    marginLeft:'-1%',
                                    wordWrap:'anywhere'
                                  }}
                                >
                                  {item.webPublicationDate.split('T')[0]}
                                </div>
                                <div
                                  style={{
                                    fontSize: "13px",
                                    display: "flex",
                                    marginLeft: "3%",
                                    marginTop: "1%"
                                  }}
                                >
                                  <div >{this.getcolor(item.sectionId)}</div>
                                  <div
                                    style={{
                                      fontSize: "13px",

                                      paddingLeft: "3%"
                                      
                                    }}
                                  >
                                    {this.getcolor("GUARDIAN")}
                                  </div>
                                </div>
                              </Card.Text>
                            </div>
                          </Card.Body>
                        </div>
                      </Card>
                    </span>
                  );
                }
              } else {
                return (
                  <span
                    style={{ marginLeft: "-1%", marginBottom: "1%" }}
                    class="col-12 col-lg-4 col-md-6 col-sm-12 col-xl-3"
                  >
                    <Card
                      style={{
                        boxShadow: "4px 4px 8px 4px rgba(192,192,192,0.6)",
                        marginTop: "25px",
                        cursor: "pointer",
                        margin: "1%",

                      }}
                      onClick={this.opencard.bind(this, item.web_url)}
                    >
                      <div style={{  marginTop: "4%",marginLeft:'-1%' }}>
                        <Card.Title
                          style={{
                            fontWeight: "bold",
                            paddingBottom: "2%",
                            fontSize: "medium",
                            marginLeft: "5%",
                            fontStyle: "italic"
                          }}
                        >
                          <TextTruncate
                            line={2}
                            element="span"
                            text={item.headline.main}
                          />

                          <span onClick={this.handle}>
                            &nbsp;
                            <ContentD
                              title={item.headline.main}
                              url={item.web_url}
                              name="NYTIMES"
                            />
                            <span onClick={this.removeitem.bind(this, item)} style={{fontWeight:'500'}}>
                              &nbsp;
                              <FaTrash />
                            </span>
                          </span>
                        </Card.Title>

                        <Card.Body style={{ marginTop: "-5%",marginLeft:'-1%' }}>
                          <div
                            style={{
                              border: "solid 0.5px lightgray",
                              width: "105%",
                              height: "50%",
                              textAlign: "center",
                              paddingTop: "0.2%",
                              marginLeft:'-1%'
                            }}
                          >
                            <Card.Img
                              src={item.multimedia[0].url}
                              width="98%"
                              height="98%"
                              style={{width:'98%',marginTop:'1%',marginBottom:'1%'}}
                            />
                          </div>
                          <Card.Body style={{ padding: "0% 2%",width:'102%' }}>
                            <Card.Text
                              style={{ marginTop: "3%", display: "flex" }}
                            >
                              <div
                                style={{
                                  fontStyle: "italic",
                                  fontSize: "medium",
                                  width: "100%",
                                  marginLeft:'-2%',
                                  wordWrap:'anywhere'
                                }}
                              >
                                {item.pub_date.split("T")[0]}
                              </div>
                              <div
                                style={{
                                  fontSize: "13px",
                                  display: "flex",
                                  marginLeft: "3%",
                                  marginTop: "1%",
                                  
                                  
                                }}
                              >
                                <div>
                                  {this.getcolor(item.news_desk)}
                                </div>
                                <div
                                  style={{
                                    paddingLeft: "3%",
                                    fontSize: "13px",
                                    width:'50%'

                                  }}
                                >
                                  {this.getcolor("NYTIMES")}
                                </div>
                              </div>
                            </Card.Text>
                          </Card.Body>
                        </Card.Body>
                      </div>
                    </Card>
                  </span>
                );
              }
            })}
          </CardDeck>
        </>
      );
    }
  }
}

export default withRouter(Bookmark);
