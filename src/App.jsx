import { NavBar } from './components/NavBar/NavBar'
import { Repos } from './components/Repos/Repos'
import { Routes, Route } from 'react-router-dom'
import { Main } from './components/Main/Main'
import { Repo } from './components/Repo/Repo'
import { Box } from '@mui/material'
import './App.css'
import { NotFound } from './components/NotFound/NotFound'

function App() {
  return (
    <Box className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/repos' element={<Repos />} />
        <Route path='/repos/:nameRepo' element={<Repo />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
