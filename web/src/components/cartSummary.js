import React, {Component} from 'react';
import NumberFormat from 'react-number-format';

class CartSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div>
                총 {this.props.numberOfSelectedItems}개 제품 선택 됨
                {this.items}
                <br /><br />
                <NumberFormat value={this.props.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'₩'} />
            </div>
        );
    }
}

export default CartSummary;
