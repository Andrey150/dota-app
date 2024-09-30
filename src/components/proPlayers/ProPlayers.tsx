import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useService } from '../../services/api'
import { IPlayers } from '../../types/data';
import './proplayer.scss'

export const ProPlayersList = () => {

  const [playersList, setPlayersList] = useState<IPlayers[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5

  const { getProPlayersList } = useService();


  const searchProPlayers = () => {
    getProPlayersList().then(res => {
      if (res) {
        setPlayersList(res)
      }
    })
  }

  const currentPlayers = playersList.slice((currentPage - 1) * pageSize, currentPage * pageSize);


  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }

  useEffect(() => {
    searchProPlayers()
  }, [])

  return (
    <div>
      <h1>ProPlayer</h1>
      {currentPlayers.map(player => (
        <div className="player__item" key={player.account_id}>
          <div className="player-img">
            <img src={player.avatarfull} alt="img" />
          </div>
          <div className='player__description'>
            <h2>{player.name ? player.name : null}</h2>
            <h2> Играет за команду {player.team_name} - {player.team_tag}</h2>
            <h3>{player.country_cod}</h3>
            <h3>{player.personalName ? player.personalName : null}</h3>
            <h4>Играл последний раз {player.last_match_time}</h4>
          </div>
        </div>
      ))}
      <div className="button-wrap">
        <Button variant="contained" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
        <Button variant="contained" onClick={handleNextPage}>Next</Button>
      </div>

    </div>
  );
}