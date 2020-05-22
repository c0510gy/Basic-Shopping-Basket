import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {Mutation} from "react-apollo";
import {ListGroup, Button} from 'react-bootstrap';
import NumberFormat from 'react-number-format';

const SET_SELECT_MUTATION = gql`
    mutation test($selected: [Int]!){
        postMutation(selected: $selected)
    }`;


class CartSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    itemCard = () => {
        const listItem = [];
        for(let i = 0; i < this.props.returnArrLen; i++){
            if(this.props.returnSelectedByIdx(i) !== 0){
                listItem.push(
                    <ListGroup.Item as="li">
                        {this.props.returnItemNameByIdx(i)}
                        {" "}
                        {this.props.returnSelectedByIdx(i)}개
                        {" "}
                        <NumberFormat value={this.props.returnItemPriceByIdx(i) * this.props.returnSelectedByIdx(i)} displayType={'text'} thousandSeparator={true} prefix={'₩'} />
                    </ListGroup.Item>
                    );
            }   
        }
        return listItem;
    }

    returnSelectedArr = () => {
        const tmpSelected = []
        for(let i = 0; i < this.props.returnArrLen; i++){
            tmpSelected.push(this.props.returnSelectedByIdx(i));
        }
        return tmpSelected;
    }

    returnSumItems = function() {
        const sumItems = [];
        let numberOfSelectedItems = 0;
        let totalPrice = 0;

        for(let i = 0; i < this.props.returnArrLen; i++){
            numberOfSelectedItems += this.props.returnSelectedByIdx(i);
            totalPrice += (this.props.returnItemPriceByIdx(i) * this.props.returnSelectedByIdx(i));
        }

        sumItems.push("총 ", numberOfSelectedItems  + "개 제품 선택 됨", <br></br>);
        sumItems.push(<NumberFormat value={totalPrice} displayType={'text'} thousandSeparator={true} prefix={'₩'} />);
        
        return sumItems;
    }


    render() {
        return (
            <div>
                <br></br>
                {this.returnSumItems()}
                <br></br>
                <br></br>
                <ListGroup as="ul">
                    <this.itemCard/>                
                </ListGroup>

                <Mutation mutation={SET_SELECT_MUTATION} variables={{selected: this.returnSelectedArr()}}>
                    {(postMutation, {data, called})=>  {
                        return <Button onClick={postMutation} size="lg" block>Save</Button>
                    }}
                </Mutation>
            </div>
        );
    }
}

export default CartSummary;
