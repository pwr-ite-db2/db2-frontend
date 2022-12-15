import { Routes, Route, Outlet } from 'react-router-dom'
import { ArticlePage } from './ArticlePage'

export const RoutingTable = () => {
  return (
    <Routes>
      <Route path='/' element={<Outlet />}>
        {/* <Route index element={<Login/>}> //TODO login*/}
        <Route path='articles' element={<Outlet />}>
          <Route path='manage' element={<ArticlePage/>}/>
          {/* <Route path='list' element={<ArticlePage/>}/> //TODO lista*/}
        </Route>
        {/* <Route path='article' element={</>}/> //TODO wyswietlenie/preview*/}
      </Route>
    </Routes>
  )
}