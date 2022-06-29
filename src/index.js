import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import './index.css';
import App from './App';
import Calendar from './components/Calendar';
import Menu from './components/Menu';
import Recipe from './components/Recipe';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter><Routes>
      <Route path="/" element={<App />}>
        <Route path='calendar' element={<Calendar />} />
        <Route path='/menu' element={<Menu />} />
        <Route path="recipe" element={<Recipe />} />
        <Route
        path="*"
        element={<Calendar />} />
      </Route>
    </Routes></BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
