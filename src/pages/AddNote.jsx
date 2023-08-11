import Navbar from '../components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import { addNote, getNote } from '../utils/request';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

export default function AddNotes({ isView }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isView) {
      getNote(id).then((res) => {
        if (res.status === 'success') {
          setTitle(res.data.title);
          setBody(res.data.body);
        } else {
          navigate('/');
        }
      });
    }
  }, []);

  const handleSaveNote = () => {
    if (title.length > 0 && body.length > 0) {
      addNote({ title, body }).then((res) => {
        if (res.status === 'success') {
          toast.success(res.message);
          setTimeout(() => navigate('/'), 1000);
        } else {
          toast.error(res.message);
        }
      });
    } else {
      toast.error('Silahkan isi semua form');
    }
  };

  return (
    <>
      <Navbar page={isView ? 'view' : 'add'} onSaveNote={handleSaveNote} />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col w-full px-6 mt-10">
        <div className="note-title">
          <input
            type="text"
            className="h-14 border-none focus:outline-none text-3xl w-full dark:bg-transparent dark:text-white"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            disabled={isView ? true : false}
          />
        </div>
        <textarea
          className="editable focus:outline-none mt-3 w-full min-h-screen text-xl opacity-80 overflow-hidden dark:bg-transparent dark:text-white"
          placeholder="Write content here"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isView ? true : false}
        ></textarea>
      </div>
    </>
  );
}

AddNotes.propTypes = {
  isView: PropTypes.bool,
};
