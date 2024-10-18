import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useService } from '../../services/api'
import { IPlayers } from '../../types/data';
import './proplayer.scss'
import { Avatar, CardContent, Typography } from '@mui/material';

export const ProPlayersList = () => {

  const [playersList, setPlayersList] = useState<IPlayers[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5

  const { getProPlayersList } = useService();


  const searchProPlayers = () => {
    getProPlayersList().then(res => {
      if (res) {
        console.log(res)
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
      <Typography variant='h2' style={{marginBottom: "24px"}}>ProPlayer</Typography>
      {currentPlayers.map(player => (
        <CardContent className="player__item" key={player.account_id}>
          <Avatar sx={{ width: 128, height: 128 }} src={player.avatarfull} alt="img" />
          <div className='player__description'>
            <Typography variant='h4' gutterBottom sx={{ fontWeight: 600}}>{player.name ? player.name : null}</Typography>
            <Typography variant='h5' gutterBottom sx={{ color: 'text.secondary'}}>
              Играет за команду: {player.team_name} - {player.team_tag}
            </Typography>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
              Страна: {player.country_cod ? player.country_cod : 'Не обозначена'}
            </Typography>
            <Typography variant="h5" component="div">
              Играл последний раз: {player.last_match_time}
            </Typography>
          </div>
        </CardContent>
      ))}
      <div className="button-wrap">
        <Button variant="contained" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
        <Button variant="contained" onClick={handleNextPage}>Next</Button>
      </div>

    </div>
  );
}