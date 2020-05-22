import React, {Component} from 'react';
import {Container, Row} from 'react-bootstrap';

import ItemList from '../components/itemList';
import CartSummary from '../components/cartSummary'

class ShoppingBasket extends Component {
    constructor(props) {
        super(props);

        const itemName = [];
        const itemPrice = [];
        const selected = [];

        this.state = {
            itemName: itemName,
            itemPrice: itemPrice,
            selected: selected,
        };
    }

    addItem = (idx) => {
        const newSelected = [...this.state.selected];
        newSelected[idx]++;
        this.setState({
            selected: newSelected,
        });
    }

    removeItem = (idx) => {
        const newSelected = [...this.state.selected];
        newSelected[idx]--;
        this.setState({
            selected: newSelected,
        });
    }

    returnItemNameByIdx = (idx) => {
        return this.state.itemName[idx];
    }

    returnItemPriceByIdx = (idx) => {
        return this.state.itemPrice[idx];
    }

    returnSelectedByIdx = (idx) => {
        return this.state.selected[idx];
    }

    initItemArr = (itemName, itemPrice, selected) => {
        this.setState({
            itemName: itemName,
            itemPrice: itemPrice,
            selected: selected,
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
                                      removeItem={this.removeItem}
                                      returnItemNameByIdx={this.returnItemNameByIdx}
                                      returnItemPriceByIdx={this.returnItemPriceByIdx}
                                      returnSelectedByIdx={this.returnSelectedByIdx}
                                      initItemArr={this.initItemArr}/>
                        </div>
                        <div style={{flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'}}>
                            <CartSummary returnSelectedByIdx={this.returnSelectedByIdx}
                                         returnItemNameByIdx={this.returnItemNameByIdx}
                                         returnItemPriceByIdx={this.returnItemPriceByIdx}
                                         returnArrLen={this.state.selected.length}/>
                        </div>
                    </div>
                </Row>
            </Container>

        );
    }
}

export default ShoppingBasket;
