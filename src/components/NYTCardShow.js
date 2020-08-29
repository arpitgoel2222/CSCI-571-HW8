import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import TextTruncate from "react-text-truncate";
import Content from "./Content.js";
import { withRouter } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";

export class NYTCardShow extends Component {
  constructor() {
    super();
    //this.state={clicked:false,kdata:''}
    this.handle = this.handle.bind(this);
    this.opencard = this.opencard.bind(this);
    // this.sendb = this.sendb.bind(this);
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
  opencard(id, evt) {
    this.props.history.push(`/articles?id=${id}`);
  }
  handle(evt) {
    evt.preventDefault();
    evt.stopPropagation();
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
      default: {
        textcolor = "white";
        color = "darkgray";
      }
    }
    return (
      <Badge
        style={{ backgroundColor: color, color: textcolor, fontSize: "90%" }}
      >
        {section.toUpperCase()}
      </Badge>
    );
  }

  render() {
    var x = this.props.news;
    var news = [];
    for (var items in x) {
      if (x[items].multimedia) {
        news.push(x[items]);
      }
    }
    for (var ite in news) {
      var xx = news[ite].multimedia;
      var length = xx.length;
      for (var i = 0; i < length; i++) {
        var xy;
        if (xx[i].width >= 2000) {
          xy = xx[i].url;
          xx[0].url = xy;

          break;
        } else {
          xx[0].url =
            "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        }
      }
    }
    return (
      <div className="card" style={{ marginLeft: "3%", border: "none" }}>
        {news.map(item => (
          <div>
            <Card
              style={{
                boxShadow: "4px 4px 8px 4px rgba(192,192,192,0.6)",
                marginTop: "25px",
                width: "97%",
                cursor: "pointer"
              }}
              onClick={this.opencard.bind(this, item.url)}
            >
              <Row style={{ display: "contents" }}>
                <Card.Body>
                  <div
                    style={{
                      border: "solid 0.5px lightgray",
                      width: "100%",
                      height: "70%",
                      textAlign: "center",
                      paddingTop: "0.2%",
                      float: "left",
                      paddingBottom: "0.4%"
                    }}
                    class="col-xs-12 col-lg-3"
                  >
                    <Card.Img
                      src={item.multimedia[0].url}
                      width="98%"
                      height="98%"
                      style={{ width: "108%", marginLeft: "-4%" }}
                    />
                  </div>
                  <Card.Body
                    style={{ padding: "0% 2%", float: "right " }}
                    class="col-12 col-lg-9"
                  >
                    <Card.Title
                      style={{
                        fontWeight: "bold",
                        paddingBottom: "2%",
                        marginBottom: "-0.5%",
                        fontStyle:'italic'
                      }}
                    >
                      {item.title}
                      <span onClick={this.handle}>
                        <Content title={item.title} url={item.url}></Content>
                        
                      </span>
                    </Card.Title>
                    <span>
                      <TextTruncate line={3} text={item.abstract} />
                    </span>
                    <Card.Text style={{marginTop:'2%'}}>
                      <span style={{ fontStyle: "italic", fontWeight: "550" }}>
                        {item.published_date.split("T")[0]}
                      </span>
                      <span style={{ float: "right" }}>
                        {this.getcolor(item.section)}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card.Body>
              </Row>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(NYTCardShow);
