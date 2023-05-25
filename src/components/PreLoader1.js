import React, {useEffect, useState} from 'react';
import ReactLoading from 'react-loading';
import Recordoutput from './Recordoutput';

function PreLoader1() {

  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);

  useEffect(() => {
    // setTimeout(()=>{
      fetch(Recordoutput)
      .then(response => response.json())
      .then(json => {
        setData(json);
        setDone(true);
      })
    // }, 2000)
    

  }, [])

  return (
    <>
    {
      !done ? <ReactLoading type={"bars"} color={"green"} height={200} width={300} />
      : 
      <ul>
        {
          data.map(post => 
          <li key={post.id}>{post.title}</li>
          )
        }
      </ul>
    }  
    </>
  );
}

export default PreLoader1