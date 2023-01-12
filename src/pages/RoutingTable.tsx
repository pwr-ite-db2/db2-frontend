import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { ArticlePage } from './ArticlePage'
import { UserData } from '../hooks/useLogin';
import { LoginPage } from './LoginPage';

export const RoutingTable = () => {
  console.log(UserData.authToken)
  return (
    <Routes>
      <Route path='/' element={<Outlet />}>
        {
          !UserData.authToken
            ? <>
                <Route index element={<Navigate to={'/login'}/>}/>
                <Route path='login' element={<LoginPage/>}/>
              </>
            : <Route path='articles' element={<Outlet />}>
                <Route path='manage' element={<ArticlePage/>}/>
                {/* <Route path='list' element={<ArticlePage/>}/> //TODO lista*/}
              </Route>

        }
        {/* <Route index element={<Login/>}> //TODO login*/}
        
        {/* <Route path='article' element={</>}/> //TODO wyswietlenie/preview*/}
      </Route>
    </Routes>
  )
}