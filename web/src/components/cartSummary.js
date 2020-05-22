import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {Container, ListGroup} from 'react-bootstrap';
import {Mutation} from "react-apollo";
import NumberFormat from 'react-number-format';

const UPDATE_ITEMS_MUTATION = gql`
    mutation updateItemsMutation($items: [ItemInput]!) {
        updateItems (items: $items)
    }`;

class CartSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    createSimpleSummary = () => {
        let numberOfSelectedItems = 0;
        let totalPrice = 0;
        for(let i = 0; i < this.props.iteminfo.length; i++) {
            numberOfSelectedItems += this.props.iteminfo[i].select;
            totalPrice += (this.props.iteminfo[i].price * this.props.iteminfo[i].select);
        }
        return [numberOfSelectedItems, totalPrice];
    }

    createItemList = () => {
        const Items = [];
        for(let i = 0; i < this.props.iteminfo.length; i++) {
            let name = this.props.iteminfo[i].name;
            let select = this.props.iteminfo[i].select;
            let total_price = this.props.iteminfo[i].price * select;
            if(select !== 0)
                Items.push(
                    <ListGroup.Item>{name} x {select}개 = {total_price}원</ListGroup.Item>
                );
        }
        return Items;
    }

    createMutationItemList = () => {
        const Items = [];
        for(let i = 0; i < this.props.iteminfo.length; i++) {
            let name = this.props.iteminfo[i].name;
            let select = this.props.iteminfo[i].select;
            Items.push({
                name: name,
                select: select,
            })
        }
        return Items;
    }

    render() {
        const simpleSummary = this.createSimpleSummary();
        return (
            <Container>
                <ListGroup>
                    <this.createItemList />
                </ListGroup>
                
                <br />
                <div>
                    총 {simpleSummary[0]}개 제품 선택 됨
                    <br /><br />
                    <NumberFormat value={simpleSummary[1]} displayType={'text'} thousandSeparator={true} prefix={'₩'} />
                </div>

                <Mutation
                    mutation={UPDATE_ITEMS_MUTATION}
                    variables={{items: this.createMutationItemList()}}
                >
                    {(updateMutation, {data, called}) => {
                            return (<button onClick={updateMutation}>저장</button>);
                        }
                    }
                </Mutation>
            </Container>
        );
    }
}

export default CartSummary;
