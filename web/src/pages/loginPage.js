import React from 'react';
import { Link } from 'react-router-dom';
import {Mutation} from "react-apollo";
import {gql} from 'apollo-boost';

const LOGIN_MUTATION = gql`
    mutation loginMutation($userID: String!, $password: String!){
        login(userID: $userID, password: $password)
    }`;

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            password: '',
        };
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
                <h1> Log in Page </h1>
                <input id="inputUserID" onChange={this.changeUserID} className="form-control" placeholder="input userID" type="text" required/>
                <input id="inputPassword" onChange={this.changePassword} type="password" className="form-control" placeholder="input Password" required />
                <Mutation mutation={LOGIN_MUTATION}
                          onCompleted={
                              data => {
                                  if(data.login != '') {
                                      localStorage.setItem("token", data.login);
                                      window.location.href="/main";
                                  }
                              }
                          }
                          variables={{
                              userID: this.state.userID,
                              password: this.state.password,
                          }}>
                    {(login, {data, called}) => {
                        return (<button className="btn btn-lg btn-primary btn-block" onClick={login}>Log In</button>);
                    }}
                </Mutation>
                <Link to="/signup">Don't you have account?</Link>
            </div>
        )
    }
}

export default LoginPage;