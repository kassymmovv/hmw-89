import React, {Component, Fragment} from 'react';

import {connect} from "react-redux";
import {getAuthors} from "../../store/authorActions";
import AlbumForm from "../AddAlbumForm/AddAlbumForm";
import {postAlbum} from "../../store/albumAction";

class NewProduct extends Component {
    componentDidMount() {
        this.props.getAuthors();
    }

    createProduct = async (productData) => {
        await this.props.postAlbum(productData);
        this.props.history.push('/');
    };

    render() {
        return (
            <Fragment>
                <h2>New product</h2>
                <AlbumForm
                    onSubmit={this.createProduct}
                    authors={this.props.authors}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    authors: state.authors.authors
});

const mapDispatchToProps = dispatch => ({
   postAlbum: productData => dispatch(postAlbum(productData)),
    getAuthors: () => dispatch(getAuthors())

});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);