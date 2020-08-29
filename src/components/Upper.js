import React, { Component } from 'react'
import {BrowserRouter as Router, Switch as RouterSwitch, Route} from 'react-router-dom'
import World from './World'
import Politics from './Politics'
import Business from './Business'
import Technology from './Technology'
import Sports from './Sports'
import Cards from './Cards'
import Detailed from './Detailed';
import DetailedNYT from './DetailedNYT';
import Header from './Header'

export class Upper extends Component{
    
    
    
   
   
  
    render(){
        
    return (
        <Router>
        <Header callbackFromParent={this.myCallback} />
        <RouterSwitch>
        
            <Route exact path= "/">
                <Cards checked={this.state.checked}/>
            </Route>
            <Route exact path= "/world">
                <World  checked={this.state.checked}/>
            </Route> 
            <Route exact path= "/politics">
                <Politics checked={this.state.checked}/>
            </Route>
            <Route exact path= "/business">
                <Business checked={this.state.checked}/>
            </Route>
            <Route exact path= "/technology">
                <Technology checked={this.state.checked}/>
            </Route>
            <Route exact path= "/sports">
                <Sports checked={this.state.checked}/>
            </Route>
            <Route exact path="/article">
                <Detailed />
            </Route>
            <Route exact path="/articles">
                <DetailedNYT />
            </Route>
        </RouterSwitch>
        </Router>
        
    )
    }

}




export default Upper

