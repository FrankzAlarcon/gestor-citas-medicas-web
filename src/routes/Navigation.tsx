import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { options } from '../components/home/options'
import Layout from '../components/Layout'
import { routes } from './routes'

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          {
            routes.map(({path, Component}) => (
              <Route key={path} path={path} element={<Component />} />
            ))
          }
          {
            options.map(({path, Component}) => (
              <Route key={path} path={path} element={<Component />} />
            ))
          }
          <Route path='*' element={<Navigate to={routes[0].to} replace />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation