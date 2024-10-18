import React, { useEffect, useState } from 'react';
import { Button, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import { IHeroStats } from '../../types/data';
import { fetchHeroes } from '../../store/slices/heroesSlice';
import { useAppDispatch, useAppSelector } from '../../store';

import './sideComponent.scss'

const SideComponent = () => {
  const [hero, setHero] = useState<IHeroStats | null>(null);
  const dispatch = useAppDispatch()
  const { heroes, status, error } = useAppSelector((state) => state.hero);

  // Показывает случайного героя
  const getRandomHero = (heroesArray: IHeroStats[]) => {
    const randomIndex = Math.floor(Math.random() * heroesArray.length)
    const randomHero = heroesArray[randomIndex]
    setHero(randomHero)
  }

  const handleReload = () => {
    dispatch(fetchHeroes());
  }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchHeroes());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (heroes.length > 0) {
      getRandomHero(heroes);

      const timerId = setInterval(() => {
        getRandomHero(heroes)
      }, 15000)

      return () => clearInterval(timerId)
    }
  }, [heroes])

  if (status === 'loading') {
    return <Skeleton variant="rectangular" width={366} height={450} />;
  }

  if (status === 'failed') {
    return (
      <div>
        <div>Герой не найден</div>
        <Button variant="outlined" style={{ marginTop: 16 }} onClick={() => handleReload()}> Повторить запрос</Button>
      </div>
    );
  }

  return (
    <aside className='sidebar'>
      {hero && (
        <CardContent sx={{ maxWidth: 345, bgcolor: '#cfe8fc', borderRadius: "16px" }}>
          <CardMedia
            className='card-img'
            sx={{ height: 'auto', minHeight: 140 }}
            image={`https://cdn.cloudflare.steamstatic.com/${hero.img}`}
            title={hero.localized_name}
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="p">
              {hero.localized_name}
            </Typography>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }} component="p">
            </Typography>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }} component="p">
              Тип атаки: {hero.attack_type}
            </Typography>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }} component="p">
              Роли: {hero.roles.join(', ')}
            </Typography>
          </CardContent>
        </CardContent>
      )}
    </aside>
  );
};

export default SideComponent;
