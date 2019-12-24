import React, { Component } from "react";
import ReactModal from 'react-modal';
import { AuthUserContext, withAuthorization } from '../Session';
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
            usersOnList: []
        }


    // this.handleCloseOutList = this.handleCloseOutList.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleCloseList = this.handleCloseList.bind(this);

    }

    componentDidMount(){
        
    
        this.props.firebase.addToList(this.context.uid).on('value', function(snapshot){
            let regUserList = snapshot.val();
            console.log('BEFORE COND', regUserList)

            // if(regUserList !== null){
                
            // }
        })

}
  

    handleOpenModal () {
        this.setState({ showModal: true });
        
        //Form to register for open house will appear
        //form will ask for -name -email -relator or not
        // take in all register ppl, store i DB*
    }

    handleCloseModal () {
        //take us back to home 

    //   this.props.history.push({
    //     pathname:ROUTES.HOME,
    //     state:{
    //       name: this.state.name,
    //       email: this.state.email,
    //       realtor: this.state.realtor
    //       showModal: this.state.showModal,
    //      }
    //    });



        // have to change the state of listCreated to false
        //take in all registered ppl, store in DB*


    }

    //handle input change in form
    handleChange(event) {
        console.log('handlechange')
        this.setState({ [event.target.name]: event.target.value});
      }


    handleCheck() {
        console.log('handlecheck')
        this.setState({realtor: !this.state.realtor});
    }


    //handle user input from form modal.

    handleSubmit(event){
        event.preventDefault();
    //     let dataArr = [];
    //     let dataObj = {};

    //   //  console.log('PROPS', this.props)


    //     if(this.state.name === '' && 
    //     this.state.email === ''
    //     ){

    //       alert('Please Fill Out Form');

    //     } else {






       
    //         let createNewReg = this.props.firebase.addToList(this.context.uid).push();

    //         dataObj = {
    //                 name: this.state.name,
    //                 email: this.state.email,
    //                 realtor: this.state.realtor
    //             };
            
    //         dataArr.push(dataObj)




    //         createNewReg
    //             .set(dataArr)

             this.setState({ showModal: false });


        //close modal
             this.handleCloseModal();

//        }
}

    handleCloseList(){
        //move list from /openList to /closedLists
        //change list key (open) to false

    }




    render(){

        const { street, city, state, zip} = this.props.location.state;

        return (
            <div>
                <h1>Welcome to this address</h1>
                <h3>{street} {city}, {state} {zip}</h3>
                <p>click on register button to sign yourself in</p>

                <button onClick={this.handleOpenModal}>Register</button>
                
                <button onClick={this.handleCloseList}>Close Out List</button>
 
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



