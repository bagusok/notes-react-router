import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddNotes from './pages/AddNote';
import ArchivedNotes from './pages/ArchivedNotes';
import { createContext, useState, useMemo } from 'react';

export const LangContext = createContext();

function App() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'id');
  const [isDark, setIsDark] = useState(localStorage.getItem('isDark') || 'no');

  const toggleLang = () => {
    setLang((prev) => {
      let a = prev === 'id' ? 'en' : 'id';
      localStorage.setItem('lang', a);
      return a;
    });
  };

  const toggleIsDark = () => {
    setIsDark((prev) => {
      let b = prev === 'yes' ? 'no' : 'yes';
      localStorage.setItem('isDark', b);
      return b;
    });
  };

  const contextLangValue = useMemo(() => {
    return {
      lang,
      isDark,
      toggleIsDark,
      toggleLang,
    };
  }, [lang, isDark]);

  return (
    <>
      <div className={`min-h-screen ${isDark === 'yes' && 'dark'} `}>
        <div className="dark:bg-slate-800 min-h-screen relative">
          <LangContext.Provider value={contextLangValue}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add" element={<AddNotes type="add" />} />
                <Route path="/archive" element={<ArchivedNotes />} />
                <Route path="/view/:id" element={<AddNotes isView={true} />} />
              </Routes>
            </BrowserRouter>
          </LangContext.Provider>
        </div>
      </div>
    </>
  );
}

export default App;
