import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../component/Navbar';
const Videomessage = () => {
  const { id } = useParams();
  const [allmsg, setAllmsg] = useState([]);

  const his = useHistory();
  const timeout = useRef(null);
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

  const getmsg = async () => {
    const res = await axios.get(
      `https://youtube-clone-node.onrender.com/videomsg/${id}`
    );
    setAllmsg(res.data.reverse());
    // console.log(res.data.reverse())
  };
  useEffect(() => {
    getmsg();
  }, [id]);
  if (!allmsg.length) {
    return (
      <>
        <Navbar />
        <div className="addvideo">
          <div className="container p-5">
            <h3>No Messages . . .</h3>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="vmsgg">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-12 mx-auto">
              <div className="row ">
                {allmsg.map((val, ind) => {
                  return (
                    <>
                      <div className="card mb-3" key={ind}>
                        <div className="msgf">
                          <img
                            src={
                              val.profile_image
                                ? `${val.profile_image}`
                                : '../profile/pro.png'
                            }
                            alt={val.profile_image}
                            className="vimg"
                          />
                          <h5 className="pl-3 pt-3">{val.name}</h5>
                        </div>

                        <p>{val.message}</p>
                        <small>{new Date(val.createdAt).toDateString()}</small>
                      </div>
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

export default Videomessage;
