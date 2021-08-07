import React,{useState,useEffect,useRef} from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
const AddVideo = () => {
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [tag, setTag] = useState("")
    const YoutubeUserId=localStorage.getItem('YoutubeUserId')
  const [channelname,setChannelName]=  useState("")
  const [channelimage,setChannelImage]=  useState("")
 const his= useHistory()
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


 
const getchannel=async()=>{
    const res=await axios.get(`https://first-mongoapp.herokuapp.com/profiledata/${YoutubeUserId}`)
    if(res.data.length)
    {
        setChannelName(res.data[0].channel)
        setChannelImage(res.data[0].profile_image)
    }
}
useEffect(() => {
    getchannel()
}, [])

    const onSub=async(e)=>{
        e.preventDefault()

  let urlthumb=""
  if(url.indexOf("https://www.youtube.com/watch?v=") !==-1)
  {
    let vid=url.split("v=")[1].substring(0,11);
     urlthumb=`http://img.youtube.com/vi/${vid}/hqdefault.jpg`;

  }
  else if(url.indexOf("https://youtu.be/") !==-1)
  {
    let vid=url.split("be/")[1].substring(0,11);
     urlthumb=`http://img.youtube.com/vi/${vid}/hqdefault.jpg`;
  }

        const data={
            channel:channelname,
            profile_image:channelimage,
            title:title,
            urlthumb:urlthumb,
            url:url,
            tag:tag,
            userid:YoutubeUserId
        }
        // console.log(data)
        const ress=await axios.post('https://first-mongoapp.herokuapp.com/addvideo',data)
        if(ress.data)
        {
            his.push('/dashboard')
        }
    }

    if(!channelname)
    {
        return (
            <>
            <Navbar/>
            <div className="addvideo">
            <div className="container p-5">
              <h3>Sorry There is no channel on this acccount . . .</h3>
              <button className="btn btn-info" onClick={()=>his.push('/userdetails')}>Create Channel</button>
            </div>
            </div>
    
            </>
          )
    }
    return (
        <>
        <Navbar/>
        <div className="addvideo">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-8 col-12 mx-auto">
                       <div className="card p-3">
                           <h3 className="text-center">Add Video</h3>
                           <br />
                           <form onSubmit={onSub}>
                        <div class="form-group">
                      
                        <input type="text" class="form-control" placeholder="Write Title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
                        </div>
                        <div class="form-group">
                      
                        <input type="text" class="form-control" placeholder="Enter Video Url" name="url" value={url} onChange={(e)=>setUrl(e.target.value)} required />
                        </div>
                        <div class="form-group">
                      
                        <input type="text" placeholder="Enter Tags" class="form-control" name="tag" value={tag} onChange={(e)=>setTag(e.target.value)} required />
                      </div>
                        
                        <div className="text-center">
                            <button type="submit" className="btn btn-info">Add Video</button>
                        </div>
                        </form>
                       </div>
                    </div>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default AddVideo
