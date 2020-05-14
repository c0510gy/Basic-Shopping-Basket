import React, {Component} from 'react';
import {Container, Row} from 'react-bootstrap';

import ItemList from '../components/itemList';
import CartSummary from '../components/cartSummary'

class ShoppingBasket extends Component {
    constructor(props) {
        super(props);

        const selected = [];
        const itemName = [];
        const itemPrice = [];

        this.state = {
            numberOfSelectedItems: 0,
            totalPrice: 0,
            selected: selected,
            itemName: itemName,
            itemPrice: itemPrice,
        };
    }

    addInfo = (idx, name, price) => {
        let itemName2 = [...this.state.itemName];
        let itemPrice2 = [...this.state.itemPrice];
        itemName2[idx] = name;
        itemPrice2[idx] = price;
        this.setState({
            itemName: itemName2,
            itemPrice: itemPrice2,
        });
    }

    addItem = (idx, price) => {
        let selected2 = [...this.state.selected];
        selected2[idx]++;
        this.setState({
            numberOfSelectedItems: this.state.numberOfSelectedItems + 1,
            totalPrice: this.state.totalPrice + price,
            selected: selected2,
        });
    }

    removeItem = (idx, price) => {
        let selected2 = [...this.state.selected];
        selected2[idx]--;
        this.setState({
            numberOfSelectedItems: this.state.numberOfSelectedItems - 1,
            totalPrice: this.state.totalPrice - price,
            selected: selected2,
        });
        
    }

    returnStatusByIdx = (idx) => {
        return this.state.selected[idx];
    }

    returnItemNameByIdx = (idx) => {
        return this.state.itemName[idx];
    }

    returnItemPriceByIdx = (idx) => {
        return this.state.itemPrice[idx];
    }

    initSelected = selected0 => {
        this.setState({
            selected: selected0,
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
                                      addInfo={this.addInfo}
                                      returnStatusByIdx={this.returnStatusByIdx}
                                      initSelected={this.initSelected}/>
                        </div>
                        <div style={{flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'}}>
                            <CartSummary numberOfSelectedItems={this.state.numberOfSelectedItems}
                                         totalPrice={this.state.totalPrice}
                                         selected={this.state.selected}
                                         returnStatusByIdx={this.returnStatusByIdx}
                                         returnItemNameByIdx={this.returnItemNameByIdx}
                                         returnItemPriceByIdx={this.returnItemPriceByIdx}/>
                        </div>
                    </div>
                </Row>
            </Container>

        );
    }
}

export default ShoppingBasket;
