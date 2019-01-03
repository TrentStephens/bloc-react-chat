import React, {Component} from 'react';
import * as firebase from 'firebase';


class User extends Component {

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  };

  signOut() {
    this.props.firebase.auth().signOut();
  };

  sign

  render() {
    return (
        <div className="User">
          <button onClick={()=>this.signIn()}>
            Sign In
          </button>
          <button onClick={()=>this.signOut()}>
            Sign Out
          </button>
        <div>{(this.props.user) ? this.props.user.displayName : ''} </div>
        </div>
    );
  }
}




export default User;
