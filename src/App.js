import { Routes, Route } from 'react-router-dom';
import s from './App.module.css';

import Header from './components/Header/Header';

import Values from './components/Values/Values';

import FirsPage from './components/FirstPage/firstPage';
import Preview from './components/Preview/Preview';

import { useState, useEffect } from 'react';

function App() {
  const initialState = ['{recipient}', '{subject}'];

  const [bodyArray, setBodyArray] = useState(initialState);

  const [bodyInput, setBodyInput] = useState(() => {
    const saved = localStorage?.getItem('bodyText');
    const storedValue = JSON.parse(saved);
    return storedValue || '';
  });

  const [inputValues, setInputValues] = useState(() => {
    const saved = localStorage?.getItem('inputValues');
    const storedValue = JSON.parse(saved);
    return storedValue || '';
  });

  const [splittedBodyInput, setSplittedBodyInput] = useState([]);

  useEffect(() => {
    localStorage.setItem('bodyText', JSON.stringify(bodyInput));
  }, [bodyInput]);

  useEffect(() => {
    localStorage.setItem('inputValues', JSON.stringify(inputValues));
  }, [inputValues]);

  return (
    <div className="App">
      <div className={s.container}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <FirsPage
                bodyArray={bodyArray}
                bodyInput={bodyInput}
                setBodyArray={setBodyArray}
                setBodyInput={setBodyInput}
                initialState={initialState}
                splittedBodyInput={splittedBodyInput}
                setSplittedBodyInput={setSplittedBodyInput}
              />
            }
          />
          <Route
            path="values"
            element={
              <Values
                bodyArray={bodyArray}
                bodyInput={bodyInput}
                inputValues={inputValues}
                setInputValues={setInputValues}
              />
            }
          />
          <Route
            path="preview"
            element={
              <Preview
                initialState={initialState}
                bodyArray={bodyArray}
                bodyInput={bodyInput}
                inputValues={inputValues}
                splittedBodyInput={splittedBodyInput}
                setSplittedBodyInput={setSplittedBodyInput}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
