
import React, { Component } from 'react';
class Photos extends Component {
  constructor(props){
    super(props);
    this.state = {
        upload: false,
    }
  }
  switchUpload = () => {
    const { upload } = this.state;
    this.setState({upload: !upload})
  }
  content = () =>{ 
      const { images, email } = this.props;
      const photos = images
        .map(image =>
            <div key={image.id} className="imgCont">
                <img src={`images/${email}/${image.filename}`} alt={image.id} />
            </div>
        );
        return <div className="photos">{photos}</div>
    }
  render() {
    return (
      <div className="Photos">
        <header>
        <h1>My Library</h1>
        <div className="upload" onClick={this.switchUpload}>
            Upload
        </div>
        </header>
        {this.content()}
        {this.state.upload &&
        <div className="cover">
            <form ref='uploadForm' 
            id='uploadForm' 
            action='http://localhost:3001/upload' 
            method='post' 
            encType="multipart/form-data">
                <input type="file" name="image" />
                <input type='submit' value='Upload!' />
                <button type="reset" value="Cancel" onClick={this.switchUpload}>Cancel</button>
            </form>
        </div>
        }
      </div>
    );
  }
}

export default Photos;