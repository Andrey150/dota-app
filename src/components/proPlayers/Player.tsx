import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IPlayer } from '../../types/data';
import { useService } from '../../services/api';

const Player = () => {
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer | null>(null);

  const { id } = useParams();

  const { getPlayer } = useService();

  const getCurrentPlayer = (id: string | undefined) => {
    if (id) {
      getPlayer({ value: id }).then((res) => {
        if (res) {
          setCurrentPlayer(res)
        }
      })
    }

  }

  useEffect(() => {
    getCurrentPlayer(id)
  }, [])
   
  return (
    <div>
      {
        currentPlayer ?
          <div key={currentPlayer.account_id} className='team-item'>
            <div className="team-img">
              <img src={currentPlayer.avatarfull} alt="player" />
            </div>

            <div className='team-detail'>
              <h2>{currentPlayer.name}</h2>
              <h2>{currentPlayer.personaname}</h2>
              <h2>{currentPlayer.loccountrycode}</h2>
              <h2>Current rating: {currentPlayer.competitive_rank}</h2>
              <h2>Current rating: {currentPlayer.solo_competitive_rank}</h2>
              <h2>Current rating: {currentPlayer.rank_tier}</h2>
              <h2>Current rating: {currentPlayer.leaderboard_rank}</h2>
            </div>
          </div>
          : null
      }
    </div>
  );
};


export { Player };