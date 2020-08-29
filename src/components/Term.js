import React, { Component } from "react";
import GuardianS from "./GuardianS";
import NYTS from "./NYTS";
import { withRouter } from "react-router-dom";
import { CardDeck } from "react-bootstrap";
import LS from './LS'

export class Term extends Component {
  constructor() {
    super();
    this.state = {
      qr: "",
      kr: "",
      keyword: "",
      shows: false,
      ls: "",
      query: "",
      fillb: false,
      aa:false,
      loading:true
    };
    this.getline=this.getline.bind(this)
  }
  somefn() {
    this.props.callbackFromParent3(this.state.shows);
    this.props.callbackFromParent10(this.state.fillb);
  }

  getline(value)
  {
    if (value === true) {
      return (<h1>ge</h1>)
    }
  }

  getdata(term) {
    fetch("https://arpitnodehw8.azurewebsites.net/searchq?id=" + term)
      .then(res => {
        return res.json();
      })
      .then(qr => {
        this.setState({ qr: qr.guardian, kr: qr.nyt ,loading:false});
      });
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({ query: location.search.split("=") });
      this.getdata(location.search.split("="));
      this.setState({loading:true})
      this.forceUpdate()
    });
    this.somefn();
    var url = window.location.search.split("=");

    var term = url[1];
    this.getdata(term);
  }


  render() {
    const gnews = [],
      nnews = [];
    if (this.state.qr.length !== 0) {
      for (var i = 0; i < this.state.qr.length; i++) {
        gnews.push(this.state.qr[i]);
        if (i === 4) break;
      }
    }
    if (this.state.kr.length !== 0) {
      for (var k = 0; k < this.state.kr.length; k++) {
        nnews.push(this.state.kr[k]);
        if (k === 4) break;
      }
    }
    if(this.state.loading===false)
    {if(this.state.aa===false)
    {return (
      <div style={{ margin: "1%", marginLeft: "2%" }}>
       <h3 style={{marginLeft:'0.5%'}}>Results</h3>
        <CardDeck style={{marginRight:'2.5%'}}>
          <GuardianS
            news={gnews}
            ls={this.props.loas}
            
          />

          <NYTS
            news={nnews}
            ls={this.props.loas}
            
          />
          
        </CardDeck>
      </div>
    );}
    
    else{
      return (
        <div style={{ margin: "1%", marginLeft: "2%",marginRight:'4%' }}>
         <h3 style={{marginLeft:'0.5%'}}>Results</h3>
          <CardDeck style={{marginRight:'2.5%'}}>
            <GuardianS
              news={gnews}
              ls={this.props.loas}
              
            />
  
            <NYTS
              news={nnews}
              ls={this.props.loas}
              
            />
            
          </CardDeck>
        </div>
      );

    }}
    else{
      return(<LS loadsc={this.state.loading} />)
  }
  }
}

export default withRouter(Term);
