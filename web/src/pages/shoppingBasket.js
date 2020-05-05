import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import ItemList from '../components/itemList';
import CartSummary from '../components/cartSummary'

class ShoppingBasket extends Component {
    constructor(props) {
        super(props);

        const selected = [];

        this.state = {
            numberOfSelectedItems: 0,
            totalPrice: 0,
            selected: selected,
        };
    }

    addItem = (price, id) => {
        const selected = [];
        for(let i=0; i<this.state.selected.length; i++){
            selected.push(this.countById(i) + (i==id?1:0));
        }
        this.setState({
            numberOfSelectedItems: this.state.numberOfSelectedItems + 1,
            totalPrice: this.state.totalPrice + price,
            selected: selected,
        });
    }

    removeItem = (price, id) => {
        const selected = [];
        for(let i=0; i<this.state.selected.length; i++){
            selected.push(this.countById(i) - (i==id?1:0));
        }
        this.setState({
            numberOfSelectedItems: this.state.numberOfSelectedItems - 1,
            totalPrice: this.state.totalPrice - price,
            selected: selected,
        });
    }

    countById = id => {
        return this.state.selected[id];
    }

    setSelected = selected => {
        this.setState({
            selected: selected
        })
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
                                      countById={this.countById}
                                      setSelected={this.setSelected}/>
                        </div>
                        <div style={{flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'}}>
                            <CartSummary numberOfSelectedItems={this.state.numberOfSelectedItems}
                                         totalPrice={this.state.totalPrice}
                                         countById={this.countById}/>
                        </div>
                    </div>
                </Row>
            </Container>

        );
    }
}

export default ShoppingBasket;
