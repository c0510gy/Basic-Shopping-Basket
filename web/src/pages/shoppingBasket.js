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

    addItem = (idx, price) => {
        const selected = [];
        for(let i=0; i<this.state.selected.length; i++){
            selected.push(this.state.selected[i] + (i==idx?1:0));
        }
        this.setState({
            selected: selected,
            numberOfSelectedItems: this.state.numberOfSelectedItems + 1,
            totalPrice: this.state.totalPrice + price,
        });
    }

    removeItem = (idx, price) => {

        if(this.state.selected[idx]==0){
            alert("물건을 -1개로 만드는게 가능하군요? 정말 대다네~");
            return;
        }

        const selected = [];
        for(let i=0; i<this.state.selected.length; i++){
            selected.push(this.state.selected[i] - (i==idx?1:0));
        }
        this.setState({
            selected: selected,
            numberOfSelectedItems: this.state.numberOfSelectedItems - 1,
            totalPrice: this.state.totalPrice - price,
        });
    }

    initSelected = selected => {
        this.setState({
           selected: selected,
        });
    }

    getSelectedElement = idx => {
        return this.state.selected[idx];
    }

    setSelectedElement = (idx, price) => {
        const userInput = prompt("몇 개를 장바구니에 담을 것인지 선택하십쇼");
        const count = parseInt(userInput);

        if(isNaN(count)){
            alert("숫자를 입력해주세요!!");
            return;
        }

        if(count < 0){
            alert("0 아래로 안덴다고요;;");
            return;
        }

        const diff = count - this.state.selected[idx];

        const selected = [];
        for(let i=0; i<this.state.selected.length; i++){
            selected.push(i==idx?count:this.state.selected[i]);
        }
        this.setState({
            selected: selected,
            numberOfSelectedItems: this.state.numberOfSelectedItems + diff,
            totalPrice: this.state.totalPrice + price * diff,
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
                                      initSelected={this.initSelected}
                                      getSelectedElement={this.getSelectedElement}
                                      setSelectedElement={this.setSelectedElement}/>
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
