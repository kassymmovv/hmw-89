import React, {Component} from 'react';

import {connect} from 'react-redux';
import Card from "reactstrap/es/Card";
import {getTrackHis} from "../../store/action";

class TrackHistory extends Component {
    componentDidMount() {
        if(!this.props.user){
            this.props.history.push('/login')
        }else {
            this.props.getTrackHis();
        }


    }

    render() {
        return (
            <div>
                {this.props.trackHis.map(k => (
                    <Card key={k._id}>

                        <span>Исполнитель:{k.track.album.author.name}</span>
                        <span>Название:{k.track.title}</span>
                        <span>Дата :{k.datetime}</span>
                    </Card>
                ))}
            </div>
        );
    }
}
const mapStateToProps = state => ({
   trackHis: state.tracksHis.trackHistory,
    user:state.users.user
});
const mapDispatchToProps = dispatch => ({
   getTrackHis: () => dispatch(getTrackHis())
});

export default connect(mapStateToProps,mapDispatchToProps) (TrackHistory);