import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {Query} from "react-apollo";
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
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
        const currency = [];
        this.state = {
            items: items,
            currency: currency,
        };
        this.rate = 0.001;
    }

    addItemClicked = event => {
        const idx = event.target.getAttribute('id');
        this.props.addItems(idx, this.state.items[idx].price);
    }

    removeItemClicked = event => {
        const idx = event.target.getAttribute('id');
        this.props.removeItem(idx, this.state.items[idx].price);
    }

    setItemClicked = event => {
        const idx = event.target.getAttribute('id');
        this.props.setSelectedElement(idx, this.state.items[idx].price);
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
                        <br />
                        개수: {this.props.getSelectedElement(i)}
                        <Button id={i} onClick={this.setItemClicked}>{'setValue'}</Button>
                    </Card.Text>
                    <Button variant={'primary'} id={i} onClick={this.addItemClicked}>{'Add to cart'}</Button>
                    <Button variant={'secondary'} id={i} onClick={this.removeItemClicked}>{'Remove from cart'}</Button>
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
                               selected.push(0);
                               currency.push(false);
                           }
                           this.props.initSelected(selected);
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
