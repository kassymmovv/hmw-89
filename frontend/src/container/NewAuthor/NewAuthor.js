import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getAuthors, postAuthor} from "../../store/authorActions";
import AuthorForm from "../AddAuthorForm/AddAuthorForm";

class NewAuthor extends Component {


    createProduct = async (productData) => {
        await this.props.postAuthor(productData);
        this.props.history.push('/');
    };

    render() {
        return (
            <Fragment>
                <h2>New product</h2>
                <AuthorForm
                    onSubmit={this.createProduct}
                />
            </Fragment>
        );
    }
}



const mapDispatchToProps = dispatch => ({
    postAuthor: productData => dispatch(postAuthor(productData)),
});

export default connect(null, mapDispatchToProps)(NewAuthor);