import React, { Component } from "react";
import Card from "react-bootstrap/Card";

import Content from "./Content.js";
import Badge from "react-bootstrap/Badge";

import { withRouter } from "react-router-dom";
import TextTruncate from "react-text-truncate";

export class GuardianS extends Component {
  constructor() {
    super();
    this.state = { articles: "" };
    this.getcolor = this.getcolor.bind(this);
    this.opencard = this.opencard.bind(this);
  }


  opencard(item, evt) {
    this.props.history.push(`/article?id=${item}`);
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
      default: {
        textcolor = "white";
        color = "darkgray";
      }
    }
    if(section.length>18)
    {return (
      <Badge
        style={{
          float: "right",
          backgroundColor: color,
          color: textcolor,
          fontSize: "90%",
          whiteSpace:'normal'
        }}
      >
        {section.toUpperCase()}
      </Badge>
    );}
    else{
      return (
        <Badge
          style={{
            float: "right",
            backgroundColor: color,
            color: textcolor,
            fontSize: "90%",
            
          }}
        >
          {section.toUpperCase()}
        </Badge>
      );

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
  handle(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  render() {
    const a = this.props.news;
    const articles = [];
    if (a.length !== 0) {
      for (var item in a) articles.push(a[item]);
    }
    for (var items in articles) {
      var xx = articles[items].blocks.main.elements[0].assets;
      if (xx.length === 0) {
        var obj = {};
        obj["file"] =
          "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        xx.push(obj);
      }
    }
    return (
      <>
        {articles.map(item => {
          return (
            <span
              style={{ marginBottom: "1%" }}
              class="col-12 col-lg-3 col-md-6 col-sm-12"
            >
              <Card
                style={{
                  boxShadow: "4px 4px 8px 4px rgba(192,192,192,0.6)",
                  marginTop: "25px",
                  width: "100%",
                  cursor: "pointer",
                  margin: "1%"
                }}
                onClick={this.opencard.bind(this, item.id)}
              >
                <div style={{ marginTop: "4%" }}>
                  <Card.Title
                    style={{
                      fontWeight: "bold",
                      paddingBottom: "2%",
                      fontSize: "medium",
                      marginLeft: "5%",
                      paddingRight:'2%',
                      fontStyle:'italic'
                    }}
                  >
                    <TextTruncate
                    text={item.webTitle}
                    line={2}
                    element="span"
                    />
                    <span onClick={this.handle}>&nbsp;
                      <Content title={item.webTitle} url={item.webUrl} />
                    </span>
                  </Card.Title>
                  <Card.Body style={{ marginTop: "-6%",marginLeft:'-2%' }}>
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
                        src={
                          item.blocks.main.elements[0].assets[
                            item.blocks.main.elements[0].assets.length - 1
                          ].file
                        }
                        width="98%"
                        height="98%"
                        style={{width:'98%',marginTop:'1%',marginBottom:'1%'}}
                      />
                    </div>
                    <Card.Body style={{ padding: "0% 2%" ,width:'105%'}}>
                      <Card.Text style={{ marginTop: "3%" ,marginLeft:'-3%',display:'flex'}}>
                        <span
                          style={{ fontStyle: "italic", fontSize: "medium" ,width:'100%'}}
                        >
                          {item.webPublicationDate.split('T')[0]}
                        </span>

                        <span style={{ float: "right" }}>
                          {
                          this.getcolor(item.sectionId)}
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card.Body>
                </div>
              </Card>
            </span>
          );
        })}
      </>
    );
  }
}

export default withRouter(GuardianS);
