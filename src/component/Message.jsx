import React,{useState,useEffect} from 'react'
import axios from 'axios'
const Message = ({uid,videoid}) => {
    
    const [show, setShow] = useState(false)
    const [msg, setMsg] = useState("")
    const [allmsg, setALLMsg] = useState([])


  const getmsg=async()=>{
      const res=await axios.get(`https://first-mongoapp.herokuapp.com/mymsgdata/${videoid}`)
      if(res.data.length)
      {
        setALLMsg(res.data)
      }
      else{
        setALLMsg([])
      }

    }

    const onSub=async(e)=>{
        e.preventDefault()
        

        const res= await axios.get(`https://first-mongoapp.herokuapp.com/myalldata/${uid}`)
        const data={
            name:res.data.name,
            profile_image:res.data.profile_image,
            videoid:videoid,
            message:msg,
            usid:uid
        }
        const ress= await axios.post(`https://first-mongoapp.herokuapp.com/postmsg`,data)
        if(ress.data.submit)
        {
            getmsg()
        }

        setMsg("")
        setShow(true)
    }

useEffect(() => {
    getmsg()
}, [videoid])
useEffect(() => {
    getmsg()
}, [])
// videoid


    return (
        <>
        
        <div className="addmsg">
            <form onSubmit={onSub}>
            <div class="form-group">
  
  <input type="text" placeholder="Write Your Message" class="form-control" name="msg" value={msg} onChange={(e)=>setMsg(e.target.value)} autoComplete="off" required/>
  <button type="submit" className="btn btn-dark m-2">Send</button>
</div>
            </form>
            
        </div>
         <div className="accordion-box">
             <div className="title-bo">
            <p>All Messages</p>
            <div className="drop" onClick={()=>setShow(!show)}>
                {
                    show ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>
                }
               
            </div>
           
             </div>
             {
                 show &&  <div className="allmsg">
                 <div className="msgbox">
                     {
                         !allmsg.length && (
                             <>
                             <div className="msgg" >
                                 <h3>Sorry ther is no message ...</h3>

                             </div>
                             </>
                         )
                     }

                     {
                         allmsg.map((val,ind)=>{
                             return(
                                 <>
                                 <div className="msgg" key={ind}>
                    <img src={`../profile/${val.profile_image}`} alt={val.profile_image} className="vimg" />
                    <h5>{val.name}</h5>
                    </div>
                    <p>{val.message}</p>
                     

                                 </>
                             )
                         })
                     }
                        </div>         
                   
                 </div>
             }
            
         </div>
            
        </>
    )
}

export default Message
