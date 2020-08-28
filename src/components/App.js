import React, {Component} from 'react';
import Artist from './Artist';
import Tracks from './Tracks';
import Search from './Search';

class App extends Component {
    
    state = {artist: null, tracks: null};

    componentDidMount() {

        this.searchArtist('green day');
    }
    
    searchArtist =(artistQuery)=> {

        fetch(`https://spotify-api-wrapper.appspot.com/artist/${artistQuery}`)
        .then(response => response.json())
        .then(json => {
            console.log('spotify json: ', json);
            if(json.artists.total > 0) {
                const artist = json.artists.items[0];
                this.setState({artist: artist});

                fetch(`https://spotify-api-wrapper.appspot.com/artist/${artist.id}/top-tracks`)
                .then(response => response.json())
                .then(json => {
                    console.log('top track', json)
                    this.setState({tracks: json.tracks});
                }).catch(error => alert(error.message));
            }
        })
        .catch(error => alert(error.message));;        
    }


    render() {
        console.log('this.state', this.state);
        return (
            <div>
                <h2>Music Master</h2>

                <Search searchArtist={this.searchArtist}/>
                
                <Artist artist={this.state.artist}/>

                <Tracks tracks={this.state.tracks}/>
            </div>
        )
    }
}

export default App;