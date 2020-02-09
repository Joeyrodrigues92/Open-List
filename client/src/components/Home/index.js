// you can use the higher-order component to protect your routes (e.g. /home and /account) 
// with authorization rules using the passed condition() function. To keep it simple, 
// the following two components are only protected with a broad 
// authorization rule that checks if the authUser is not null. 
// First, enhance the HomePage component with the higher-order 
// component and define the authorization condition for it:

import React, { Component } from 'react';
import './style.css';
import { AuthUserContext, withAuthorization } from '../Session';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ReactModal from 'react-modal';
//import { Button } from 'reactstrap';

import * as ROUTES from '../../routes/routes';


class HomePage extends Component{

  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      streetAdd: '',
      cityAdd: '',
      stateAdd: '',
      zipAdd: '',
      listCreated: false,
      error: ''
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleCardClick = this.handleCardClick.bind(this);
  }


  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  //MODAL PROP ADDRESS FORM
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    console.log(
    this.state.streetAdd, 
    this.state.cityAdd, 
    this.state.stateAdd,
    this.state.zipAdd
    )

    if(this.state.streetAdd === '' || 
    this.state.cityAdd === '' || 
    this.state.stateAdd === '' ||
    this.state.zipAdd === ''
    ){
      alert('Please Fill Out Form');
      
    } else{
    //close modal
      this.handleCloseModal();

    //this will tell us a list is created and in use, once realtor closes and saves current list listCreated: false.
    // as long as its true realtor CAN NOT create another list (button will be hidden  )
      this.setState({ listCreated: true })
    


  let createNewListKey = this.props.firebase.createNewList(this.context.uid).push();
  let key = createNewListKey.key;
 //  let newKey = key.replace("-", "");


 createNewListKey
   .set({
     street: this.state.streetAdd,
     city: this.state.cityAdd,
     state: this.state.stateAdd,
     zip: this.state.zipAdd,
     open: true
     })
     .then(() =>{

       this.props.history.push({
         pathname:ROUTES.REGISTER,
         state:{
           street: this.state.streetAdd,
           city: this.state.cityAdd,
           state: this.state.stateAdd,
           zip: this.state.zipAdd,
          listKey: key
         }
       });
     })
     .catch(error =>{
       console.log('error', error)
       this.setState({
         error: error
       })
     })


    }
      event.preventDefault();

  }

  
  render(){
    return(
      <div className='container'>
        <h1>DashBoard</h1>
        <h3>To create a sign up sheet for your open house begin by clicking the ' Create New List ' button.</h3>
        <p>New features coming soon</p>

        <Button
          color="warning"
          onClick={this.handleOpenModal}
          >
            Create New List
        </Button>
          {/* MODAL TRIGGER ^ */}

          {/* START MODAL */}
          <ReactModal 
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
            style={customStyles}
          >
            {/* <button onClick={this.handleCloseModal}>Close Modal</button> */}
            {/* <form className='formAddress'onSubmit={this.handleSubmit}>
              <label>
                Property Address
                <input className='addressForm' name='streetAdd' type="text" value={this.state.streetAdd} onChange={this.handleChange} placeholder='Street Address' />
                <input className='addressForm' name='cityAdd' type="text" value={this.state.cityAdd} onChange={this.handleChange} placeholder='City' />
                <input className='addressForm' name='stateAdd' type="text" value={this.state.stateAdd} onChange={this.handleChange} placeholder='State Initials' />
                <input className='addressForm' name='zipAdd' type="text" value={this.state.zipAdd} onChange={this.handleChange} placeholder='Zip Code' />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <button onClick={this.handleCloseModal}>Close</button> */}
            <Form>
             <FormGroup>
                <Label for="Street Address">Street Address</Label>
                <Input value={this.state.streetAdd} onChange={this.handleChange} type="address" name="streetAdd" className="addressForm" placeholder="11 Example Way" />
            </FormGroup>
            <FormGroup>
                <Label for="City">City</Label>
                <Input  className='addressForm' name='cityAdd' type="text" value={this.state.cityAdd} onChange={this.handleChange} placeholder='City' />
            </FormGroup>
            <FormGroup>
                <Label for="State">State Initials</Label>
                <Input className='addressForm' name='stateAdd' type="text" value={this.state.stateAdd} onChange={this.handleChange} placeholder='State Initials' />
            </FormGroup>
            <FormGroup>
                <Label for="Zip Code">Zip Code</Label>
                <Input className='addressForm' name='zipAdd' type="text" value={this.state.zipAdd} onChange={this.handleChange} placeholder='Zip Code' />
            </FormGroup>
            <Button id='createAddSubmit' onClick={this.handleSubmit} color="warning">Submit</Button>
            <Button onClick={this.handleCloseModal} color="danger">Close</Button>

            </Form>
          </ReactModal>
          {/* END MODAL */}
      </div>
    )
  }
  
};

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};


//THIS WILL LET US USE THE INFO OF THE CURRENT  LOGGED IN USER
//WE GET THIS INFO PASSED FROM THE errorUSERCONTEXT.PROVIDER IN withauthentication.js
//THIS WOULD BE LIKE THE AUTHCONTEXT.CONSUMER 
HomePage.contextType =  AuthUserContext;

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);