import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Navbar from '../component/Navbar';
import axios from 'axios';
import HistoryVideo from '../component/hisvideo/HistoryVideo';
const Search = () => {
  let { text } = useParams();
  const [allvideo, setAllvideo] = useState([]);
  const timeout = useRef(null);
  const his = useHistory();
  let vall = text.replaceAll('+', ' ');
  const getvideo = async () => {
    const res = await axios.get(
      `https://youtube-clone-node.onrender.com/search/${vall}`
    );
    setAllvideo(res.data);
  };
  useEffect(() => {
    getvideo();
  }, [text]);

  const checkAuth = () => {
    axios
      .get('https://youtube-clone-node.onrender.com/isAuth', {
        headers: {
          'x-access-token': localStorage.getItem('Youtubetoken'),
        },
      })
      .then((response) => {
        //  console.log()
        if (!response.data.login) {
          his.push('/');
        }
      });
  };

  useEffect(() => {
    timeout.current = setTimeout(checkAuth, 10);
    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
    //   checkAuth()
  }, []);

  if (!allvideo.length) {
    return (
      <>
        <Navbar />
        <div className="addvideo">
          <div className="container p-5">
            <h3>
              Sorry I think there is no data on this{' '}
              <span style={{ color: 'crimson' }}>{vall}</span> subject or search
              again...
            </h3>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="history">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-12 mx-auto">
              <div className="row">
                {allvideo.map((val, ind) => {
                  return (
                    <>
                      <HistoryVideo
                        key={ind}
                        channel={val.channel}
                        thumbimg={val.channelthumb}
                        title={val.title}
                        vid={val._id}
                        date={val.createdAt}
                        tagg={val.tags}
                      />
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
