
      import React, { Component } from 'react';
      import '../App.css';
      
      class Sport extends Component {
        constructor(props) {
          super(props)
          this.state = {
            results: []
          }
        }
      
        onSearchChange = event => {
        const { data } = this.props;
          const allteams = data.map(match => match[0] ? match[0] : "");
          const teams = allteams.filter((item, pos) =>  Number(allteams.indexOf(item)) === pos);
          const results = teams.filter(team => team.toLowerCase().includes(event.target.value.toLowerCase()));
          this.setState({results});
        }
        selectTeam = team => {
            const { setSelectedTeam } = this.props;
            this.setState({
                results: []
            });
            setSelectedTeam(team);
        }
        renderMatches = () => {
            const { selectedTeam, data } = this.props;
            if(Boolean(selectedTeam)){
                const defeatedTeams = data.filter(match => match
                    .some(team => team === selectedTeam))
                    .filter(match => (match[0] === selectedTeam && match[2] === "H") || (match[1] === selectedTeam && match[2] === "A"))
                    .map(match => match[0] === selectedTeam ? match[1] : match[0])
                    .map(team => <p className="defeatedTeams">{team}</p>)
                
                    return <div className="teamsContainer">
                        <h1>{`Your team ${selectedTeam} has won against`}</h1>
                        {defeatedTeams}
                    </div>
            }
        }
        renderResults = () => {
            const { results } = this.state;
            return <div className="resultsList">
                {results.map(team => <p onClick={() => this.selectTeam(team)}>{team}</p>)}
            </div>
        }
      
        render() {
          
          return <div className="inner">
            <input
                type='search'
                placeholder='search teams'
                onChange={this.onSearchChange}
            />
            {this.renderResults()}
            {this.renderMatches()}
            </div>
        }
      }
      
      export default Sport;