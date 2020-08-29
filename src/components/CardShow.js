import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import TextTruncate from "react-text-truncate";
import Content from "./Content.js";
import { withRouter } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";

export class CardShow extends Component {
  prevState = {};
  constructor() {
    super();
    this.state = { clicked: false, kdata: "", ls1: false };
    this.handle = this.handle.bind(this);
    this.opencard = this.opencard.bind(this);
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
  handle(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  opencard(id, evt) {
    this.props.history.push(`/article?id=${id}`);
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
        textcolor = "white";
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
      if (x[items].blocks.main) {
        news.push(x[items]);
      }
    }
    for (var ite in news) {
      var xx = news[ite].blocks.main.elements[0].assets;
      if (xx.length === 0) {
        var obj = {};
        obj["file"] =
          "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";

        xx.push(obj);
      }
    }

    return (
      <div className="card" style={{ marginLeft: "3%", border: "none" }}>
        {news.map(item => (
          <div onClick={this.opencard.bind(this, item.id)}>
            <Card
              style={{
                boxShadow: "4px 4px 8px 4px rgba(192,192,192,0.6)",
                marginTop: "25px",
                width: "97%",
                cursor: "pointer"
              }}
            >
              <Row style={{ display: "contents" }}>
                <Card.Body>
                  <div
                    style={{
                      border: "solid 0.5px lightgray",
                      width: "100%",
                      height: "70%",
                      textAlign: "center",
                      paddingTop: "0.4%",
                      float: "left",
                      paddingBottom: "0.4%"
                    }}
                    class="col-xs-12 col-lg-3"
                  >
                    <Card.Img
                      src={
                        item.blocks.main.elements[0].assets[
                          item.blocks.main.elements[0].assets.length - 1
                        ].file
                      }
                      width="98%"
                      height="98%"
                      style={{ width: "108%", marginLeft: "-4%" }}
                    />
                  </div>
                  <Card.Body
                    style={{ padding: "0% 2%", float: "right" }}
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
                      {item.webTitle}
                      <span onClick={this.handle}>
                        <Content title={item.webTitle} url={item.webUrl} />
                      </span>
                    </Card.Title>
                    <span>
                      <TextTruncate
                        line={3}
                        text={item.blocks.body[0].bodyTextSummary}
                      />
                    </span>
                    <Card.Text style={{ marginTop: "2%" }}>
                      <span style={{ fontStyle: "italic", fontWeight: "550" }}>
                        {item.webPublicationDate.split("T")[0]}
                      </span>
                      <span style={{ float: "right" }}>
                        {this.getcolor(item.sectionId)}
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

export default withRouter(CardShow);
