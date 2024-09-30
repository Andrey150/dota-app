
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ITeam } from '../../types/data'
import { useService } from '../../services/api';

import './team.scss'

export const TeamsList = () => {

  const [team, setTeam] = useState<ITeam[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5

  const { getAllTeams } = useService();

  const searchTeams = () => {
    getAllTeams().then(res => {
      if (res) {
        setTeam(res)
      }
    })
  }

  const currentTeams = team.slice((currentPage - 1) * pageSize, currentPage * pageSize);


  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }


  useEffect(() => {
    searchTeams()
  }, [])

  return (
    <>
      <h1>Teams</h1>
      <div className='team-list'>
        {currentTeams.map(team => (
          <Link to={`${team.team_id}`} key={team.team_id} className='team-item'>
            <div className="team-img">
              <img src={team.logo_url} alt="team" />
            </div>

            <div className='team-detail'>
            <h2>{team.team_id}</h2>
              <div className="team-title">
                <h2>{team.name}-</h2><h2>{team.tag}</h2>
              </div>
              <h2>Current rating: {team.rating}</h2>
            </div>

          </Link>
        ))}
      </div>

      <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </>

  )
}