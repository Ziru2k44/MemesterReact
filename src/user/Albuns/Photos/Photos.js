import React, { Component } from "react";
import "./Photos.css";

import { getPhotos} from "../../../util/APIUtils";


class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
        urlphotos: null
      };
  }

  componentDidMount() {
    this.setState({loading:true,});
   getPhotos(this.props.match.params.id)

      .then(response => {
        console.log(response);
        this.setState({
            urlphotos: response.data.map(photo => (
                <li className="col-3 float-left" key={photo.id}>
                  
                    <img src={photo.webp_images[0].source} alt={"facebook picture"} style={{"width": "100%","height": "auto","paddingRight":"5px"}}/>
                    
                  
                </li>
              ))
        })
        
      })
      .catch(error => {});
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
          
          { this.state.previousItems!==this.state.nextItems && <button type="button" onClick={() => this.nextlist()}>
            Next
          </button> }
          
        </div>
      </div>


       

    );
  }
}

export default Photos;