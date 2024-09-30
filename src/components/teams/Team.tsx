import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { useService } from '../../services/api';
import { ITeam, ITeamPlayers } from '../../types/data'

export const Team = () => {

  const [currentTeam, setCurrentTeam] = useState<ITeam | null>(null);
  const [currentTeamPlayers, setCurrentTeamPlayers] = useState<ITeamPlayers[]>([]);

  const { id } = useParams();

  const { getOneTeam, getTeamPlayers } = useService();

  const getCurrentTeam = (id: string | undefined) => {
    if (id) {
      getOneTeam({ value: id }).then(res => {
        if (res) {
          setCurrentTeam(res)
        }
      })
    }
  }

  const getPlayers = (id: string | undefined) => {
    if (id) {
      getTeamPlayers({ value: id }).then(res => {
        if (res) {
          setCurrentTeamPlayers(res)
        }
      })
    }
  }


  useEffect(() => {
    getCurrentTeam(id)
    getPlayers(id)
  }, [])

  return (
    <>
      <h1>Teams</h1>
      <div className='team-list'>
        {
          currentTeam ?
            <div key={currentTeam.team_id} className='team-item'>
              <div className="team-img">
                <img src={currentTeam.logo_url} alt="team" />
              </div>

              <div className='team-detail'>
                <h2>{currentTeam.team_id}</h2>
                <div className="team-title">
                  <h2>{currentTeam.name}-</h2><h2>{currentTeam.tag}</h2>
                </div>
                <h2>Current rating: {currentTeam.rating}</h2>
                <div className="team-stat">
                  <h2>Wins: {currentTeam.wins}-</h2>
                  <h2>Losses: {currentTeam.losses}</h2>
                </div>
                <h2>
                  Win Rate: {((currentTeam.wins / (currentTeam.wins + currentTeam.losses)) * 100).toFixed(2)} %
                </h2>
              </div>
            </div>
            : null
        }
        <h2>Игроки:</h2>
        {
          currentTeamPlayers.map(player => (

            <Link to={`/player/${player.account_id}`} key={player.account_id}>
              <h3>{player.name}</h3>
              <h4>Сыграно матчей: {player.games_played}</h4>
              <h4>Побед: {player.wins}</h4>
              {player.is_current_team_member ? <h3>Текущий игрок</h3> : <h4>Бывший игрок</h4>} 
            </Link>

          ))
        }
      </div>
    </>

  )
}