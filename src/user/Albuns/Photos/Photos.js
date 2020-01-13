import React, { Component } from "react";
import "./Photos.css";

import { getPhotos, getMorePhotos} from "../../../util/APIUtils";


class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
        urlphotos: null,
        albumId:null,
        nextItems: null,
        previousItems: null,
        previousEmpty:null,
        nextEmpty:null,
      };
  }

  componentDidMount() {
   getPhotos(this.props.match.params.id)

      .then(response => {
        console.log(response);
        this.setState({
            albumId:this.props.match.params.id,
            nextItems: response.paging.cursors.after,
            previousItems: null,
            nextEmpty:response.paging.next,
            urlphotos: response.data.map(photo => (
                <li className="col-3 float-left" key={photo.id}>
                  
                    <img src={photo.webp_images[0].source} aria-hidden alt={"facebook picture"} style={{"width": "100%","height": "auto","paddingRight":"5px"}}/>
                    
                  
                </li>
              ))
        })
        
      })
      .catch(error => {});
  }

  nextlist() {

   console.log(this.state.albumId); 
   getMorePhotos(this.state.albumId,this.state.nextItems,"after")
   
    .then(response => {
      console.log(response);
      this.setState({
        previousEmpty: response.paging.previous,
        nextEmpty:response.paging.next,
        nextItems: response.paging.cursors.after,
        previousItems : response.paging.cursors.before,
        urlphotos: response.data.map(photo => (
          
          <li className="col-3 float-left" key={photo.id}>
                  
                    <img src={photo.webp_images[0].source} aria-hidden alt={"facebook picture"} style={{"width": "100%","height": "auto","paddingRight":"5px"}}/>
                    
                  
                </li>
        
        ))
      });
    })
    .catch(error => {});
    console.log(this.state.previousItems); 
  }

  previouslist() {
   getMorePhotos(this.state.albumId,this.state.previousItems,"before")
    .then(response => {
      console.log(response);
      this.setState({
        previousEmpty: response.paging.previous,
        nextEmpty:response.paging.next,
        nextItems: response.paging.cursors.after,
        previousItems : response.paging.cursors.before,
        urlphotos: response.data.map(photo => (
          
          <li className="col-3 float-left" key={photo.id}>
                  
          <img src={photo.webp_images[0].source} aria-hidden alt={"facebook picture"} style={{"width": "100%","height": "auto","paddingRight":"5px"}}/>
          
        
      </li>
        
        ))
      });
    })
    .catch(error => {});
    console.log(this.state);
  }

  render() {
    return (

        <div className="profile-container">
        <div className="container">
          
          <h4 style={{ textAlign: "center" }}>Photos</h4>
          
          <ul>{this.state.urlphotos}</ul>
       
          
        </div>
        <div className="Buttons-space">
        { this.state.previousEmpty!==null &&<button type="button" onClick={() => this.previouslist()}>
            Previous
          </button>}
          
          { this.state.nextEmpty!==null && <button type="button" onClick={() => this.nextlist()}>
            Next
          </button> }
          
        </div>
      </div>


       

    );
  }
}

export default Photos;