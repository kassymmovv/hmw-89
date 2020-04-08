import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getAlbs} from "../../store/albumAction";
import {postTrack} from "../../store/trackAction";
import TrackForm from "../AddTrackForm/AddTrackForm";
import {Button, Col,  FormGroup, Input, Label} from "reactstrap";

class NewTrack extends Component {
    state = {
        album: '',
        title: '',
        duration: '',


    };

    componentDidMount() {
        this.props.getAlbs();
    }

    createProduct = async (productData) => {
        console.log(productData);
        await this.props.postTrack(productData);
        this.props.history.push('/');
    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        return (
                <div>
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
                                {this.props.adminAlbs.map(a=> (
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
                            <button  color="primary" onClick={() => {this.props.postTrack(this.state)}}>Save</button>
                        </Col>
                    </FormGroup>
                </div>


        );
    }
}
const mapStateToProps = state => ({
    adminAlbs: state.albums.adminAlbs
});

const mapDispatchToProps = dispatch => ({
    postTrack: productData => dispatch(postTrack(productData)),
    getAlbs: () => dispatch(getAlbs())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTrack);