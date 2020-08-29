import React, { Component } from "react";
import LS from './LS'
import Article from "./Article";

export class Detailed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      kdata: "",
      switchs1: "false",
      ls: "",
      fillb: false,
      status: "",
      loading:true
    };
    this.someFn = this.someFn.bind(this);
    this.mycall2=this.mycall2.bind(this)

  }


  mycall2(value)
  {
    this.setState({status:value})
  }

  someFn() {
    this.props.callbackFromParent2(this.state.switchs1);
    this.props.callbackFromParent10(this.state.fillb);
  }

  getdata(article_id) {
    fetch("https://arpitnodehw8.azurewebsites.net/create?id=" + article_id)
      .then(res => {
        return res.json();
      })
      .then(kdata => {
        this.setState({ kdata: kdata ,loading:false});
      });
  }

  componentDidMount() {
    var url = window.location.search;
    url = url.split("=");
    var status = url.includes("true");
    this.setState({ status: status });
    if (localStorage.getItem("bookmark") !== null) {
      var arr = JSON.parse(localStorage.getItem("bookmark"));
      for (var xx in arr) {
        if (arr[xx].id === url[1]) {
          status = true;
          this.setState({ status: status });
        }
      }
    }
    this.setState({ id: url[1] });
    this.getdata(url[1]);
    this.someFn();
  }

  render() {
    if(this.state.loading===false)
    {return (
      <div style={{marginLeft:'1%'}}> 
        <Article
          article={this.state.kdata}
          ls={this.props.loas}
          // callbackFromParent={this.mycall}
          status1={this.state.status}
          cbf={this.mycall2}
        />
      </div>
    );}
    else{
      return(<LS loadsc={this.state.loading} />)
  }
  }
}

export default Detailed;
