import { Link } from 'react-router-dom';
import User from './User';
import { MdLightMode, MdNightlight } from 'react-icons/md';
import { HiPlus } from 'react-icons/hi';
import { useContext, useState } from 'react';
import { LangContext } from '../App';
import { text } from '../utils/text';
import { PropTypes } from 'prop-types';

export default function Navbar({ title = 'NotesApp', page, onSaveNote }) {
  const { lang, isDark, toggleIsDark, toggleLang } = useContext(LangContext);

  return (
    <>
      <div className="flex flex-row justify-between items-center h-14 shadow-sm bg-white w-full px-3 md:px-6 bg-gray-50 dark:bg-slate-700 dark:text-white">
        <div className="nav-head flex justify-start gap-3 items-center">
          <h1 className="font-semibold text-xs md:text-xl">{title}</h1>
          <button
            className="p-2 flex justify-center rounded-md bg-slate-200 w-6 h-6 items-center mt-2"
            onClick={toggleLang}
          >
            <h2 className="font-semibold text-black text-xs">{lang}</h2>
          </button>
          <button
            className="p-2 flex justify-center rounded-md bg-slate-200 w-6 h-6 items-center mt-2 dark:text-black"
            onClick={toggleIsDark}
          >
            {isDark === 'yes' ? <MdNightlight /> : <MdLightMode />}
          </button>
        </div>
        <div className="nav-link flex justify-end gap-2 ">
          {page === 'home' && (
            <>
              <Link
                to="/archive"
                className="px-3 py-2 border border-yellow-400 rounded-md text-xs font-semibold text-yellow-700 dark:text-yellow-400 hover:opacity-80"
              >
                {text.archived_notes[lang]}
              </Link>{' '}
              <Link
                to="/add"
                className="hidden md:block px-3 py-2 border border-yellow-400 bg-yellow-400 rounded-md text-xs font-semibold text-black hover:opacity-80"
              >
                {text.add_note[lang]}
              </Link>
            </>
          )}

          {page === 'add' && (
            <>
              <Link
                to="/"
                className="px-3 py-2 border border-yellow-400 rounded-md text-xs font-semibold text-yellow-700 dark:text-yellow-400 hover:opacity-80"
              >
                {text.dashboard[lang]}
              </Link>
              <button
                onClick={onSaveNote}
                className="px-3 py-2 border border-yellow-400 bg-yellow-400 rounded-md text-xs font-semibold text-black hover:opacity-80"
              >
                {text.save[lang]}
              </button>
            </>
          )}

          {page === 'archive' && (
            <>
              <Link
                to="/"
                className="px-3 py-2 border border-yellow-400 rounded-md text-xs font-semibold text-yellow-700 dark:text-yellow-400 hover:opacity-80"
              >
                {text.dashboard[lang]}
              </Link>
              <Link
                to="/add"
                className="hidden md:block px-3 py-2 border border-yellow-400 bg-yellow-400 rounded-md text-xs font-semibold text-black hover:opacity-80"
              >
                {text.add_note[lang]}
              </Link>
            </>
          )}

          {page === 'view' && (
            <>
              <Link
                to="/"
                className="px-3 py-2 border border-yellow-400 rounded-md text-xs font-semibold text-yellow-300 hover:opacity-80"
              >
                {text.dashboard[lang]}
              </Link>
            </>
          )}

          {(page === 'archive' || page === 'home') && (
            <Link
              to="/"
              className="md:hidden rounded-full flex justify-center items-center text-center h-14 w-14 text-2xl absolute right-10 bottom-16 bg-yellow-500 z-50 shadow-xl"
            >
              <HiPlus />
            </Link>
          )}

          <User />
        </div>
      </div>
    </>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
  page: PropTypes.string,
  onSaveNote: PropTypes.func,
};
