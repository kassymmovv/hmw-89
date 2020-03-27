import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class TrackForm extends Component {
    state = {
        album: '',
         title: '',
        duration: '',


    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            let value = this.state[key];

            if (key === 'description') {
                value = JSON.stringify(value);
            }

            formData.append(key, value);
        });

        this.props.onSubmit(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        return (
            <Form onSubmit={this.submitFormHandler}>
                <FormGroup row>
                    <Label sm={2} for="album">Album</Label>
                    <Col sm={10}>
                        <Input
                            type="select"
                            name="album" id="album"
                            value={this.state.album}
                            onChange={this.inputChangeHandler}
                        >
                            <option value="">Please select a category...</option>
                            {this.props.album.map(a=> (
                                <option key={a._id} value={a._id}>{a.name}</option>
                            ))}
                        </Input>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label sm={2} for="title">Title</Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="title" id="title"
                            placeholder="Enter product title"
                            value={this.state.title}
                            onChange={this.inputChangeHandler}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} for="duration">Duration</Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="duration" id="duration"
                            value={this.state.duration}
                            onChange={this.inputChangeHandler}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={{offset:2, size: 10}}>
                        <Button type="submit" color="primary">Save</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default TrackForm;