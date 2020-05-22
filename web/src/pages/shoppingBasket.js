import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import ItemList from '../components/itemList';
import CartSummary from '../components/cartSummary'

class ShoppingBasket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ItemInfo: [],
        };
    }

    updateInfo = (items, selected) => {
        const newInfo = [];
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
                            <ItemList updateInfo={this.updateInfo}/>
                        </div>
                        <div style={{flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            overflowY: 'scroll'}}>
                            <CartSummary iteminfo={this.state.ItemInfo}/>
                        </div>
                    </div>
                </Row>
            </Container>

        );
    }
}

export default ShoppingBasket;
