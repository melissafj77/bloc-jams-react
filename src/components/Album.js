import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './styles/Album.css';
  class Album extends Component {
    constructor(props) {
      super(props);
      const album = albumData.find( album => {
        return album.slug === this.props.match.params.slug
      });

      this.state = {
        album: album,
        currentSong: album.songs[0],
        currentTime: 0,
        duration: album.songs[0].duration,
        volume: 0.5,
        songs:album.songs,
        isPlaying: false

      };
      this.audioElement = document.createElement('audio');
      this.audioElement.src = album.songs[0].audioSrc;
      }


    play(){
      this.audioElement.play()
      this.setState({isPlaying: true});
    }

    pause(){
      this.audioElement.pause()
      this.setState({isPlaying: false});
    } 

    setSong(song) {
      this.audioElement.src = song.audioSrc;
      this.setState({ currentSong: song });
    }
 
    handleSongClick(song) {
      const isSameSong = this.state.currentSong === song;
      if (this.state.isPlaying && isSameSong) {
        this.pause();
      } else {
        if (!isSameSong) { this.setSong(song); }     
        this.play();
      }
    }
 
    handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }

    handleNextClick(){
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }

    componentDidMount(){
      this.eventListeners = {
        timeupdate: e => {
          this.setState({ currentTime: this.audioElement.currentTime });
        },
        durationchange: e => {
          this.setState({ duration: this.audioElement.duration });
        }
      };
      this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }

    componentWillUnmount() {
      this.audioElement.src = null;
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    }

    handleTimeChange(e) {
      const newTime = this.audioElement.duration * e.target.value;
      this.audioElement.currentTime = newTime;
      this.setState({ currentTime: newTime });
    }
  
    handleVolumeChange(e) {
      const newVolume = e.target.value;
      this.audioElement.volume = newVolume;
      this.setState({ volume: newVolume });
    }
  
    formatTime(time) {
      if (isNaN(time) === true || time === undefined ) {
        return '-:--';
      }
      var minutes = Math.floor(time / 60);
      var seconds = time - minutes * 60;
      minutes = minutes.toString();
       if (seconds < 10) {
        seconds = Math.floor(seconds.toString());
        return minutes + ":0" + seconds;
      } else {
        seconds = Math.floor(seconds.toString());
        return minutes + ":" + seconds;
      }
    }


    handleSongClass(song, index) {
      if (song === this.state.currentSong) {
        if (this.state.isPlaying) {
          return 'ion-pause'
        } else if (!this.state.isPlaying) {
          return 'ion-play'
        }
      } else if (this.state.songs[index].hover) {
        return 'ion-play'
      }
    }
  
    songNumber(song, index) {
      const number = index + 1;
      if (song === this.state.currentSong || this.state.songs[index].hover) {
        return
      } else {
        return number
      }
    }
  
    handleHoverOn(index) {
      const temp = this.state.songs;
      temp[index].hover = true;
      this.setState(temp);
    }
  
    handleHoverOff(index) {
      const temp = this.state.songs;
      temp[index].hover = false;
      this.setState(temp);
    }
  
    hoverEffect(index) {
      if (this.state.songs[index].hover) {
        return 'ion-play'
      }
    }
  
    render() {
        return (
        <section className='album'>
        <section className="lg-album">
          <section id='album-info'>
            <img id='album-cover-art' src={this.state.album.albumCover} alt='album-cover'/>
            <div className='album-details'>
              <h2 id='album-title'>{this.state.album.title}</h2>
              <h3 className='artist'>{this.state.album.artist}</h3>
              <h5 id='release-info'>{this.state.album.releaseInfo}</h5>
            </div>
          </section>
          <table id='song-list'>
            <colgroup>
              <col id='song-number-column'/>
              <col id='song-title-column'/>
              <col id='song-duration-column'/>
            </colgroup>
            <tbody>
            {
              this.state.album.songs.map((song, index) =>
                  <tr className='song' onMouseEnter={() => this.handleHoverOn(index)} onMouseLeave={() => this.handleHoverOff(index)} key={index} onClick={() =>   this.handleSongClick(song)}>
                    <td className='song-actions'>
                      <button className='song-button'>
                        <span className={this.handleSongClass(song, index)}>{this.songNumber(song, index)}</span>
                      </button>
                    </td>
                    <td className='song-title'>{song.title}</td>
                    <td className='song-duration'>{this.formatTime(song.duration)}</td>
                  </tr>
              )
            }
            </tbody>
          </table>
        </section>
          <PlayerBar 
           isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           currentTime={this.audioElement.currentTime}
           duration={this.audioElement.duration}
           volume={this.state.volume}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
           handleNextClick={()=> this.handleNextClick()}
           handleTimeChange={(e) => this.handleTimeChange(e)}
           handleVolumeChange={(e) => this.handleVolumeChange(e)}
           formatTime={(time) => this.formatTime(time)}
           />
         </section>
      );
    }
  }
export default Album;