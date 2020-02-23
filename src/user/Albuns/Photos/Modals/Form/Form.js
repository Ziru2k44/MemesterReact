import React, { Component } from "react";

import Alert from 'react-s-alert';

import { SubmiteMeme} from "../../../../../util/APIUtils";

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         
          imageUrl: '',
          description:'',
          language:{id:''},
        categories: [{
            id:'1'

        }
             
        ]
      };
  
      this.handleSubmit = this.handleSubmit.bind(this);
    };
 //this.props.imageUrl
  componentDidMount (){
    this.setState({  imageUrl:this.props.url });
  }
 
    handleTitle = event => {
     
        this.setState({ description: event.target.value });
      }
      
      handleLanguage = event =>{
        this.setState({ language:{id: event.target.value},
        imageUrl:this.props.url });
        console.log(this.props);
      }
     
      handleCategory = event =>{
        this.setState(state => {
          const categories = state.categories.concat({id:"1"});
          return {
            categories
          };
      })
    
    }

    handleSubmit(event) {
      console.log("props:" + this.props.url);
      console.log(this.state );
            event.preventDefault();   
    
            const SubmitedInfo = Object.assign({}, this.state);
    
            SubmiteMeme(SubmitedInfo)
            .then(response => {
                Alert.success("Submited with sucess!");
                this.props.history.push("/");
                console.log(this.props);
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
       
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <br/><br/>
          <label>
            Title:
            <input type="text" value={this.state.title} onChange={this.handleTitle} />
          </label>
<br/><br/>
          <label>
          Language:
          <select value={this.state.language.id} onChange={this.handleLanguage}>
          <option value="1">English</option>
            <option value="2">Portuguese</option>
            <option value="3">French</option>
            <option value="4">Spanish</option>
          </select>
        </label>
        <br/><br/>
        <label>
          Category:
          <select  value={this.state.categories[0].id} onChange={this.handleCategory}>
            <option value="a">Sport</option>
            <option value="2">Food</option>
            <option value="3">Religion</option>
            <option value="4">Politic</option>
          </select>
        </label>
        <br/><br/>
          
          <input type="submit" value="Submit" />
          <br/><br/>
        </form>
      );
    }
  }


export default Form;