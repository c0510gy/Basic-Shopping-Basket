import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import ItemList from '../components/itemList';
import CartSummary from '../components/cartSummary'

class ShoppingBasket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfSelectedItems: 0,
            totalPrice: 0,
        };
    }

    addItem = price => {
        this.setState({
            numberOfSelectedItems: this.state.numberOfSelectedItems + 1,
            totalPrice: this.state.totalPrice + price,
        });
    }

    removeItem = price => {
        this.setState({
            numberOfSelectedItems: this.state.numberOfSelectedItems - 1,
            totalPrice: this.state.totalPrice - price,
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
                            <CartSummary numberOfSelectedItems={this.state.numberOfSelectedItems}
                                         totalPrice={this.state.totalPrice}/>
                        </div>
                    </div>
                </Row>
            </Container>

        );
    }
}

export default ShoppingBasket;
