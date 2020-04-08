import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteAuthor, getAuthors, publishAuthor} from "../../store/authorActions";
import Card from "reactstrap/es/Card";
import {Button} from "reactstrap"
import {Link} from "react-router-dom";

class Artists extends Component {

    componentDidMount() {
        if (this.props.user ===null){
            this.props.history.push('/login')
        }
        this.props.getAuthors();

    }

    render() {
        console.log(this.props.user);
        return (
            <div>
                <div style={{display:'inline-block'}}>
                    <strong>
                        <Button
                            color="primary"
                            className="float-right"
                            tag={Link}
                            to={"/AddAuthor"}
                        >
                            Add Author
                        </Button>
                    </strong>

                    <strong>
                        <Button
                            color="primary"
                            className="float-right"
                            tag={Link}
                            to={"/AddAlbum"}
                        >
                            Add Album
                        </Button>
                    </strong>
                  <strong>

                  </strong>
                    <Button
                        color="primary"
                        className="float-right"
                        tag={Link}
                        to={"/AddTrack"}
                    >
                        Add track
                    </Button>

                </div>


                    {this.props.authors.map(k => (
                            <Card key={k._id}>
                                <img src={`http://localhost:8000/uploads/${k.image}`} alt="" style={{width:'200px',height:'200px'}}/>
                                <span>название:{k.name}</span>
                                <span>{k.description}</span>
                                <Link to={`/albums/${k._id}`}><Button>Albums</Button></Link>
                                <button onClick={() => {this.props.deleteAuthor(k._id)}}>delete</button>
                                {(k.publish === false ? <button onClick={() => {this.props.publishAuthor(k._id)}}>publish</button>:null)}

                            </Card>
                        ))}

            </div>
        );
    }
}

const mapStateToProps = state => ({
    authors: state.authors.authors,
    user:state.users.user
});

const mapDispatchToProps = dispatch => ({
    getAuthors: () => dispatch(getAuthors()),
    deleteAuthor:data => dispatch(deleteAuthor(data)),
    publishAuthor:id => dispatch(publishAuthor(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Artists);