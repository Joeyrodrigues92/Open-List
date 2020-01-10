// you can use the higher-order component to protect your routes (e.g. /home and /account) 
// with authorization rules using the passed condition() function. To keep it simple, 
// the following two components are only protected with a broad 
// authorization rule that checks if the authUser is not null. 
// First, enhance the HomePage component with the higher-order 
// component and define the authorization condition for it:

import React, { Component } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';

import ReactModal from 'react-modal';

import * as ROUTES from '../../routes/routes';

import Card from '../Card'



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
    this.handleCardClick = this.handleCardClick.bind(this);
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
    if(this.state.streetAdd === '' && 
    this.state.cityAdd === '' && 
    this.state.streetAdd === '' && 
    this.state.zipAdd === ''
    ){
      alert('Please Fill Out Form');
    } else{
    //close modal
      this.handleCloseModal();

    //this will tell us a list is created and in use, once realtor closes and saves current list listCreated: false.
    // as long as its true realtor CAN NOT create another list (button will be hidden  )
      this.setState({ listCreated: true })
    }
    event.preventDefault();
  }

  //CARD CLICKED ON
  handleCardClick(){

    //var ref = new Firebase(URL_TO_DATA);
// this new, empty ref only exists locally
//var newChildRef = ref.push();
// we can get its id using key()
//console.log('my new shiny id is '+newChildRef.key());
// now it is appended at the end of data at the server
//newChildRef.set({foo: 'bar'});

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
   // Will redirect user to home of register 
    
    
  }

  render(){
    const listCreated = this.state.listCreated;
    let createdList;

    if (listCreated) {
      createdList = <Card handleCardClick={this.handleCardClick} propertyState={this.state} />
    }

    return(
      <div>
        <h1>Home Page</h1>

          <button onClick={this.handleOpenModal}>Create New List</button>
          {/* MODAL TRIGGER ^ */}

          <h2>Current Open List</h2>
          { createdList }

          <ReactModal 
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
            style={customStyles}
          >
            {/* <button onClick={this.handleCloseModal}>Close Modal</button> */}
            <form onSubmit={this.handleSubmit}>
              <label>
                Property Address
                <input name='streetAdd' type="text" value={this.state.streetAdd} onChange={this.handleChange} placeholder='Street Address' />
                <input name='cityAdd' type="text" value={this.state.cityAdd} onChange={this.handleChange} placeholder='City' />
                <input name='stateAdd' type="text" value={this.state.stateAdd} onChange={this.handleChange} placeholder='State Initials' />
                <input name='zipAdd' type="text" value={this.state.zipAdd} onChange={this.handleChange} placeholder='Zip Code' />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <button onClick={this.handleCloseModal}>Close</button>
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
    transform             : 'translate(-50%, -50%)'
  }
};


//THIS WILL LET US USE THE INFO OF THE CURRENT  LOGGED IN USER
//WE GET THIS INFO PASSED FROM THE errorUSERCONTEXT.PROVIDER IN withauthentication.js
//THIS WOULD BE LIKE THE AUTHCONTEXT.CONSUMER 
HomePage.contextType =  AuthUserContext;

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);