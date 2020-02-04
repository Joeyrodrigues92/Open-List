import React, { Component } from "react";
import ReactModal from 'react-modal';
import { AuthUserContext, withAuthorization } from '../Session';
import * as ROUTES from '../../routes/routes';

import axios from "axios";

// import RegisterForm from './registerForm';


// HOME SCREEN FROM OPEN HOUSE REGISTER FORM
//WE NEED A BUTTON FOR ADMIN TO CLOSE LIST
    //SAVES DATA FROM REGISTER FORM
//BUTTON TO PULL UP FORM

class Register extends Component{
    constructor (props) {
        super(props);
        this.state = {
            showModal: false,
            name: '',
            email: '',
            realtor: false,
            usersOnList: [],
            listKey: props.location.state.listKey 
        }

    // this.handleCloseList = this.handleCloseList.bind(this);
   // this.handleSetCloseModal =this.handleSetCloseModal.bind(this)
    this.handleCloseOutList = this.handleCloseOutList.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.registerUserList = this.registerUserList.bind(this)

    }




    componentDidMount(){

        this.props.firebase.addToList(this.context.uid, this.state.listKey)
                //BIND IT TO HAVE this WORK PROPERLY 
            .on('value', (snapshot) => {

                let regUserList = snapshot.val();
 
                 this.registerUserList(regUserList)

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });        
    }
  


    registerUserList(list){
        
        if ( list != null){
            console.log("List ",list)
            const newList = Object.entries(list)
            this.setState({ usersOnList: newList })
        }
    }


    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {

        this.setState({ showModal: false,
            name: '',
            email: '',
            realtor: false
        });
    }

    //handle input change in form
    handleChange(event) {
       // console.log('handlechange')
        this.setState({ [event.target.name]: event.target.value});
      }


    handleCheck() {
       // console.log('handlecheck')
        this.setState({realtor: !this.state.realtor});
    }


    //handle user input from form modal.

    handleSubmit(event){
        event.preventDefault();
        //let dataArr = this.state.usersOnList;

        if(this.state.name === '' ||
        this.state.email === ''
        ){
            alert('Please Fill Out Form');
        }else {

            //let createNewReg = this.props.firebase.addToList(this.context.uid, this.state.listKey).push();
            
           let createNewReg = this.props.firebase.addToList(this.context.uid, this.state.listKey)

            let dataObj = {
                name: this.state.name,
                email: this.state.email,
                realtor: this.state.realtor
            };

            createNewReg
            .push(dataObj)

            this.handleCloseModal()
        }
    };

    handleCloseOutList(){

        console.log('list close')
        let userEmail = this.props.firebase.auth.currentUser.email

        let postObj = {
            data : this.state.usersOnList,
            userEmail: userEmail,
        }

        console.log('FETCHING')
        //POST TO BACKEND TO SEND AN EMAIL
        axios.post("/email", postObj)

        //console.log('YOOOO', this.props.firebase.createNewList(this.context.uid))
        this.props.firebase.createNewList(this.context.uid).remove();
            
            // WE NEED TO GO BACK HOME 
            this.props.history.push({
                pathname:ROUTES.HOME
                // state:{
                //   street: this.state.streetAdd,
                //   city: this.state.cityAdd,
                //   state: this.state.stateAdd,
                //   zip: this.state.zipAdd,
                //  listKey: key
                // }
              });

    }


    render(){
        const { street, city, state, zip} = this.props.location.state;

        return (
            <div>
                <h1>Welcome to this address</h1>
                <h3>{street} {city}, {state} {zip}</h3>
                <p>click on register button to sign yourself in</p>

                <button onClick={this.handleOpenModal}>Register</button>
                
                <button onClick={this.handleCloseOutList}>Close Out List</button>
 
                <ReactModal 
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    style={customStyles}
                >
                    {/* <button onClick={this.handleCloseModal}>Close Modal</button> */}
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        <input name='name' type="text" value={this.state.name} onChange={this.handleChange} placeholder='Full Name' />
                        <input name='email' type="text" value={this.state.email}  onChange={this.handleChange} placeholder='Email' />
                        Realtor
                        <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.realtor}/>
                    </label>
                    <input type="submit" value="Submit" />
                    <button onClick={this.handleCloseModal}>Close</button>
                    </form>
                    {/* <button onClick={this.handleCloseModal}>Close</button> */}
                </ReactModal>
            </div>
        );
    }
}


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
//WE GET THIS INFO PASSED FROM THE errorUSERCONTEXT.PROVIDER IN witherrorentication.js
//THIS WOULD BE LIKE THE AUTHCONTEXT.CONSUMER 
Register.contextType =  AuthUserContext;

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Register);


