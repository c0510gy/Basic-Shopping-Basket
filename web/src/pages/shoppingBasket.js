import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import ItemList from '../components/itemList';
import CartSummary from '../components/cartSummary'

class ShoppingBasket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountOfItems: [],
            sumOfAmounts: 0,
            totalPrice: 0,
        };
    }

    addItem = (price, amount, idx) => {
        let amountOfItems = this.state.amountOfItems
        let sumOfAmounts = this.state.sumOfAmounts
        let totalPrice = this.state.totalPrice
        if(isNaN(parseInt(amountOfItems[idx]))) amountOfItems[idx] = 0
        amountOfItems[idx] += amount
        sumOfAmounts += amount
        totalPrice += amount * price
        this.setState({
            amountOfItems: amountOfItems,
            sumOfAmounts: sumOfAmounts,
            totalPrice: totalPrice,
        });
    }

    removeItem = (price, amount, idx) => {
        let amountOfItems = this.state.amountOfItems
        let sumOfAmounts = this.state.sumOfAmounts
        let totalPrice = this.state.totalPrice
        if(isNaN(parseInt(amountOfItems[idx]))) amountOfItems[idx] = 0
        const real_amount = Math.min(amountOfItems[idx], amount)
        amountOfItems[idx] -= real_amount
        sumOfAmounts -= real_amount
        totalPrice -= real_amount * price
        this.setState({
            amountOfItems: amountOfItems,
            sumOfAmounts: sumOfAmounts,
            totalPrice: totalPrice,
        });
    }

    render() {
        return (
            <Container>
                <br />
                <Row className="justify-content-md-center">
                    <div style={{display: 'flex',
                        flexDirection: 'row',
                        height: '100vh'}}>
                        <div style={{width: '80%', overflowY: 'scroll'}}>
                            <ItemList addItems={this.addItem}
                                      removeItem={this.removeItem}/>
                        </div>
                        <div style={{flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'}}>
                            <CartSummary numberOfSelectedItems={this.state.sumOfAmounts}
                                         totalPrice={this.state.totalPrice}/>
                        </div>
                    </div>
                </Row>
            </Container>

        );
    }
}

export default ShoppingBasket;
