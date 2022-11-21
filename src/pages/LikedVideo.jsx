import React, { useState, useEffect, useRef } from 'react';
import HistoryVideo from '../component/hisvideo/HistoryVideo';
// import { VideoData } from '../component/allvideo/videodata';
import ReactPaginate from 'react-paginate';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const History = () => {
  const [pageNo, setPageNo] = useState(0);
  const [likevideo, setLikevideo] = useState([]);
  const YoutubeUserId = localStorage.getItem('YoutubeUserId');

  const his = useHistory();

  const timeout = useRef(null);
  const checkAuth = () => {
    axios
      .get('https://youtube-clone-back-end-production.up.railway.app/isAuth', {
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

  const getvideo = async () => {
    const res = await axios.get(
      `https://youtube-clone-back-end-production.up.railway.app/getlikes/${YoutubeUserId}`
    );
    setLikevideo(res.data.reverse());
  };
  useEffect(() => {
    getvideo();
  }, []);

  const perpage = 5;
  const pagevisit = pageNo * perpage;
  const data = likevideo.slice(pagevisit, pagevisit + perpage);
  const boxno = Math.ceil(likevideo.length / perpage);

  const pageChange = ({ selected }) => {
    setPageNo(selected);
  };
  if (!likevideo.length) {
    return (
      <>
        <Navbar />
        <div className="addvideo">
          <div className="container p-5">
            <h3>Loading Video . . .</h3>
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
          <h2>Liked Video</h2>
          <br />
          <br />
          <div className="row">
            <div className="col-md-10 col-12 mx-auto">
              <div className="row">
                {data.map((val, ind) => {
                  return (
                    <>
                      <HistoryVideo
                        key={ind}
                        channel={val.channel}
                        thumbimg={val.thumbimg}
                        title={val.title}
                        vid={val.vid}
                        date={val.date}
                        tagg=""
                      />
                    </>
                  );
                })}
              </div>
              <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                pageCount={boxno}
                onPageChange={pageChange}
                containerClassName={'pagination'}
                activeClassName={'activebutton'}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
