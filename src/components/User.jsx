import { useContext, useEffect, useState } from 'react';
import { getUserLogged } from '../utils/request';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { LangContext } from '../App';
import { text } from '../utils/text';

export default function User() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const navigate = useNavigate();
  const { lang } = useContext(LangContext);

  useEffect(() => {
    getUserLogged().then((res) => {
      if (res.status === 'success') {
        setName(res.data.name);
      } else {
        handleLogout();
      }
    });
  });

  const handleLogout = () => {
    localStorage.setItem('accessToken', '');
    navigate('/login');
  };

  return (
    <div className="ml-3">
      <img
        onClick={(prev) => setOpen(!open)}
        src="/Avatar.png"
        alt="image"
        className="w-[35px] rounded-full md:relative"
      />

      {open && (
        <div className="absolute w-36 bg-white rounded-md shadow-lg p-1 right-10 top-14 z-50 border border-slate-200 flex flex-col gap-1">
          <div className="rounded-sm hover:bg-yellow-300 px-3 py-1">
            <h2 className="text-sm font-semibold truncate dark:bg-transparent dark:text-black">
              Hi, {name}
            </h2>
          </div>
          <div
            onClick={() => handleLogout()}
            className="flex justify-start gap-2 items-center bg-red-300 hover:bg-red-500 hover:text-white rounded-sm px-3 py-1"
          >
            <FiLogOut />
            <h2 className="text-sm font-semibold">{text.logout[lang]}</h2>
          </div>
        </div>
      )}
    </div>
  );
}
