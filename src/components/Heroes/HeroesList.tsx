import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppSelector } from '../../store';
import close from '../../img/svg/close.svg';
import './hero.scss'

const HeroesList = () => {
  const [selectedAttackType, setSelectedAttackType] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string[]>([]);
  const [text, setText] = useState<string>('');
  const heroes = useAppSelector((state) => state.hero.heroes);

  const filteredHeroes = useMemo(() => {
    return heroes.filter((hero) => {
      // Фильтрация по имени
      const matchesName = hero.localized_name.toLowerCase().includes(text);

      // Фильтрация по типу атаки
      const matchesAttack = selectedAttackType.length === 0 || selectedAttackType.includes(hero.attack_type.toLowerCase());

      // Фильтрация по ролям
      const selectedRolesLower = selectedRole.map(role => role.toLowerCase());
      const matchesRole = selectedRolesLower.length === 0 ||
        selectedRolesLower.every(role => hero.roles.some(r => r.toLowerCase() === role));


      return matchesName && matchesAttack && matchesRole;
    });
  }, [text, heroes, selectedAttackType, selectedRole]);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value.toLowerCase());
  };

  const handleSelectRole = (e: SelectChangeEvent<string[]>) => {
    const newOptions = (e.target.value as string[]).map((option) => option.toLowerCase());
    if (!selectedRole.includes(newOptions.join())) {
      setSelectedRole(newOptions);
    }
  };

  const handleSelectAttackType = (e: SelectChangeEvent<string>) => {
    const option = e.target.value as string; // Получаем массив значений напрямую
    setSelectedAttackType(option.toLocaleLowerCase());
  };


  const removeRole = useCallback((roleToRemove: string) => {
    setSelectedRole(prevRoles => prevRoles.filter(role => role !== roleToRemove));
  }, []);


  const clearAll = () => {
    setSelectedAttackType('')
    setSelectedRole([])
    setText('')
  }

  const names = [
    'Carry',
    'Escape',
    'Nuker',
    'Initiator',
    'Durable',
    'Disabler',
    'Support',
    'Pusher',
  ];

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Выбрать роли</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedRole}
          onChange={handleSelectRole}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <>
        <p>
          Роли:
          {selectedRole.map((role, idx) => (
            <span key={idx}>
              {role}
              <button onClick={() => removeRole(role)}>
                <img src={close} alt="close" />
              </button>
            </span>
          ))}
        </p>
        <button onClick={() => { setSelectedRole([]) }}>Очистить роли</button>
      </>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Сортировать по типу атаки</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedAttackType}
            label="Age"
            onChange={handleSelectAttackType}
          >
            <MenuItem value='Ranged'>Дальний бой</MenuItem>
            <MenuItem value='Melee'>Ближний бой</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <>
        <p>Тип атаки: {selectedAttackType}</p>
        <button onClick={() => { setSelectedAttackType('') }}>Очистить</button>
      </>
      <input value={text} type="text" onChange={onValueChange} />
      <button onClick={() => clearAll()}>Очистить все</button>


      <div className="hero-wrap">
        {filteredHeroes.map(hero => (
          <Link to={`${hero.id}`} key={hero.id} className='hero-item' state={{ hero }}>
            <span className="hero-img">
              <img src={`https://cdn.cloudflare.steamstatic.com/${hero.img}`} alt="hero" loading="lazy" />
            </span>
            <span className='hero-detail'>
              <h6>{hero.localized_name}</h6>
            </span>
          </Link>

        ))}
      </div>

    </>
  );
};

export default HeroesList;