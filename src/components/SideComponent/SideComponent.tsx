import React, { useEffect, useState, useTransition } from 'react';
import { useService } from '../../services/api';
import { IHeroStats } from '../../types/data';
import { Button, Skeleton } from '@mui/material';

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

  if (isPending && !hero && !error) {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <aside className='sidebar' style={{ "position": "relative" }}>
      {hero ? (
        <div className="hero">
          <h2>{hero.localized_name}</h2>
          <p>Primary Attribute: {hero.primary_attr}</p>
          <p>Attack Type: {hero.attack_type}</p>
          <p>Roles: {hero.roles.join(', ')}</p>
          <img src={`https://cdn.cloudflare.steamstatic.com/${hero.img}`} alt={hero.localized_name} />
        </div>
      ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
      )}
      <Button variant="contained" onClick={() => getRandomHero(allHeroes)}>Изменить</Button>
    </aside>
  );
};

export default SideComponent;
