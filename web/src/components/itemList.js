import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {Query} from "react-apollo";
import {Container, Row, Col, Card, Button, InputGroup, Form} from 'react-bootstrap';
import {getCurrencyRate} from 'currencies-exchange-rates';
import NumberFormat from "react-number-format";

const GET_ITEMS_QUERY = gql`
    query {
        getItems{
            name,
            price,
            imgUrl
        }
    }`;

class ItemList extends Component {
    constructor(props) {
        super(props);

        const items = [];
        const amount = [];
        const currency = [];
        this.state = {
            items: items,
            currency: currency,
        };
        this.amount = amount;
        this.rate = 0.001;
    }

    itemAdd = event => {
        const idx = event.target.getAttribute('id');
        let amt = parseInt(this.amount[idx].value);
        if(isNaN(amt)) alert("개수는 숫자로 입력하세요")
        else if(amt <= 0) alert("최소 1개 이상 담아야 합니다")
        else this.props.addItems(this.state.items[idx].price, amt, idx);
    }

    itemRemove = event => {
        const idx = event.target.getAttribute('id');
        let amt = parseInt(this.amount[idx].value);
        if(isNaN(amt)) alert("개수는 숫자로 입력하세요")
        else if(amt <= 0) alert("최소 1개 이상 빼야 합니다")
        else this.props.removeItem(this.state.items[idx].price, amt, idx);
    }

    currencyConvert = async event => {
        const idx = event.target.getAttribute('id');
        const newCurrency = [];
        for(let i = 0; i < this.state.currency.length; i++)
            newCurrency.push(this.state.currency[i]);
        newCurrency[idx] = !newCurrency[idx];
        this.setState({
            currency: newCurrency,
        });
        this.rate = (await getCurrencyRate('KRW', 'USD')).rates.USD;
    }

    itemCard = () => {
        const cards = [];
        for(let i = 0; i < this.state.items.length; i++){
            cards.push(<Col sm={6}>
                <Card style={{ marginBottom: '10px' }}>
                    <Card.Img variant="top" src={this.state.items[i].imgUrl} style={{width: '100%', height: '20vw', objectFit: 'cover'}} />
                <Card.Body>
                    <Card.Title>{this.state.items[i].name}</Card.Title>
                    <Card.Text>
                        <NumberFormat value={this.state.items[i].price * (this.state.currency[i] ? this.rate : 1)} displayType={'text'} thousandSeparator={true} prefix={this.state.currency[i] ? '$' : '₩'} />
                        <br />
                        <Button variant="link" style={{padding: '0'}} id={i} onClick={this.currencyConvert}>{this.state.currency[i] ? 'Convert To KRW' : 'Convert To USD'}</Button>
                    </Card.Text>
                    <InputGroup className="mb-3">
                        {/* <Form.FormControl
                            placeholder="Recipient's username"
                        /> */}
                        <Form.Control type="number" id={i} placeholder="개수 입력" ref={(ref) => { this.amount[i] = ref; }}/>
                        <InputGroup.Append>
                            <Button variant="primary" id={i} onClick={this.itemAdd}>담기</Button>
                            <Button variant="secondary" id={i} onClick={this.itemRemove}>빼기</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Card.Body>
                </Card>
            </Col>
            );
        }
        console.log(cards);
        return cards;
    }

    render() {
        return (
            <div>
                <Query query={GET_ITEMS_QUERY}
                       onCompleted={data => {
                           const selected = [];
                           const currency = [];
                           for(let i = 0; i < data.getItems.length; i++) {
                               selected.push(false);
                               currency.push(false);
                           }
                           this.selected = selected;
                           this.setState({
                               items: data.getItems,
                               currency: currency,
                           });
                       }}>
                    {({loading, error, data}) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;
                        return <div/> ;
                    }}
                </Query>
                <Container>
                    <Row>
                        <this.itemCard />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ItemList;
