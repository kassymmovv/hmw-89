import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {registerUser} from "../../store/userActions";
import {connect} from "react-redux";
import FormElement from "../../component/FormElement/FormElement";

class Register extends Component {
    state = {
        username: '',
        password: '',
        displayName:'',
        image:''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            let value = this.state[key];

            formData.append(key, value);
        });
        this.props.registerUser(formData);
    };
    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };
    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    render() {
        return (
            <>
                <h2>Register new user</h2>
                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName="username"
                        title="Username"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('username')}
                        placeholder="Enter username"
                        autoComplete="new-username"
                    />
                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('password')}
                        placeholder="Enter password"
                        autoComplete="new-password"
                    />
                    <FormElement
                        propertyName="displayName"
                        title="Display Name"
                        value={this.state.displayName}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('displayName')}
                        placeholder="Enter Display Name"
                        autoComplete="new-displayName"
                    />

                    <FormElement
                        type="file"
                        propertyName="image"
                        title="Avatar"
                        onChange={this.fileChangeHandler}
                    />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button type="submit" color="primary">
                                Register
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.registerError,
    loading: state.users.registerLoading,
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);