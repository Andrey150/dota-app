import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { IHeroStats } from '../../types/data';

import "./hero.scss"


export function Hero() {
  // const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const hero = location.state?.hero as IHeroStats;

  if (!hero) {
    return <div>Герой не найден</div>; // Если нет данных в state
  }

  console.log(hero)
  return (
    <div>
      <div className="hero-row">
        <img src={`https://cdn.cloudflare.steamstatic.com/${hero.img}`} alt="bg" className="hero-bg" />
        <div className="hero-description">
          <img src={`https://cdn.cloudflare.steamstatic.com/${hero.img}`} alt="hero" className="hero-img" />
          <div className="hero-description--more">
            <h2>{hero.localized_name}</h2>
            <div className='roles'>
              {
                hero.roles.map((role, idx) => (
                  <span key={idx}>
                    {role}
                  </span>
                ))
              }
            </div>
          </div>
          <div className="hero-attr">
            <div className='attr attr-str'>
              <span>{hero.base_str} + {hero.str_gain}</span>
            </div>
            <div className="attr attr-agi">
              <span>{hero.base_agi} + {hero.agi_gain}</span>
            </div>
            <div className="attr attr-int">
              <span>{hero.base_int} + {hero.int_gain}</span>
            </div>
          </div>
        </div>
        <Accordion>
          <AccordionItem header="Полная информация" className="accordion-item">
            <div className="hero-info">
              <div className="info-row">
                <h4>Тип атаки:</h4>
                <span>{hero.attack_type}</span>
              </div>
              <div className="info-row">
                <h4>Базовая броня:</h4>
                <span>{hero.base_armor}</span>
              </div>
              <div className="info-row">
                <h4>Базовая атака:</h4>
                <span>{hero.base_attack_min} - {hero.base_attack_max}</span>
              </div>
              <div className="info-row">
                <h4>Базовая скорость передвижения:</h4>
                <span>{hero.move_speed}</span>
              </div>
              <div className="info-row">
                <h4>Основной аттрибут:</h4>
                <span>
                  {hero.primary_attr === 'int' ? 'Интеллект' :
                    hero.primary_attr === 'str' ? 'Сила' :
                      hero.primary_attr === 'agi' ? 'Ловкость' : 'Некорректное значение'}
                </span>
              </div>
              <div className="info-row">
                <h4>Дальность атаки:</h4>
                <span>{hero.attack_range}</span>
              </div>
            </div>
            <div className="hero-points">
              <div className="points points-health">
                <span>{hero.base_health}+{hero.base_health_regen}</span>
              </div>
              <div className="points points-mana">
                <span>{hero.base_mana}+{hero.base_mana_regen}</span>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
