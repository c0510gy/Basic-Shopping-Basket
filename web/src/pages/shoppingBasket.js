import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ItemList from '../components/itemList';
import CartSummary from '../components/cartSummary'

class ShoppingBasket extends Component {
    constructor(props) {
        super(props);

        const name = [];
        const selected = [];
        const price = [];

        this.state = {
            name: name,
            selected: selected,
            price: price,
        };
    }

    addItem = id => {
        const selected = [];
        for(let i=0; i<this.state.selected.length; i++){
            selected.push(this.countById("selected", i) + (i==id?1:0));
        }
        this.setState({
            selected: selected,
        });
    }

    removeItem = id => {
        const selected = [];
        for(let i=0; i<this.state.selected.length; i++){
            selected.push(this.countById("selected", i) - (i==id?1:0));
        }
        this.setState({
            selected: selected,
        });
    }

    countById = (search, id) => {
        if(search == "name"){
            return this.state.name[id];
        } else if(search == "selected"){
            return this.state.selected[id];
        } else {
            return this.state.price[id];
        }
    }

    setItemData = (name, selected, price) => {
        this.setState({
            name: name,
            selected: selected,
            price: price,
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
                                      setItemData={this.setItemData}/>
                        </div>
                        <div style={{flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'}}>
                            <CartSummary countById={this.countById}
                                         itemsLength={this.state.selected.length}/>
                        </div>
                    </div>
                </Row>
            </Container>

        );
    }
}

export default ShoppingBasket;
