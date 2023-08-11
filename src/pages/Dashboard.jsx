import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { archiveNote, getActiveNotes, deleteNote } from '../utils/request';
import toast, { Toaster } from 'react-hot-toast';
import NotesCard from '../components/NotesCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LangContext } from '../App';
import { text } from '../utils/text';

export default function Dashboard() {
  const [response, setResponse] = useState([]);
  const [reload, setReload] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const { lang } = useContext(LangContext);

  const handleSearchData = (data) => {
    const q = searchParams.get('q');
    let datas = data.filter((e) => {
      if (
        e.title.toLowerCase().indexOf(q) !== -1 ||
        e.body.toLowerCase().indexOf(q) !== -1
      ) {
        return true;
      }
      return false;
    });

    return datas;
  };

  useEffect(() => {
    setIsLoading(true);
    getActiveNotes().then((res) => {
      if (res.status === 'success') {
        if (res.data.length > 0) {
          if (searchParams.get('q')) {
            let datas = handleSearchData(res.data);
            setResponse(datas);
          } else {
            setResponse(res.data);
          }
          setIsLoading(false);
        } else {
          setResponse([]);
          setIsLoading(false);
        }
      }
    });
  }, [reload, searchParams]);

  const handleClick = (id) => {
    navigate(`/view/${id}`);
  };

  const handleArchive = (id) => {
    archiveNote(id).then((res) => {
      if (res.status === 'success') {
        toast.success(res.message);
      }
      setReload((prev) => prev + 1);
    });
  };

  const handleDelete = (id) => {
    deleteNote(id).then((res) => {
      if (res.status === 'success') {
        toast.success(res.message);
      }
      setReload((prev) => prev + 1);
    });
  };

  return (
    <>
      <Navbar page="home" />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="search w-full px-6 mt-5 flex justify-center mb-3">
        <input
          type="text"
          className="w-96 rounded-sm border border-slate-400 h-8 px-3 self-center py-1 text-sm dark:bg-transparent dark:text-white"
          placeholder={text.search_here[lang]}
          onChange={(e) => setSearchParams({ q: e.target.value })}
          value={searchParams.get('q') || ''}
        />
      </div>

      <NotesCard
        data={response}
        searchHint={searchParams.get('q')}
        isLoading={isLoading}
        onClick={handleClick}
        onArchive={handleArchive}
        onDelete={handleDelete}
      />
    </>
  );
}
