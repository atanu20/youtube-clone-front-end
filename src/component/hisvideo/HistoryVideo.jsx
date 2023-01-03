import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
const HistoryVideo = ({ channel, thumbimg, title, vid, date, tagg }) => {
  const YoutubeUserId = localStorage.getItem('YoutubeUserId');
  const his = useHistory();
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
  return (
    <>
      <div className="col-12 mx-auto mb-3 bbb">
        {/* <NavLink to={`/video/${vid}`}> */}
        <div className="card p-3" onClick={() => redirectUrl(vid)}>
          <div className="his-img p-3">
            <img src={thumbimg} alt="chan" className="hisimg" />
          </div>
          <div className="his-det">
            <h4>{channel}</h4>

            <p>{title}</p>
            {tagg && (
              <>
                {' '}
                <p className="tag">
                  Tags: <span>{tagg}</span>{' '}
                </p>{' '}
              </>
            )}

            <small>{new Date(date).toDateString()}</small>
          </div>
        </div>
        {/* </NavLink> */}
      </div>
    </>
  );
};

export default HistoryVideo;
