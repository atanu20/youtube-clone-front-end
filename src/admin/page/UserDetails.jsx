import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserDetails = () => {
  const [title, setTitle] = useState('');

  const [profileimg, setProfileimg] = useState([]);
  const [show, setShow] = useState(false);
  const YoutubeUserId = localStorage.getItem('YoutubeUserId');
  const [profiledet, setProfiledet] = useState([]);
  const his = useHistory();
  const timeout = useRef(null);

  const notify = (msg) =>
    toast.error(msg, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

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

  const getData = async () => {
    const res = await axios.get(
      `https://youtube-clone-back-end-production.up.railway.app/profiledata/${YoutubeUserId}`
    );
    //  console.log(res.data.length)
    //  console.log(res.data)

    if (res.data.length) {
      setProfiledet(res.data);
      setShow(true);
    }
  };

  const onSub = async (e) => {
    e.preventDefault();
    // console.log(profileimg)

    if (profileimg.size > 4000000) {
      notify('File should be less then 4 MB');
    } else {
      if (
        profileimg.type === 'image/jpeg' ||
        profileimg.type === 'image/jpg' ||
        profileimg.type === 'image/png'
      ) {
        let formData = new FormData();
        formData.append('file', profileimg);
        formData.append('upload_preset', 'blogpost');

        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/du9emrtpi/image/upload',
          formData
        );
        //   console.log(res.data)
        const data = {
          profileimg: res.data.secure_url,
          channel: title,
          user_id: YoutubeUserId,
        };
        let ress = await axios.post(
          'https://youtube-clone-back-end-production.up.railway.app/profile',
          data
        );
        // console.log(res.data)
        if (ress.data.submit) {
          getData();
        }
      } else {
        notify('Only jpg ,jpeg and PNG');
      }
    }

    //     let formData=new FormData();
    //     formData.append("profileimg",profileimg)
    //     formData.append("channel",title)
    //     formData.append("user_id",YoutubeUserId)
    //     let res=await axios.post("https://youtube-clone-back-end-production.up.railway.app/profile",formData);
    //     // console.log(res.data)
    //     if(res.data.submit)
    //    {
    //      getData()

    //    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (!profiledet.length && show) {
    return (
      <>
        <div className="container">
          <h3>Loading . . .</h3>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="addvideo">
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-8 col-12 mx-auto">
              <div className="card p-3">
                {show ? (
                  <>
                    {profiledet.map((val, ind) => {
                      return (
                        <>
                          <div key={ind}>
                            <img
                              src={`${val.profile_image}`}
                              alt={val.profile_image}
                              className="proimgg"
                            />
                            <br />
                            <br />
                            <strong>Channel Name :</strong>
                            <h2>{val.channel}</h2>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <h3 className="text-center">Create Channel</h3>
                    <br />
                    <form onSubmit={onSub}>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Channel Name"
                          name="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="file"
                          class="form-control"
                          accept=".png,.jpeg,.jpg"
                          name="profileimg"
                          onChange={(e) => setProfileimg(e.target.files[0])}
                          required
                        />
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-info">
                          Create Channel
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
