import React,{useState,useEffect,useRef} from 'react'
import Navbar from '../component/Navbar'
import ReactPlayer from 'react-player'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
const Dashboard = () => {
  const [allvideo,setAllVideo]=  useState([])
  const [allsub,setAllsub]=useState("")
  const YoutubeUserId=localStorage.getItem('YoutubeUserId')
  const his=useHistory()
  const timeout = useRef(null)
  const checkAuth=()=>{
    axios.get("https://first-mongoapp.herokuapp.com/isAuth",{
        headers:{
         "x-access-token":localStorage.getItem("Youtubetoken")
        }
    }).then((response)=>{
     //  console.log()
     if(!response.data.login)
     {
         his.push("/");
     }
    })
 
 }

 useEffect(()=>{
     timeout.current=setTimeout(checkAuth,10)
     return function(){
         if(timeout.current)
         {
             clearTimeout(timeout.current)
         }
     }
    //   checkAuth()
    

 },[])



    const getdata=async()=>{
        const res=await axios.get(`https://first-mongoapp.herokuapp.com/getvideo/${YoutubeUserId}`)
        // console.log(res.data)
        if(res.data.length)
        {
            setAllVideo(res.data)
        }
    }
    



    const checktotalsub=async()=>{
        const res=await axios.get(`https://first-mongoapp.herokuapp.com/getmychannel/${YoutubeUserId}`)
        
      if(res.data)
      {
        setAllsub(res.data.subscriber)

      }
     
     
      }


      useEffect(() => {
        checktotalsub()
        getdata()
        
    }, [])








    if(!allvideo.length)
    {
        return (
            <>
            <Navbar/>
            <div className="addvideo">
            <div className="container p-5">
              <h3>Sorry There is no Video on this acccount . . .</h3>
              <button className="btn btn-info" onClick={()=>his.push('/addvideo')}>Upload Video</button>
            </div>
            </div>
    
            </>
          )

    }
    return (
        <>
       <Navbar/>
       <div className="dashboard">
           <div className="container-fluid">
               <button className="btn btn-danger"> {allsub} &nbsp; Subscribers</button>
               <br /><br />
               <h3>ALL VIDEOS</h3>
               <br />
               <div className="row">
{
    allvideo.map((val,ind)=>{
        return(
            <>
            <div className="col-lg-3 col-md-6 col-12 mb-4" key={ind}>
                       <div className="card">
                       <ReactPlayer  url={val.channelvideo}  width='100%'  height='250px'  controls /> 
                       <div className="p-3">
                           <p>{val.title}</p>
                           <p>{new Date(val.createdAt).toDateString()}</p>
                           <div className="detb">
                               <p> <i className="fa fa-heart"></i> <span>{val.likes}</span> </p>
                               <p> <i className="fa fa-commenting" onClick={()=>his.push(`/allmessage/${val._id}`)}></i> <span>0</span> </p>
                               <p> <i className="fa fa-eye"></i> <span>{val.views}</span> </p>
                           </div>
                       </div>
                       </div>
                       </div>
            </>
        )
    })


}
                   

               </div>
           </div>

       </div>
            
        </>
    )
}

export default Dashboard
