import React, { Component } from 'react';
import { withFirebase } from '../Firebase';


// component's componentDidMount() lifecycle method is the perfect place to 
// fetch users from your Firebase realtime database API

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.users().on('value', snapshot => {
      
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  //Remember to remove the listener to avoid memory leaks from using the same 
  //reference with the off() method
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (

      <div>
      <h1>Admin</h1>
      {loading && <div>Loading ...</div>}
      <UserList users={users} />
    </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);


// const condition = authUser =>
//   authUser && !!authUser.roles[ROLES.ADMIN];

export default withFirebase(AdminPage);

// We are using the users reference from our Firebase class to 
// attach a listener. The listener is called on(), which receives a 
// type and a callback function. The on() method registers a continuous 
// listener that triggers every time something has changed, the once() 
// method registers a listener that would be called only once. 
