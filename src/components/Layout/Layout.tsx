import React, { FC } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  NavLink,
} from "react-router-dom";

type propType = {
  match: string;
  players: string;
  teams: string;
  heroes: string
}


export const Layout: FC<propType> = (props) => {


  const links = Object.keys(props)

  return (
    <>

      <header className="App-header">
        <Link to='/'><h1>DotA App</h1></Link>
        <nav>
          <div className="links">
            {links.map(link => (
              <div className="link__item" key={link}>
                <NavLink to={link}>{link}</NavLink>
              </div>
            ))}
          </div>
        </nav>
      </header>
      <main className='container'>
        <Outlet /> {/* Здесь будет рендериться основной контент в зависимости от текущего пути */}
      </main>
    </>
  )
}