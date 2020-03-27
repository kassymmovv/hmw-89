import React, {Component} from 'react';
import {connect} from "react-redux";
import Card from "reactstrap/es/Card";
import {deleteAlbum, getAlbums} from "../../store/albumAction";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";
class Albums extends Component {


    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getAlbums(id)
    }

    render() {
        return (
            this.props.albums && <div>
                {this.props.albums.map(k => (

                    <Card key={k._id}>
                        <img src={`http://localhost:8000/uploads/${k.image}`} alt="" style={{width:'200px',height:'200px'}}/>
                    <span>название:{k.name}</span>
                    <span>продолжительность:{k.date}</span>
                        <Link to={`/tracks/${k._id}`}><Button>tracks</Button></Link>
                        <button onClick={() => {this.props.deleteAlbum(k._id)}}>delete</button>
                    </Card>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    albums: state.albums.albums
});

const mapDispatchToProps = dispatch => ({
    getAlbums: id => dispatch(getAlbums(id)),
    deleteAlbum:id => dispatch(deleteAlbum(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);