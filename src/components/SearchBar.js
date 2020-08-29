import React, { Component } from 'react'
import axios from 'axios';
import _ from "lodash";
import { withRouter } from 'react-router-dom';
import AsyncSelect from 'react-select/async';


export class SearchBar extends Component {

    constructor(props) 
    {
        super(props);
        this.state = {selectedOption:'',qr:'' ,lss:true,searchBy:false};
        this.handleChange2 = this.handleChange2.bind(this);
        this.loadOptions = _.debounce(this.loadOptions.bind(this), 500);
        this.sendb=this.sendb.bind(this)
    }

    sendb(value) {
      if(this.props.ls===true && value===false)
      {    
          this.props.callbackFromParent(value);
      }
      else if(value===true)
      {
          this.props.callbackFromParent(true);
      }
    }



    handleChange2 = selectedOption => {
        this.setState(
          { selectedOption }
        );
        this.sendb(true)
        this.props.history.push(`/search?q=${selectedOption.label}`)
        
    };


    loadOptions(query,callback) 
    {
        try {
          axios.get(
            `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=${query}`,
            {
              headers: {
                "Ocp-Apim-Subscription-Key": "767f6a38b6774247aeea943d787b3a5f"
              }
            })
            .then(function(response){
             var data= response.data.suggestionGroups[0].searchSuggestions;
             let options= data.map(function(result){
               return{
                 value:result.url,
                 label:result.displayText
               }
             })
             callback(options)
            })
          }
         catch (error) {
          console.log(error);
        }
      
    }



    render() {
      if(this.props.history.location.pathname.includes("search"))
        return (
            <div style={{width:'100%'}}>
                <AsyncSelect
                loadOptions={_.debounce((query,callback)=> this.loadOptions(query,callback),2000,{leading:true})}
                cacheOptions={true}
                value={this.state.selectValue}
                onChange={this.handleChange2}
                style={{width:'100%'}}
                placeholder="Enter keyword.."
                noOptionsMessage={()=>"No Match"}
                key={this.state.searchBy}
            />
                
            </div>
        )
        else{
          return (
            <div style={{width:'100%'}}>
                <AsyncSelect
                loadOptions={_.debounce((query,callback)=> this.loadOptions(query,callback),2000,{leading:true})}
                cacheOptions={true}
                value=''
                onChange={this.handleChange2}
                style={{width:'100%'}}
                placeholder="Enter keyword.."
                noOptionsMessage={()=>"No Match"}
                key={this.state.searchBy}
            />
                
            </div>
        )

        }
    }
}

export default withRouter (SearchBar)
