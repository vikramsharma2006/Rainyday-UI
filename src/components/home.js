import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from 'material-ui/Card';
import axios from 'axios';
import '../App.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: {
                "products": [
                    {
                        "id": "1",
                        "name": "coffee",
                        "companyName": "Company1",
                        "currentPrice": 100,
                        "category": "beverage"
                    },
                    {
                        "id": "2",
                        "name": "tea",
                        "companyName": "Company2",
                        "currentPrice": 200,
                        "category": "beverage"
                    },
                    {
                        "id": "3",
                        "name": "Baking cake",
                        "companyName": "Company3",
                        "currentPrice": 200,
                        "category": "dairy"
                    },
                    {
                        "id": "4",
                        "name": "Fresh strawberry",
                        "companyName": "Company4",
                        "currentPrice": 210,
                        "category": "fruit"
                    },
                    {
                        "id": "5",
                        "name": "Homemade bread",
                        "companyName": "Company5",
                        "currentPrice": 150,
                        "category": "bakery"
                    },
                    {
                        "id": "6",
                        "name": "Oranges",
                        "companyName": "Company6",
                        "currentPrice": 50,
                        "category": "fruit"
                    },
                    {
                        "id": "7",
                        "name": "Honey",
                        "companyName": "Company7",
                        "currentPrice": 50,
                        "category": "bakery"
                    },
                    {
                        "id": "8",
                        "name": "Yogurt",
                        "companyName": "Company8",
                        "currentPrice": 20,
                        "category": "dairy"
                    },
                    {
                        "id": "9",
                        "name": "Corn",
                        "companyName": "Company9",
                        "currentPrice": 20,
                        "category": "vegetable"
                    },
                    {
                        "id": "10",
                        "name": "Tomatoes",
                        "companyName": "Company10",
                        "currentPrice": 20,
                        "category": "vegetable"
                    }
                ]
            },
            selectedProd: {
                "products":[
                ]
            },
            mycheck:'',

        };
        // this.makeOrder = this.makeOrder.bind(this)
    }

    notify = (msg) => toast(msg);

    componentDidMount() {
        var apiBaseUrl = "http://localhost:8080/";
        var config = {
            headers: { "Authorization": "abc123abc123" }
        };
        axios.get(apiBaseUrl + 'products', config).then(res => {

            if (res.data.code === "OK") {
                this.setState({productData: res.data});
            }
            else {
                this.notify('API failed');
            }
        });

    }

    addProduct = (prod) => {
        const newProduct = { id: ''};
        newProduct['id'] = prod.id;
        this.state.selectedProd.products.push(newProduct);

        console.log(this.state.selectedProd);

    }

    makeOrder = () => {

        var apiBaseUrl = "http://localhost:8080/";
        const config = {
            headers: { "Authorization": "abc123abc123" }
        };

        axios.post(apiBaseUrl + 'order', this.state.selectedProd, config)
            .then( (response)=> {
                console.log(response);
                if (response.data.code === "OK") {
                    this.notify('Order Received');
                }
                else {
                    this.notify('Order Failed');
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div className="App-header">
                        <ToastContainer />

                        <h4 className="">
                            Product List:
                    </h4>
                        <div className="margun-cstm">
                            {this.state.productData.products.map(product => (
                                <span className='fixCard'>
                                    <Card className='cstm-list'>
                                        <span className="title-cstm">Name: </span>  <span>{product.name}</span>
                                        <br />
                                        <span className="title-cstm">Company: </span>  <span>{product.companyName}</span>
                                        <br />
                                        <span className="title-cstm">Price: </span>  <span>{product.currentPrice}</span>
                                        <br />
                                        <span className="title-cstm">Category: </span>  <span>{product.category}</span>
                                        <br />
                                        <div>
                                            <button className="add-cstm" onClick={() => this.addProduct(product)}>Add Product</button>
                                        </div>
                                    </Card>

                                </span>

                            ))}
                        </div>
                        <button className="create-btn" onClick={this.makeOrder}>Create Order</button>
                    </div>

                </MuiThemeProvider>
            </div>
        );
    }
}

export default Home;