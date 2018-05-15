import React, { Component } from 'react';
import albumData from './../data/albums'
import { Link } from 'react-router-dom';
import './styles/Library.css';


class Library extends Component { 
  constructor(props){
    super(props);
    this.state ={albums:albumData};
  }
  render() {
   return ( 
    <section className="library">
    {
      this.state.albums.map( (album, index) => 
        <div className="album-div" key={index}>
          <Link to={`/album/${album.slug}`} key={index}>
            <img className="album-art" src={album.albumCover} alt={album.title} />
              <div className="album-title">{album.title}</div>
              <div className="album-artist">{album.artist}</div>
              <div className="album-songs-length">{album.songs.length} songs</div>
          </Link>
        </div>
      )
    }
  </section>
    );
  }
}

export default Library;