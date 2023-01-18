import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { ArticlePage } from './ArticlePage'
import { ArticleList } from './ArticleList'
import { LoginPage } from './LoginPage';
import { getUser } from '../hooks/store';

export const RoutingTable = () => {
  const user = getUser()

  return (
    <Routes>
      <Route path='/' element={<Outlet />}>
        {
          !user
            ? <>
                <Route index element={<Navigate to={'/login'}/>}/>
                <Route path='login' element={<LoginPage/>}/>
              </>
            : <>
                <Route index element={<Navigate to={'/articles/list'} />} />
                <Route path='articles' element={<Outlet />}>
                  <Route path='list' element={<ArticleList/>}/>
                  <Route path='manage' element={<ArticlePage/>}/>
                </Route>
              </> 

        }
      <Route path='*' element={<Navigate to={'/'}/>}/>
        {/* <Route index element={<Login/>}> //TODO login*/}
        
        {/* <Route path='article' element={</>}/> //TODO wyswietlenie/preview*/}
      </Route>
    </Routes>
  )
}