
import React, { Component } from 'react';
import '../App.css';
import server from './server';
class Photos extends Component {
  constructor(props){
    super(props);
    this.state = {
        upload: false,
        file: {}
    }
  }
  switchUpload = () => {
    const { upload } = this.state;
    this.setState({upload: !upload})
  }
  fileUpload = e => {
    this.setState({
      file: e.target.files[0]
    })
  }
  upload = () => {
    const { file } = this.state;
    const { username, newImages } = this.props;
    if(Boolean(file)){
      const data = new FormData();
      data.append('file', file);
      data.append('username', username);
      console.log(data)
      fetch(server + 'upload', {
        method: 'post',
        body: data
      })
      .then(res => res.json())
      .then(images => {
        console.log(images)
        this.switchUpload();
        newImages(images)
      })
    }
  }
  content = () =>{ 
      const { images, username } = this.props;
      const photos = images
        .map(image =>
            <div key={image.id} className="imgCont">
                <img src={`images/${username}/${image}`} alt={image.id} />
            </div>
        );
        return <div className="photoLibrary">
          <div className="upload" onClick={this.switchUpload}>
              Upload
          </div>
          {photos}
        </div>
    }
  render() {
    return (
      <div className="inner">
        <header>
        <h1>My Library</h1>
        </header>
        {this.content()}
        {this.state.upload &&
        <div className="cover">
          <input type="file" id="image" onChange={this.fileUpload} />
          <button className="uplBtn" onClick={this.upload}>Upload</button>
          <button className="uplBtn" type="reset" onClick={this.switchUpload}>Cancel</button>
        </div>
        }
      </div>
    );
  }
}

export default Photos;