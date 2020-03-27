import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getAlb} from "../../store/albumAction";
import {postTrack} from "../../store/trackAction";
import TrackForm from "../AddTrackForm/AddTrackForm";

class NewProduct extends Component {
    componentDidMount() {
        this.props.getAlbums();
    }

    createProduct = async (productData) => {
        await this.props.postTrack(productData);
        this.props.history.push('/');
    };

    render() {
        return (
            <Fragment>
                <h2>New product</h2>
                <TrackForm
                    onSubmit={this.createProduct}
                    album={this.props.albums}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    albums: state.albums.albums
});

const mapDispatchToProps = dispatch => ({
    postTrack: productData => dispatch(postTrack(productData)),
    getAlbums: () => dispatch(getAlb())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);