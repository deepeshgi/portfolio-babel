import React, {Component} from 'react';

class Tracks extends Component {

    state = {playing: false, audio: null, playingUrl: null}
    playAudio = previewUrl =>  () => {
        
        const audio = new Audio(previewUrl);
        if(!this.state.playing) {
            audio.play();
            this.setState({playing: true, audio, playingUrl: previewUrl})
        } else {

            this.state.audio.pause();
            if(previewUrl === this.state.playingUrl) {
                
                this.setState({playing: false}); 
            }else {
                audio.play();
                this.setState({audio, playingUrl: previewUrl});
            }            
        }        
    }
    trackIcon = track => {

        if(!track.preview_url) {
            return <span>N/A</span>
        }
        if(this.state.playing && this.state.playingUrl === track.preview_url) {
            return (<span>| |</span>);
        } 
        return (
            <span>&#9654;</span>
        );
    }

    render() {
        const {tracks} = this.props;

        if(!tracks) return null;
        
        return (
            <div>
                {
                    tracks.map( track => {
                        const {id, name, album, preview_url} = track;
                        return (
                            <div key={id} onClick={this.playAudio(preview_url)}
                            className='track'>
                                <img src={album.images && album.images[0].url} alt='track-pic'
                                className='track-image'/>
                                <p className='track-text'>{name.substring(0, 10)} {name.length > 10 ? '...': null}</p>
                                <p className='track-icon'>{this.trackIcon(track)}</p>
                            </div>             
                        );
                    })
                }
            </div>
        )
        
    }
}

export default Tracks;