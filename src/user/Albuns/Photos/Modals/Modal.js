import React from 'react';
import './Modal.css'

import Form from './Form/Form';

const modal= ({modalOpen,urlPicture}) =>(
    <div className={modalOpen}>
   <div className="Modal " >
       <div className="ModalBox">
        <img src={urlPicture} style={{"width":"100%","height":"auto"}}/>
       <p>Ola - {modalOpen} - {urlPicture}</p>
       <Form modalOpen={modalOpen} url={urlPicture} />
   <button onClick={() => modalOpen="false"}>Close</button>
       </div>
   </div>
   </div>
);

export default modal