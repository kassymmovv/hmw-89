import React, {Component} from 'react';
import {connect} from 'react-redux';

import Card from "reactstrap/es/Card";
import {deleteTrack, getTracks, publishTrack} from "../store/trackAction";
import {postTrackHis} from "../store/action";

class MainPage extends Component {
    componentDidMount() {
        this.props.getTracks(this.props.match.params.id);
        if (this.props.user === null){
            this.props.history.push('/login')
        }
    }

    render() {

        return (
            <>
                {this.props.tracks.map(k => (
                    <Card key={k._id}>

                        <span>название:{k.title}</span>
                        <span>продолжительность:{k.duration}</span>
                        <button onClick={() => this.props.postTrackHis({track:k._id})}>Слушать</button>
                        <button onClick={() => {this.props.deleteTrack(k._id)}}>delete</button>
                        {(k.publish === false ? <button onClick={() => {this.props.publishTrack(k._id)}}>publish</button>:null)}
                    </Card>
                ))}

            </>
        );
    }
}
const mapStateToProps = state => ({
    tracks:state.tracks.tracks,
    loading: state.loading,
    error:state.error,
    user:state.users.user

});
const mapDispatchToProps = dispatch => ({
   getTracks:id => dispatch(getTracks(id)),
   postTrackHis:id => dispatch(postTrackHis(id)),
    deleteTrack:id => dispatch(deleteTrack(id)),
    publishTrack:id => dispatch(publishTrack(id))
});

export default connect(mapStateToProps,mapDispatchToProps) (MainPage);