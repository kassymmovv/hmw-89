import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAuthors} from "../../store/authorActions";
import Card from "reactstrap/es/Card";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";

class Artists extends Component {

    componentDidMount() {
        this.props.getAuthors();
    }

    render() {
        return (
            <div>
                <h2>
                    <Button
                        color="primary"
                        className="float-right"
                        tag={Link}
                        to={"/AddAuthor"}
                    >
                        Add Author
                    </Button>
                </h2>
                <h2>
                    <Button
                        color="primary"
                        className="float-right"
                        tag={Link}
                        to={"/AddAlbum"}
                    >
                        Add Album
                    </Button>
                </h2>
                <h2>
                    <Button
                        color="primary"
                        className="float-right"
                        tag={Link}
                        to={"/AddTrack"}
                    >
                        Add track
                    </Button>
                </h2>
                {this.props.authors.map(k => (
                    <Card key={k._id}>
                        <img src={`http://localhost:8000/uploads/${k.image}`} alt="" style={{width:'200px',height:'200px'}}/>
                        <span>название:{k.name}</span>
                        <span>{k.description}</span>
                        <Link to={`/albums/${k._id}`}><Button>Albums</Button></Link>

                    </Card>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authors: state.authors.authors
});

const mapDispatchToProps = dispatch => ({
    getAuthors: () => dispatch(getAuthors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Artists);