import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const his = useHistory();

  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState('');

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
        if (response.data.login) {
          his.push('/home');
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

  const onSub = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    const ress = await axios.post(
      'https://youtube-clone-back-end-production.up.railway.app/register',
      data
    );
    // console.log(ress.data)
    if (ress.data.msg) {
      if (ress.data.msg === 'registe done') {
        his.push('/');
      } else {
        setStatus(true);
        setMsg(ress.data.msg);
      }
    }
    // else
    // {

    //   if(ress.data.status)
    //     {
    //         his.push("/")
    //     }
    // }
    // if(ress.data.status)
    // {
    //     his.push("/")
    // }else{
    //        setStatus(true)
    //   setMsg("email already present")
    // }
  };
  return (
    <>
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-md-11 col-12 mx-auto">
              <div className="card">
                {status ? (
                  <>
                    <div className="alert alert-primary alert-dismissible fade show ">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        onClick={() => setStatus(false)}
                      >
                        &times;
                      </button>
                      <p>{msg}</p>
                    </div>
                  </>
                ) : null}

                <div className="row">
                  <div className="col-md-6 col-12 mx-auto mb-3 order-lg-1 order-md-1 order-2">
                    <h3 className="text-center">Register Now</h3>
                    <br />
                    <form onSubmit={onSub}>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="*Enter Name"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="*Enter Email"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="*Enter Password"
                          required
                        />
                      </div>
                      <br />
                      <div className="text-center">
                        <button type="submit" className="btn btn-info">
                          Register Now
                        </button>
                      </div>
                      <br />
                      <NavLink to="/">Already have an Account</NavLink>
                    </form>
                  </div>

                  <div className="col-md-6 col-12 mx-auto mb-3 d-flex justify-content-center align-items-center order-lg-2 order-md-2 order-1">
                    <img
                      src="../image/register.svg"
                      alt="register"
                      className="regimg "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
