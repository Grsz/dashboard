import React, { Component } from 'react';
import Signin from './Components/Signin';
import Register from './Components/Register';
import Parser from 'rss-parser';
import Sport from './Components/Sport';
import Photos from './Components/Photos'
import {Pie} from 'react-chartjs-2';

const initialState = {
  route: 'signin',
  isSignedIn: false,
  news: {},
  weather: {},
  sports: [],
  clothes: {},
  selectedTeam: "",
  user: {
    id: '',
    name: '',
    email: '',
    profimg: '',
    images: [],
    tasks: []
  }
};
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
class App extends Component {
  constructor(){
    super();
    this.pieRef = React.createRef();
    this.state = initialState
  }
  loadedUser = userData => {
    const user = Object.assign({}, this.state.user, userData)
    this.setState({user})
  }
  componentWillMount = () => {
    this.getSport();
    this.getWeather();
    this.getNews();
    this.getClothes();
  }
getWeather = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=d0a10211ea3d36b0a6423a104782130e`)
      .then(res => res.json())
      .then(w => {
        this.setState({
          weather: {
            location: w.name,
            temp: w.main.temp,
            desc: w.weather[0].main,
            icon: `http://openweathermap.org/img/w/${w.weather[0].icon}.png`
          }
        })
      })
      .catch(err => console.log(err))
    });
  } else {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=d0a10211ea3d36b0a6423a104782130e`)
    .then(res => res.json())
    .then(w => {
      this.setState({
        weather: {
          location: w.name,
          temp: w.main.temp,
          desc: w.weather[0].main,
          icon: `http://openweathermap.org/img/w/${w.weather[0].icon}.png`
        }
      })
    })
    .catch(err => console.log(err))
  }
}
getNews = () => {
  let parser = new Parser();
  parser.parseURL(CORS_PROXY + 'https://feeds.bbci.co.uk/news/rss.xml', (err, feed) => {
    const { title, content, link } = feed.items[0];
    this.setState({
      news: { link, title, content }
    })
  })
}
getSport = () => {
  fetch(CORS_PROXY + "http://www.football-data.co.uk/mmz4281/1718/I1.csv")
    .then(res => res.text())
    .then(res => {
      const indexes = [2, 3, 6];
      this.setState({
        sports: res
        .split(/\r?\n|\r/)
        .map(l => l
          .split(",")
          .filter((e, i) => indexes
            .some(ii => ii === i)))
      })
    })
    .catch(err => console.log(err))
}
getClothes = () => {
  fetch(CORS_PROXY + "https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil")
    .then(res => res.json())
    .then(res => {
      const clothes = {}
      res.payload.map(obj => obj.clothe).forEach(cloth => {
        if(clothes[cloth]){
          clothes[cloth] ++;
        } else {
          clothes[cloth] = 1
        }
      })
      this.setState({clothes})
    })
}
onRouteChange = route => {
  if(route === 'signout'){
    this.setState(initialState)
  } else if (route === 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route})
}
profimg = () => {
    const { profimg, email } = this.state.user;
    if(Boolean(profimg)){
        return <img src={"images/" + email + "/" + profimg} alt="profimg" />
    } else {
        return <img src={"images/empty.png"} alt="profimg" />
    }
}
content = () => {
    const types = ["Weather", "News", "Sport", "Photos", "Tasks", "Clothes"];
    const { icon, location, desc, temp } = this.state.weather;
    const { title, content, link } = this.state.news;
    const { selectedTeam } = this.state;
    const { images, email, tasks } = this.state.user;
    const createContent = type => {
        switch (type) {
            case "Weather":
                return <div className="container weather">
                  <div className="col">
                    <img src={icon} alt="icon" className="weathericon"/>
                    <h2 className="location">{location}</h2>
                  </div>
                  <div className="col">
                    <h3 className="temp">{temp + "°C"}</h3>
                    <p className="desc">{desc}</p>
                  </div>
                </div>
            case "News":
              return <div className="container news">
                <h4>{title}</h4>
                <a href={link}>{content}</a>
              </div>
            case "Sport":
              let text = Boolean(selectedTeam) ? selectedTeam : "Select a team"
              return <div className="container sport" onClick={() => this.onRouteChange("Sport")}>
                <h4>{text}</h4>
              </div>
            case "Photos":
              return <div className="container photos" onClick={() => this.onRouteChange("Photos")}>
              {  images.filter((img, i) => i < 4)
                  .map(img => <div className="imgCont" >
                    <img src={`images/${email}/${img}`} />
                  </div>)}
              </div>
            case "Tasks":
              return tasks.filter((t, i) => i < 4)
              .map(task => <div className="taskCont">
                <p className="task">{task}</p>
              </div>)
            case "Clothes":
            const { clothes } = this.state;
            const labels = [];
            const data = [];
            Object.keys(clothes).forEach(cloth => {
              labels.push(cloth);
              data.push(clothes[cloth])
            })
            const props = {
              labels,
              datasets: [{
                  data,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ]
              }]
            }
            const options = {
              legend: {
                  display: false
              },
          }
            return <Pie data={props} options={options} width={200} height={200}/>
        }
    }
    return types.map(type => 
        <div className="element" >
            <h3>{type}</h3>
            {createContent(type)}
        </div>
    )
}
setSelectedTeam = selectedTeam => {
  this.setState({selectedTeam})
}
//onClick={() => this.onRouteChange(type)}
renderApp = () => {
  const { username, images, email } = this.state.user;
  const { selectedTeam, sports } = this.state;
  switch (this.state.route) {
    case "home":
      return <div className="contentWrapper">
      <div className="header">
          <div className="profimg">
              {this.profimg()}
          </div>
          <h1>{`Good day ${username}`}</h1>
      </div>
      <div className="content">
          {this.content()}
      </div>
  </div>
  case "signin":
  return <Signin loadUser={this.loadedUser} RouteChange={this.onRouteChange}/>
  case "Sport":
  return <Sport selectedTeam={selectedTeam} setSelectedTeam={this.setSelectedTeam} data={sports}/>
  case "Photos":
  return <Photos images={images} newImages={this.newImages} email={email}/>
    default:
      return <Register loadUser={this.loadedUser} RouteChange={this.onRouteChange}/>
  }
}
  render() {
    const { isSignedIn } = this.state;
    return (
      <div className="App">
        {this.renderApp()}
        {isSignedIn && 
          <div className="home" onClick={() => this.onRouteChange("home")}>
            <p>Home</p>
          </div>
        }
      </div>
    );
  }
}

export default App;