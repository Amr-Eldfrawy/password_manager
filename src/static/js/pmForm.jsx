import React from "react";
import {

    Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';

export default class PMForm extends React.Component {

    constructor(props) {
        super(props);
        this.usernameValue = null
        this.passwordValue = null

        this.state = {
            validUserName: true,
            validPassword: true,
        }
        this.login = this.login.bind(this);
    }

    async login() {
        if (this.usernameValue && this.passwordValue &&
            this.state.validUserName && this.state.validPassword) {
            this.props.authFn(this.usernameValue, this.passwordValue);
        } else {
            alert("please enter valid username and password")
        }
    }


    validateUserName(e) {
        const userName = e.target.value;

        if (!userName || userName.length == 0 || userName.length < 5) {
            this.setState({ validUserName: false });
            return
        }

        // should only contains alphanumeric characters
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        this.setState({ validUserName: usernameRegex.test(userName) });
        this.usernameValue = userName;
    }

    validatePassword(e) {
        const password = e.target.value;

        if (!password || password.length == 0) {
            this.setState({ validPassword: false });
        }

        // https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
        // The string must contain at least 1 numeric character, 1 uppercase character, one special character
        // , alphabetical character and eight characters or longer
        const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        this.setState({ validPassword: passwordRegex.test(password) });

        this.passwordValue = password;
    }

    render() {
        return (
            <Form className="Form">
                {this.props.header}
                <Col>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input
                            type="email"
                            id="userNameInput"
                            placeholder="my user name"
                            onChange={e => {
                                this.validateUserName(e)
                            }}
                            invalid={!this.state.validUserName}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                            type="password"
                            id="passwordInput"
                            placeholder="my password"
                            onChange={e => {
                                this.validatePassword(e)
                            }}
                            invalid={!this.state.validPassword}
                        />
                    </FormGroup>
                </Col>
                <Button onClick={this.login}>Submit</Button>
            </Form>
        );
    }
}