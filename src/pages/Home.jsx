import React, { useState, useEffect, useRef } from 'react';
// import { NavLink } from 'react-router-dom'
import Video from '../component/allvideo/Video';
// import { VideoData } from '../component/allvideo/videodata';
import ReactPaginate from 'react-paginate';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const Home = () => {
  const [allVIDEO, setAllVIDEO] = useState([]);

  const [pageNo, setPageNo] = useState(0);
  const his = useHistory();
  const perpage = 8;
  const pagevisit = pageNo * perpage;
  let videodata = allVIDEO.sort(() => Math.random() - 0.5);
  const data = videodata.slice(pagevisit, pagevisit + perpage);
  const boxno = Math.ceil(videodata.length / perpage);
  const pageChange = ({ selected }) => {
    setPageNo(selected);
  };
  const getallvideo = async () => {
    const res = await axios.get(
      'https://youtube-clone-back-end-production.up.railway.app/getallvideo'
    );
    // console.log(res.data)
    setAllVIDEO(res.data);
  };

  useEffect(() => {
    getallvideo();
  }, []);

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

  // console.log(allVIDEO.sort( ()=>Math.random()-0.5 ))

  if (!data.length) {
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
      <div className="alltag">
        <button className="btn btn-dark" onClick={() => his.push('/home')}>
          All
        </button>
        <button
          className="btn btn-light"
          onClick={() => his.push('/search/game')}
        >
          Gaming
        </button>
        <button
          className="btn btn-light"
          onClick={() => his.push('/search/music')}
        >
          Music
        </button>
        <button
          className="btn btn-light"
          onClick={() => his.push('/search/web+development')}
        >
          Web Development
        </button>
        <button
          className="btn btn-light"
          onClick={() => his.push('/search/computer+science')}
        >
          Computer Science
        </button>
        <button
          className="btn btn-light"
          onClick={() => his.push('/search/cricket')}
        >
          Cricket
        </button>
        <button
          className="btn btn-light"
          onClick={() => his.push('/search/meme')}
        >
          Memes
        </button>
        <button
          className="btn btn-light"
          onClick={() => his.push('/search/covid')}
        >
          Covid-19
        </button>
        <button
          className="btn btn-light"
          onClick={() => his.push('/search/web+series')}
        >
          Web Series
        </button>
        <button
          className="btn btn-light"
          onClick={() => his.push('/search/app+development')}
        >
          App Development
        </button>
      </div>
      <div className="home">
        <div className="container-fluid">
          <div className="row">
            {data.map((val, ind) => {
              return (
                <>
                  <Video
                    key={ind}
                    channel={val.channel}
                    channelthumb={val.channelthumb}
                    title={val.title}
                    tags={val.tags}
                    profile_image={val.profile_image}
                    views={val.views}
                    vid={val._id}
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
    </>
  );
};

export default Home;
