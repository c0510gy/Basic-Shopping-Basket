import React from 'react';
import {Link} from "react-router-dom";
import {gql} from 'apollo-boost';
import {Mutation} from "react-apollo";

const SIGNUP_MUTATION = gql`
    mutation signupMutation($name: String!, $userID: String!, $password: String!){
        signup(name: $name, userID: $userID, password: $password)
    }`;

class SignupPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            userID: '',
            password: '',
        };
    }

    changeName = () => {
        this.setState({
            name: document.getElementById("inputName").value,
        });
    }

    changeUserID = () => {
        this.setState({
            userID: document.getElementById("inputUserID").value,
        });
    }

    changePassword = () => {
        this.setState({
            password: document.getElementById("inputPassword").value,
        });
    }

    render() {
        return (
            <div>
                <h1> Sign Up Page </h1>
                <input id="inputName" onChange={this.changeName} className="form-control" placeholder="input your name" type="text" required autoFocus/>
                <input id="inputUserID" onChange={this.changeUserID} className="form-control" placeholder="input userID" type="text" required/>
                <input id="inputPassword" onChange={this.changePassword} type="password" className="form-control" placeholder="input Password" required />
                <Mutation mutation={SIGNUP_MUTATION}
                          onCompleted={
                              data => {
                                  if(data.signup) window.location.href="/";
                              }
                          }
                          variables={{
                    name: this.state.name,
                    userID: this.state.userID,
                    password: this.state.password,
                }}>
                    {(signup, {data, called}) => {
                        return (<button className="btn btn-lg btn-primary btn-block" onClick={signup}>Sign Up</button>);
                    }}
                </Mutation>
                <Link to="/">Login Page</Link>
            </div>
        )
    }
}

export default SignupPage;