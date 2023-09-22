import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, CircularProgress } from '@mui/material';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import theme from './styles/theme';
import Updatetodo from './Dashboard/Updatetodo';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path='/update/:id' element={<Updatetodo />} />
      </Routes>
    </ThemeProvider >
  );
}

export default App;
