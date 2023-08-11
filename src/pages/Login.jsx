import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { login, putAccessToken, getAccessToken } from '../utils/request';
import toast, { Toaster } from 'react-hot-toast';
import { LangContext } from '../App';
import { text } from '../utils/text';

export default function Login() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { lang } = useContext(LangContext);

  useEffect(() => {
    let token = getAccessToken();
    if (token) {
      navigate('/');
    }
  }, []);

  const handleLogin = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (email === '' || password === '') {
      toast.error('Silahkan Isi Semua Form');
      setIsLoading(false);
    } else {
      login({ email, password }).then((res) => {
        if (res.status === 'success') {
          toast.success(res.message);
          putAccessToken(res.data.accessToken);
          setTimeout(() => navigate('/'), 2000);
        } else {
          toast.error(res.message);
          setIsLoading(false);
        }
      });
    }
  };

  return (
    <div className="p-6 flex justify-center pt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-96">
        <div className="card bg-white rounded-md shadow-md p-3 border border-slate-200">
          <div className="card-header">
            <h1 className="text-lg text-center">Login</h1>
          </div>
          <div className="card-body mt-5 flex flex-col gap-1">
            <form action="" onSubmit={(e) => handleLogin(e)}>
              <div className="form-group">
                <label htmlFor="email" className="text-xs -mb-2">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full rounded-sm h-8 p-2 border border-slate-500 text-sm"
                  placeholder="Email"
                  onChange={onEmailChange}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="text-xs -mb-2">
                  Password
                </label>
                <input
                  type="text"
                  className="w-full rounded-sm h-8 p-2 border border-slate-500 text-sm"
                  placeholder="Password"
                  onChange={onPasswordChange}
                  value={password}
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1 text-sm font-semibold bg-blue-400 text-white rounded-sm mt-3 disabled:opacity-40"
                disabled={isLoading ? true : false}
              >
                {isLoading ? 'Loading' : text.login[lang]}
              </button>
            </form>
            <h2 className="mt-3 text-xs font-semibold text-black">
              {text.dont_have_account[lang]}{' '}
              <Link to="/register" className="text-blue-500 hover:opacity-75">
                {' '}
                {text.register[lang]}
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
