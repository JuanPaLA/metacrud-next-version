import React from 'react'
import Link from 'next/link';
import axios from 'axios';
import {useRouter} from 'next/router';
import CreateSchema from '../../components/shareds/CreateSchema';

export default function ListContainer({abstraction, list }) {
    const router = useRouter();
    const { type } = router.query;    

    const handleDelete = (type, abstraction, id) => {      
      if(type === 'schemas'){
        axios({
          method: 'DELETE',
          url: `http://localhost:3333/api/${type}/${id}`
        })
        .then(res => {
          alert('Success deleting schema');
          router.push(`/list/${type}`);
        })
        .catch(e => console.log(e))
      }else{
        axios({
          method: 'DELETE',
          url: `http://localhost:3333/api/entities/${type}/${id}`
        })
        .then(res => {
          if(res.status === 200){
            alert(`Success deleting ${type}`);
          }
          router.push(`/list/${type}`);
        })
        .catch(e => console.log(e))
      }
    }

  return (
    <div className='box'>
      <div className='item'>
        <h4>List {abstraction} {type} </h4>
      </div>

      {list && type === 'schemas' && list.map((item, index) => {
            return (
              <div key={index} className='item' style={{alignItems: 'center'}}>
                <Link href={`/list/${Object.keys(item)[1]}`}>
                    <pre>{Object.keys(item)[1]}</pre>
                </Link>
                    <span onClick={(e)=>handleDelete(type, abstraction, Object.values(item)[0])}>(X)</span>
              </div>
            )            
        }        
        )}

        {list && type !== 'schemas' && list.map((item, index) => {
            return (
              <div key={index} className='item' style={{alignItems: 'center'}}>
                <Link href={`/detail/${type}/view/${item._id}`}>
                    <pre>{item.name}</pre>
                </Link>
                    <span onClick={(e)=>handleDelete(type, abstraction, Object.values(item)[0])}>(X)</span>
              </div>
            )            
        }        
        )}

        { type === 'schemas' 
        ? <CreateSchema closer={() => router.push('/list/schemas')}/>
        : <button onClick={()=>router.push(`/detail/${type}/create/false`)}>Create new {type}</button>}
    </div>
  )
}

ListContainer.getInitialProps = async ( {query: {type}} ) => {
    let abstraction = type === 'schemas' ? 'schemas' : 'entities';
    if (type === 'schemas') {
      const res = await axios.get(`http://localhost:3333/api/${type}`);
      const data = await res.data;
      return { 
        abstraction: abstraction,
        list: data
       };
    }else{
      const res = await axios.get(`http://localhost:3333/api/entities/${type}`);
      const data = await res.data;
      return { 
        abstraction: abstraction,
        list: data        
       };
    }
    
}
