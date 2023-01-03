import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { NavLink, useHistory, useParams } from 'react-router-dom';
// import { VideoData } from '../component/allvideo/videodata'
import Navbar from '../component/Navbar';
import Message from '../component/Message';
import axios from 'axios';
const Details = () => {
  const { id } = useParams();
  const timeout = useRef(null);
  const [allVIDEO, setAllVIDEO] = useState([]);

  const [noOfEle, setNoOfEle] = useState(10);
  const [showAllVideo, setShowAllVideo] = useState(false);
  const [idvideo, setIDVIDEO] = useState([]);
  // const [data,setDATA]=useState([])
  const [allsub, setAllsub] = useState('');
  const YoutubeUserId = localStorage.getItem('YoutubeUserId');

  const [checksubb, setCheckSubb] = useState(false);
  const [checklikes, setCheckLikes] = useState(false);

  const his = useHistory();

  const getidvideo = async () => {
    const res = await axios.get(
      `https://youtube-clone-node.onrender.com/getidvideo/${id}`
    );
    setIDVIDEO(res.data);
  };

  const checksub = async () => {
    const res = await axios.get(
      `https://youtube-clone-node.onrender.com/getidvideo/${id}`
    );
    const data = {
      channel: res.data[0].channel,
      uid: YoutubeUserId,
    };
    const ress = await axios.post(
      `https://youtube-clone-node.onrender.com/checksubscribe`,
      data
    );
    if (ress.data.status) {
      setCheckSubb(true);
    } else {
      setCheckSubb(false);
    }
  };

  const checklike = async () => {
    // const res=await axios.get(`https://youtube-clone-node.onrender.com/getidvideo/${id}`)
    const data = {
      vid: id,
      uid: YoutubeUserId,
    };
    const ress = await axios.post(
      `https://youtube-clone-node.onrender.com/checklike`,
      data
    );
    if (ress.data.status) {
      setCheckLikes(true);
    } else {
      setCheckLikes(false);
    }
  };

  const checktotalsub = async () => {
    const res = await axios.get(
      `https://youtube-clone-node.onrender.com/getidvideo/${id}`
    );
    const data = {
      channel: res.data[0].channel,
    };
    const ress = await axios.post(
      `https://youtube-clone-node.onrender.com/checktotalsub`,
      data
    );
    if (ress.data) {
      setAllsub(ress.data.subscriber);
    }
  };

  const getallvideo = async () => {
    const res = await axios.get(
      'https://youtube-clone-node.onrender.com/getallvideo'
    );

    setAllVIDEO(res.data);
  };

  useEffect(() => {
    getallvideo();
  }, []);

  const VideoData = allVIDEO.sort(() => Math.random() - 0.5);
  const data = VideoData.slice(0, noOfEle);

  useEffect(() => {
    window.scrollTo(0, 0);
    getidvideo();
  }, [id]);

  useEffect(() => {
    //    console.log(VideoData.length)
    //    console.log(noOfEle)

    if (VideoData.length) {
      if (VideoData.length < noOfEle) {
        setShowAllVideo(true);
      }
    }
  }, [noOfEle]);

  //    useEffect(() => {
  //        console.log(allVIDEO)

  //     setDATA( )
  //    }, [])
  const getLoad = () => {
    setNoOfEle(noOfEle + 5);
  };

  const updateSub = async (channelname) => {
    const data = {
      channel: channelname,
      userid: YoutubeUserId,
    };
    const res = await axios.post(
      'https://youtube-clone-node.onrender.com/subscribe',
      data
    );
    checksub();
    checktotalsub();
    // console.log(res.data)
  };

  const updateLike = async (vid) => {
    const dataata = {
      vid: vid,
      uid: YoutubeUserId,
    };
    const data = {
      videoid: vid,
    };

    const result = await axios.post(
      `https://youtube-clone-node.onrender.com/savelike`,
      dataata
    );

    const res = await axios.post(
      'https://youtube-clone-node.onrender.com/dolike',
      data
    );
    getidvideo();
    checklike();
    // console.log(result.data)
    // // checksub()
    //  console.log(res.data)
  };

  useEffect(() => {
    checksub();
    checklike();
    checktotalsub();
    // getlikes()
  }, [id]);

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

  const redirectUrl = async (id) => {
    const data = {
      vid: id,
      uid: YoutubeUserId,
    };
    const result = await axios.post(
      `https://youtube-clone-node.onrender.com/savehistory`,
      data
    );
    // console.log(result.data)
    await axios.get(
      `https://youtube-clone-node.onrender.com/postidviews/${id}`
    );

    his.push(`/video/${id}`);
  };

  if (!idvideo.length) {
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

      <div className="details">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 col-12 mb-3">
              <div className="card p-5">
                {idvideo.map((val, ind) => {
                  return (
                    <>
                      <ReactPlayer
                        url={val.channelvideo}
                        width="100%"
                        height="450px"
                        controls
                      />
                      <div className="video-det p-3">
                        <div className="lef">
                          <img
                            src={`${val.profile_image}`}
                            alt={val.profile_image}
                            className="vimg"
                          />
                          <div className="pl-3">
                            <h5>{val.channel}</h5>
                            {allsub} Subscribers
                          </div>
                        </div>
                        <div className="righ">
                          <div className="heart">
                            {checklikes ? (
                              <>
                                <i
                                  class="fa fa-heart m-1"
                                  aria-hidden="true"
                                ></i>{' '}
                                <span className="pl-1 pr-5">{val.likes}</span>
                              </>
                            ) : (
                              <>
                                <i
                                  class="fa fa-heart-o m-1"
                                  aria-hidden="true"
                                  onClick={() => updateLike(val._id)}
                                ></i>{' '}
                                <span className="pl-1 pr-5">{val.likes}</span>
                              </>
                            )}
                          </div>
                          <div className="heart">
                            <i class="fa fa-eye m-1" aria-hidden="true"></i>{' '}
                            <span className="pl-1 pr-1">{val.views}</span>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="text-right">
                        <button
                          className="btn btn-danger"
                          onClick={() => updateSub(val.channel)}
                          disabled={checksubb}
                        >
                          Subscriber Now
                        </button>
                      </div>
                      <br />
                      <p>{val.title}</p>
                      <p className="tag">
                        Tags: <span>{val.tags}</span>{' '}
                      </p>
                    </>
                  );
                })}

                <Message uid={YoutubeUserId} videoid={id} />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-3 right-side">
              {data.map((val, ind) => {
                return (
                  <>
                    {/* <NavLink to={`/video/${val._id}`} key={ind}> */}
                    <div
                      className="card p-3 mb-3"
                      onClick={() => redirectUrl(val._id)}
                    >
                      <div className="recv ">
                        <img
                          src={val.channelthumb}
                          alt={val.channelthumb}
                          className="recimg"
                        />
                        <div className="pl-3">
                          <p>{val.channel} </p>
                          <p>{val.title}</p>
                        </div>
                      </div>
                    </div>
                    {/* </NavLink> */}
                  </>
                );
              })}

              <br />
              <br />
              {showAllVideo ? (
                <>
                  <button
                    className="btn btn-danger pt-2"
                    disabled={showAllVideo}
                  >
                    NO More Data
                  </button>
                </>
              ) : (
                <button className="btn btn-danger pt-2" onClick={getLoad}>
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
