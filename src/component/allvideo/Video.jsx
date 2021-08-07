import React,{useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios'
const Video = ({vid,channel,channelthumb,title,tags,profile_image,views}) => {
    const YoutubeUserId=localStorage.getItem('YoutubeUserId')

const his=useHistory()
const redirectUrl=async(id)=>{
    const data={
        vid:id,
        uid:YoutubeUserId
    }
    const result=await axios.post(`https://first-mongoapp.herokuapp.com/savehistory`,data)
    // console.log(result.data)
    await axios.get(`https://first-mongoapp.herokuapp.com/postidviews/${id}`)
    
    
    his.push(`/video/${id}`)

}

    // const [ta, setTags] = useState([])
    // const tagfun=(tags)=>{
    //     const myArr = tags.split(",");
    //     let data=Object.assign({},myArr )
    //     // return data
    //     //  setTags(data)
    //     //   console.log(ta)
    //     // myArr.map((val)=>{
    //     //     console.log('#'+val)
    //     // })
    // }
    // if(!ta.length)
    // {
    //     return <p>wait</p>


    // }
    
    return (
        <>
         <div className="col-lg-3 col-md-6 col-12 mb-4 homv">
                    {/* <NavLink to={`/video/${vid}`}> */}
                    <div className="card " onClick={()=>redirectUrl(vid)}>
                         <img src={channelthumb} alt="all" className="youtube-thumb" />
                         <div className="channel">
                             <img src={`../../profile/${profile_image}`} alt={profile_image} className="channel-img" />
                            <div className="namedet">
                            <h4>{channel}</h4>
                            {views} views
                            </div>
                         </div>
                         <div className="p-3">
                             <p>{title} </p>
                             <p className="tag">Tags: <span >{tags}</span> </p>
                             
                                 {/* {
                                    tagfun(tags)
                                    
                                 } */}
                                 <p>
                                 {/* {
                                     ta.map((val,ind)=>{
                                            return(
                                                <>
                                                '#'+{val}
                                                </>
                                            )
                                     })
                                 } */}
                             </p>

                         </div>
                     </div>
                    {/* </NavLink> */}
                   </div>
            
        </>
    )
}

export default Video
