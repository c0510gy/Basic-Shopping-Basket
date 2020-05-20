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
            ItemInfo: [],
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

    updateInfo = (items, selected) => {
        let newInfo = [];
        for(let i = 0; i < items.length; i++) {
            newInfo.push({
                name: items[i].name,
                price: items[i].price,
                select: selected[i],
            });
        }
        this.setState({
            ItemInfo: newInfo,
        });
        console.log("updateInfo: " + items, selected, this.state.ItemInfo);
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
                                      removeItem={this.removeItem}
                                      updateInfo={this.updateInfo}/>
                        </div>
                        <div style={{flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            overflowY: 'scroll'}}>
                            <CartSummary numberOfSelectedItems={this.state.numberOfSelectedItems}
                                         totalPrice={this.state.totalPrice} iteminfo={this.state.ItemInfo}/>
                        </div>
                    </div>
                </Row>
            </Container>

        );
    }
}

export default ShoppingBasket;
