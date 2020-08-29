import React, { Component } from 'react'
import CardShow from './CardShow'
import NYTCardShow from './NYTCardShow'
import LS from './LS'


export class Sports extends Component {
    constructor(props) {
        super(props);
        this.state = { gnews:'', nnews:'',shows:'true',ls:'',loading:true };
    }
    somefn()
    {
        this.props.callbackFromParent3(this.state.shows);
    }   
    
    callguardianAPI() {
        fetch("https://arpitnodehw8.azurewebsites.net/guardians")
            .then(res => {
                return res.json();
            })
            .then(gnews=>{
                this.setState({gnews:gnews})
            })
    }

    callnytAPI() {
        fetch("https://arpitnodehw8.azurewebsites.net/nyts")
            .then(res => {
                return res.json();
            })
            .then(nnews=>{
                this.setState({nnews:nnews,loading:false})
            })
            }
    
    
            
    componentDidMount() 
    {
        this.callguardianAPI();  
        this.callnytAPI();
        this.somefn()
    }

    render() {
        if(this.state.loading===false)
        {if(this.props.checked===true)
        {return (
           <div>
               <CardShow
                news={this.state.gnews} ls={this.props.loas} 
               />
           </div>
        )}
        else{
            return (
                <div>
                    <NYTCardShow
                    news={this.state.nnews} ls={this.props.loas} 
                    />
                </div>
             )

        }}
        else{
            return(<LS loadsc={this.state.loading} />)
        }
    }
}

export default Sports
