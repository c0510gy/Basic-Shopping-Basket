import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {Query} from "react-apollo";
import {Container, Row, Col, Card, Button, InputGroup, FormControl} from 'react-bootstrap';
import {getCurrencyRate} from 'currencies-exchange-rates';
import NumberFormat from "react-number-format";

const GET_ITEMS_QUERY = gql`
    query {
        getItems{
            name,
            price,
            imgUrl,
            select,
        }
    }`;

class ItemList extends Component {
    constructor(props) {
        super(props);

        const items = [];
        const currency = [];

        this.state = {
            items: items,
            currency: currency,
        };

        this.rate = 0.001;
    }

    itemPlus = event => {
        const idx = event.target.getAttribute('id');
        this.props.addItems(idx, this.state.items[idx].price);
    }

    itemMinus = event => {
        const idx = event.target.getAttribute('id');
        this.props.removeItem(idx, this.state.items[idx].price);
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
                            
                            <InputGroup>
                                <InputGroup.Append>
                                    <Button id={i} onClick={this.itemMinus} disabled={!this.props.returnSelectedByIdx(i)} variant='secondary'>-</Button>
                                </InputGroup.Append>
                                
                                <FormControl readOnly id={i}
                                   value={this.props.returnSelectedByIdx(i) + "개"}
                                />

                                <InputGroup.Append>
                                    <Button id={i} onClick={this.itemPlus} variant='primary'>+</Button>
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
                           const itemName = [];
                           const itemPrice = [];
                           const selected = [];
                           const currency = [];
                           
                           for(let i = 0; i < data.getItems.length; i++) {
                               itemName.push(data.getItems[i].name);
                               itemPrice.push(data.getItems[i].price);
                               selected.push(data.getItems[i].select);
                               currency.push(false);
                           }

                           this.props.initItemArr(itemName, itemPrice, selected);
                    
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