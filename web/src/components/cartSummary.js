import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {Mutation} from "react-apollo";
import NumberFormat from 'react-number-format';

const SET_ITEMS_MUTATION = gql`
    mutation updateSelected($token: String!, $selected: [Int]!){
        save(token: $token, selected: $selected)
    }`;

const LOGOUT_MUTATION = gql`
    mutation logoutMutation($token: String!){
        logout(token: $token)
    }`;

class CartSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    receipt = () => {
        const arr = [];
        for(let i=0;i<this.props.itemsLength;i++){
            if(!this.props.countById("selected", i)) continue;
            arr.push(this.props.countById("name", i));
            arr.push(" X ");
            arr.push(this.props.countById("selected", i));
            arr.push("개 = ");
            arr.push(<NumberFormat value={this.props.countById("selected", i) * this.props.countById("price", i)}
                                   displayType={'text'} thousandSeparator={true} />);
            arr.push("원");
            arr.push(<br/>);
        }
        return arr;
    }

    getSelected = () => {
        const arr = [];
        for(let i=0; i<this.props.itemsLength; i++){
            arr.push(this.props.countById("selected", i));
        }
        return arr;
    }

    getTotalPrice = () => {
        let price = 0;
        for(let i=0; i<this.props.itemsLength; i++){
            price += this.props.countById("selected", i) * this.props.countById("price", i);
        }
        return price;
    }

    render() {

        return (

            <div>
                {this.receipt()}
                합계: <NumberFormat value={this.getTotalPrice()} displayType={'text'} thousandSeparator={true} /> 원
                <br />

                <Mutation mutation={SET_ITEMS_MUTATION} variables={{token: localStorage.getItem("token"), selected: this.getSelected()}}>
                    {(save, {data, called}) => {
                        return (<button onClick={save}>Save!!</button>);
                    }}
                </Mutation>
                <br />

                <Mutation mutation={LOGOUT_MUTATION}
                          onCompleted={
                              data => {
                                  if(data.logout == true) {
                                      localStorage.setItem("token", null);
                                      window.location.href="/";
                                  }
                              }
                          }
                          variables={{token: localStorage.getItem("token")}}>
                    {(logout, {data, called}) => {
                        return (<button onClick={logout}>LogOut</button>);
                    }}
                </Mutation>

            </div>

        );
    }
}

export default CartSummary;
