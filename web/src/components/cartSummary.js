import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {Mutation} from "react-apollo";
import {useMutation} from "react-apollo-hooks"
import NumberFormat from 'react-number-format';
import {Button} from "react-bootstrap";

const SET_ITEMS_MUTATION = gql`
    mutation updateMutation($selected: [Int!]!){
        updateSelected(selected: $selected)
    }`;

class CartSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    receipt = function() {
        const arr = []
        for(let i=0;i<this.props.itemsLength;i++){
            if(!this.props.countById("selected", i)) continue;
            arr.push(this.props.countById("name", i));
            arr.push(" X ");
            arr.push(this.props.countById("selected", i));
            arr.push("개 = ")
            arr.push(<NumberFormat value={this.props.countById("selected", i) * this.props.countById("price", i)}
                                   displayType={'text'} thousandSeparator={true} />);
            arr.push("원");
            arr.push(<br/>);
        }
        return arr
    }

    getSelected = function() {
        const arr = [];
        for(let i=0; i<this.props.itemsLength; i++){
            arr.push(this.props.countById("selected", i));
        }
        return arr;
    }

    getTotalPrice = function() {
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
                <Mutation mutation={SET_ITEMS_MUTATION} variables={{selected: this.getSelected()}}>
                    {updateSelected => (
                        <button onClick={
                            updateSelected
                        }>
                            Save!!
                        </button>
                    )}
                </Mutation>
            </div>

        );
    }
}

export default CartSummary;
