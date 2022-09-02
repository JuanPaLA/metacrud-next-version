import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import axios from 'axios';

import {useRouter} from 'next/router';
export default function Footer() {
  const [ schemas, setSchemas] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:3333/api/schemas')
    .then(res => {
      setSchemas(res.data);
    }).catch(e => {
      setSchemas([]);
    })
  } ,[])

  const handleNavigation = (e) => {
    

  }
  return (
    <div className='box' style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
      <Link href="/">Home</Link>
      <Link href={"/list/schemas"}>Schemas</Link>      
      <>        
        {
          schemas && 
          <div className={'dropup'}>
          <button class="dropbtn">Entities</button>
          <div class="dropup-content">
          {(schemas).map((key,i) => (                        
            <Link href={`/list/${Object.keys(key)[1]}`}  key={key}>
              <pre>{Object.keys(key)[1]}</pre>
            </Link>
            
          ))}
          </div>
          </div>
          }
      </>
    </div>
  )
}
