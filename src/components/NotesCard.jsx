import { MdArchive, MdUnarchive } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import Loading from './Loading';
import Highlighter from 'react-highlight-words';
import { dateFormatter } from '../utils/dateFormatter';
import { useContext } from 'react';
import { LangContext } from '../App';
import { PropTypes } from 'prop-types';

export default function NotesCard({
  data,
  isLoading,
  onClick,
  onArchive,
  onUnarchive,
  onDelete,
  searchHint,
}) {
  const { lang } = useContext(LangContext);

  return (
    <>
      {isLoading && <Loading />}

      <div
        className={`flex flex-row flex-wrap px-4 ${
          isLoading ? 'hidden' : 'block'
        }`}
      >
        {data.length > 0 ? (
          data.map((a, i) => {
            return (
              <div key={i} className="w-full md:w-1/4 p-2">
                <div className="card bg-slate-100 rounded-md p-3 overflow-hidden relative z-10">
                  <div className="card-title flex flex-row justify-between items-center w-full">
                    <div className="w-3/4" onClick={() => onClick(a.id)}>
                      <h2 className="text-xl font-semibold truncate">
                        <Highlighter
                          searchWords={[searchHint]}
                          textToHighlight={a.title}
                        />
                      </h2>
                    </div>
                    <div className="w-1/4 text-right relative z-50">
                      {a.archived ? (
                        <button
                          className="bg-blue-400 rounded-sm p-1 text-white text-xs mr-2"
                          onClick={(e) => onUnarchive(a.id)}
                        >
                          <MdUnarchive />
                        </button>
                      ) : (
                        <button
                          className="bg-blue-400 rounded-sm p-1 text-white text-xs mr-2"
                          onClick={(e) => onArchive(a.id)}
                        >
                          <MdArchive />
                        </button>
                      )}
                      <button
                        className="bg-red-400 rounded-sm p-1 text-white text-xs"
                        onClick={(e) => onDelete(a.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <div
                    className="card-body mt-2 h-24 "
                    onClick={() => onClick(a.id)}
                  >
                    <p className="text-sm line-clamp-5 text-gray-700">
                      <Highlighter
                        searchWords={[searchHint]}
                        textToHighlight={a.body}
                      />
                    </p>
                  </div>
                  <div className="card-footer mt-3">
                    <small className="text-xs italic text-gray-400 font-light">
                      {dateFormatter(a.createdAt, lang)}
                    </small>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-md font-semibold mt-10 w-full dark:bg-transparent dark:text-white">
            Tidak ada data.
          </p>
        )}
      </div>
    </>
  );
}

NotesCard.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
  onDelete: PropTypes.func,
  searchHint: PropTypes.string,
};
