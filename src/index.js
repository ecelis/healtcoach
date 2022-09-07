import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import './index.css';
import App from './App';
import {Calendar} from 'e-react-ui/dist';
import Menu from './components/Menu';
import Recipe from './components/Recipe';
import RecipeList from './components/RecipeList';
import reportWebVitals from './reportWebVitals';
import { GlobalStyle } from 'e-react-ui/dist';

const StyleApply = function(props) {
  return (
    <React.Fragment>
      <GlobalStyle />
      {props.children}
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter><Routes>
      <Route path="/" element={<StyleApply><App /></StyleApply>}>
        <Route path='calendar'
          element={<StyleApply><Calendar /></StyleApply>} />
        <Route path='menu/new'
          element={<StyleApply><Menu /></StyleApply>} />
        <Route path="recipe"
          element={<StyleApply><RecipeList /></StyleApply>} />
        <Route path="recipe/new"
          element={<StyleApply><Recipe /></StyleApply>} />
        <Route
          path="*"
          element={<StyleApply><Calendar /></StyleApply>} />
      </Route>
    </Routes></BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
