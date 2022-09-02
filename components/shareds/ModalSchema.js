import React from 'react'
import { renderForm } from '../helpers';
import axios from 'axios';
import { useRouter } from 'next/router';
// import { createSchema } from '../../store/slices/schemas';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useLocation } from 'react-router-dom';

export default function ModalSchema({closer}) {
    // const { pathname } = useLocation();
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    const router = useRouter();
    const [schema, setSchema] = React.useState({});
    const [baseschema, setBasesSchema ] = React.useState({
        type: {type: "select", required: true, value: '', options: ['text', 'textarea', 'number', 'boolean', 'date', 'select']},
        required: {type: "boolean", required: true, value: ''},
    });
    const [baseprop, setBaseprop] = React.useState(
         {type: '', required: '', value: ''},
    );

    const handleChange = (e, cond) => {
        try{
            e.preventDefault();
            console.log(document.getElementById('entity-name').value);
            cond 
            ? setSchema({ 
                [document.getElementById('entity-name').value]: {
                    name : {
                        type: 'text',
                        required: true,
                        label: 'This is required to automate listing entities'
                    }
                }                 
                })
            : setSchema({ })
        }catch(e){
            console.log(e.message);
        }
    }

    const handleValue = (e) => {        
        setBaseprop({            
            ...baseprop,
            [e.target.name]: e.target.value
        })
        console.log(baseprop);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var prop_name = document.getElementById('property-name').value;
        prop_name.length > 0 &&
        setSchema({
            [Object.keys(schema)[0]]: {
                ...schema[Object.keys(schema)[0]],
                [prop_name]: {
                    ...baseprop,
                }
            }
        })
        setBaseprop({
            type: '', required: '', value: ''
        })   
        document.getElementById('property-name').value = '';
    }

    const setStoreSchema = async(e) => {
        e.preventDefault(); 
        const res = await  axios.post('http://localhost:3333/api/schemas', {
            data: schema
        });
        console.log(res);
        if(res.status === 200){
            console.log(res.data.message);
            closer();
            router.push('/list/schemas');
        }        
        
    }

    const callBackState = (res) => {        
        console.log(res);
        // if(res.status === 200){
            // alert('Schema created successfully');
            // setSchema({});            
            // !pathname.includes('list') 
            // ? navigate(`list/schemas/schemas`, {state: {selector:null }})                         
            // : closer(false)
        // } 
    }

  return (
    <>
    <form>
        <fieldset>
        <legend>Entity</legend>
        {Object.keys(schema).length === 0 ?
            <><input type="text" id="entity-name" placeholder='cars horses computers'/> <button onClick={(e)=>handleChange(e,true)}>Add</button></>
        :
            <><input type="text" id="entity-name" value={Object.keys(schema)[0]} disabled/><button onClick={(e)=>handleChange(e,false)}>Remove</button></>
        }
        </fieldset>
    </form>
    
    {Object.keys(schema).length > 0 ?
        <fieldset>
        <legend>Properties</legend>
            <label htmlFor='property-name'>Prop Name</label>
            <input type="text" id="property-name" placeholder="Property name"/>
            
            <div className='item'>
                {renderForm(baseschema, handleValue, handleSubmit)}
            </div>            
        </fieldset>
    :
    null
    }

    
        <>
            <pre>
                {schema !== null && JSON.stringify(schema, null, 2)}
            </pre>
            {
                Object.keys(Object.keys(schema)).length > 0 &&
                <button onClick={(e)=> setStoreSchema(e)}>Post Schema</button>
            }
        </>
    </>
  )
}
