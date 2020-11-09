import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
// console.log(this.password);
    }

    notify = (msg) => toast(msg);

    handleClick(event) {
        // this.props.history.push("/home");

        var apiBaseUrl = "http://localhost:8080/";


        var self = this;
        var payload = {
            "userName": this.state.username,
            "password": this.state.password
        }


        axios.post(apiBaseUrl + 'login', payload)
            .then(function (response) {
                console.log(response);
                if (response.data.code === "OK") {
                    console.log("Login successfull");
                    // alert("Login successfull");
                    localStorage.setItem('key', response.data.accessToken);

                    this.props.history.push("/home");

                }
                else if (response.data.code === 204) {
                    this.notify('Username password do not match');

                    console.log("Username password do not match");
                    alert("username password do not match")
                }
                else {
                    this.notify('Username does not exists');

                    console.log("Username does not exists");
                    alert("Username does not exist");
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
                    <div>
                        <AppBar
                            title="POC - Rainyday Grocer"
                        />
                        <div className="App-header">
                            <Card className="card-cstm">
                                <h3>Login</h3>
                                <TextField
                                    hintText="Enter your Username"
                                    floatingLabelText="Username"
                                    onChange={(event, newValue) => this.setState({ username: newValue })}
                                />
                                <br />
                                <TextField
                                    type="password"
                                    hintText="Enter your Password"
                                    floatingLabelText="Password"
                                    onChange={(event, newValue) => this.setState({ password: newValue })}
                                />
                                <br />
                                <RaisedButton label="Login" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                            </Card>
                            {/* <Link to="/register">Go To Register</Link> */}
                            {/* <button onClick={this.notify}>Notify !</button> */}
                            <ToastContainer />

                        </div>
                    </div>

                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default Login;

