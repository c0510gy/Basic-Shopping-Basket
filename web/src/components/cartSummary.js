import React, {Component} from 'react';
import NumberFormat from 'react-number-format';
import {Button} from "react-bootstrap";
import {Mutation} from "react-apollo";
import {gql} from 'apollo-boost';

const SET_ITEMS_MUTATION = gql`
    mutation updateMutation($selectedInfo: [Int]!){
        setItems(selectedInfo: $selectedInfo)
    }`;

class CartSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    receipt = () => {
        const arr = [];
        for(let i=0;i<this.props.selected.length;i++){
            if(!this.props.selected[i]) continue;
            arr.push(this.props.itemsInfo[i].name);
            arr.push(" X ");
            arr.push(this.props.selected[i]);
            arr.push("개 = ");
            arr.push(<NumberFormat value={this.props.selected[i] * this.props.itemsInfo[i].price}
                                   displayType={'text'} thousandSeparator={true} />);
            arr.push("원");
            arr.push(<br/>);
        }
        return arr;
    }

    render() {
        return (
            <div>
                {this.receipt()}
                <br />
                합계: <NumberFormat value={this.props.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'₩'} /> 원
                <br /><br />
                <Mutation mutation={SET_ITEMS_MUTATION} variables={{selectedInfo: this.props.selected}}>
                    {(setItems, {data, called}) => {
                        return (<Button variant={'primary'} onClick={setItems}>{'Save!!'}</Button>);
                    }}
                </Mutation>
            </div>
        );
    }
}

export default CartSummary;
