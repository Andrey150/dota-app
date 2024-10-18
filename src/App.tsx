import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route
} from "react-router-dom";

import { useService } from './services/api';
import { Match } from './components/match/Match'
import { ProPlayersList } from './components/proPlayers/ProPlayers'
import { TeamsList } from './components/teams/TeamsList'
import { Layout } from './components/Layout/Layout'
import { Team } from './components/teams/Team';
import { Player } from './components/proPlayers/Player';
import HeroesList from './components/Heroes/HeroesList';
import { Hero } from './components/Heroes/Hero';

import './App.css';


const Murkup = () => {
  return (
    <>
      <h1>Приложение</h1>
      <h2>Приложение с использованием: React, Redux, TS</h2>
    </>
  )
}

function App() {

  return (
    <div className="App">
      {/* <Layout/> */}
      <Routes>
        <Route path='/' element={<Layout match='match' players='players' teams='teams' heroes='heroes'/>  }>
          <Route index element={<Murkup/>} />
          <Route path='match' element={<Match />} />
          <Route path='players' element={<ProPlayersList />} />
          <Route path='teams' element={<TeamsList />} />
          <Route path='teams/:id' element={<Team />} />
          <Route path='player/:id' element={<Player />} />
          <Route path='heroes' element={<HeroesList/>} />
          <Route path='heroes/:id' element={<Hero/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
