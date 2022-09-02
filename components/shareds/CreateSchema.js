import React,{useState} from 'react'
import ModalSchema from './ModalSchema'

export default function CreateSchema() {
    const [modal, setModal] = useState(false);

  return (
    <React.Fragment>
        <button onClick={()=>setModal(!modal)}>Create your own schema</button>
        {modal && 
        <div className='modal'>
            <div className='modal-content'>
                <h4>Create your own Schema</h4>
                <div>
                    <ModalSchema closer={setModal}/>
                </div>
                <div>
                    <button onClick={()=>setModal(!modal)}>(X)</button>
                </div>
            </div>
        </div>
        }
    </React.Fragment>
  )
}
