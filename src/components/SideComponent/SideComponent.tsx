import React, { useEffect, useLayoutEffect, useState, useTransition } from 'react';
import { useService } from '../../services/api';
import { IHeroStats } from '../../types/data';
import { Box, Button, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';

import './sideComponent.scss'

const SideComponent = () => {
  const [hero, setHero] = useState<IHeroStats | null>(null);
  const [allHeroes, setAllHeroes] = useState<IHeroStats[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const { getHeroStats } = useService();

  const getHeroList = () => {
    startTransition(() => {
      setError(null);
      getHeroStats()
        .then((res) => {
          if (res && res.length > 0) {
            setAllHeroes(res);
            getRandomHero(res);
          } else {
            setError('Не найдено ни одного героя.');
          }
        })
        .catch((err) => {
          setError('Произошла ошибка при загрузке данных.');
          console.log('Ошибка: ', err);
        });
    });
  };

  const getRandomHero = (heroesArray: IHeroStats[]) => {
    const randomIndex = Math.floor(Math.random() * heroesArray.length)
    const randomHero = heroesArray[randomIndex]
    setHero(randomHero)
  }

  useEffect(() => {
    getHeroList()
  }, []);

  useEffect(() => {
    if (allHeroes.length > 0) {
      const timerId = setInterval(() => {
        getRandomHero(allHeroes);
      }, 20000);

      return () => clearInterval(timerId);
    }
  }, [allHeroes]);

  if (isPending && !hero && !error) {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <aside className='sidebar'>
      {hero ? (
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
      ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
      )}
      {/* <Button variant="contained" onClick={() => getRandomHero(allHeroes)}>Изменить</Button> */}
    </aside>
  );
};

export default SideComponent;
