import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAllHistory } from '../services/allAPI';
import Button from 'react-bootstrap/Button';
import { deleteAHistory } from '../services/allAPI';



function WatchHistory() {
  const [history,setHistory] = useState([ ])

    const watchHistory = async()=>{
    const {data} = await getAllHistory()
      console.log(data);
      setHistory(data)
    

  }
  console.log(history);
 //to remove watch history
  const removeAHistory = async(id)=>{
    await deleteAHistory (id)
    watchHistory()
  } 
  useEffect(()=>{
    watchHistory()
  },[])

  return (
    <>
    <div className='container d-flex mt-5 justify-content-between'>
      <h3>Watch History</h3>
      <Link to={'/Home'} className='d-flex align-items-center' style={{textDecoration:'none',color:'white',fontSize:'20px'}}>back to home</Link>
      </div>
      <table className='table m-5 mb-5 container'>
        <thead>
          <tr>
            <th >#</th>
            <th >caption</th>
            <th >url</th>
            <th >Time Stamp</th>
            <th>action</th>


          </tr>
        </thead>
        <tbody>
        {history?.length>0?
        history?.map((item, index)=>(
          <tr>
          <td>{index+1}</td>
          <td>{item.caption}</td>
          <td><a href={item.youTubeLink} target='_blank'> {item.youTubeLink}</a></td>
          <td>{item.timestamp}</td>
          <td>                <Button  onClick={()=>removeAHistory(item?.id)}  variant="primary"><i class="fa-solid fa-trash"></i></Button>
</td>
        </tr>
        ))
        :<p>nothig to display</p>}
        </tbody>
        </table>
        </>
        
  )
}

export default WatchHistory