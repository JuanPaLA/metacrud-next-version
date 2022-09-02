import React from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { renderForm } from '../../../../components/helpers';

export default function DetailContainer({ schema = false, entity = false, method = false }) {
  const router = useRouter();
  const { type, mode, id } = router.query;
  const [schematypes, setSchematypes] = React.useState(schema);
  const [state, setState] = React.useState(entity);
  const [approach, setApproach] = React.useState(mode);

  React.useEffect(() => {
    if (mode === 'view') {
      var flat_schema = structuredClone(schema);
      for (const property in flat_schema) {
        flat_schema[property].value = state[property];
      }
      setSchematypes(flat_schema);
    } else {

    }
  }, [state])

  const handleValue = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    var url;
    var response_text;
    method === 'POST' ? url = `http://localhost:3333/api/entities/${type}` : url = `http://localhost:3333/api/entities/${type}/${id}`;
    method === 'POST' ? response_text = 'creating' : response_text = 'updating';
    console.log(url);
    axios({
      url: url,
      method: method,
      data: state
    })
    .then((res) => {
      alert(`Success ${response_text} ${type}`);
      router.push(`/list/${type}`);
    })
    .catch((err) => {
      alert(`Error ${response_text} ${type}`);
      console.log(err);
    })
  }

  return (
    <div className='box'>
      {mode === 'create' &&
        <>
          <div className='item'>
            <h4>Create {type}</h4>
          </div>
          <div className="item">
            {renderForm(schematypes, handleValue, handleSubmit)}
          </div>
        </>
      }
      {mode === 'view' &&
        <>
          <div className='item'>
            <p
              onClick={() => setApproach("view")}
              style={{
                backgroundColor: approach === "view" ? "lightgray" : null,
                padding: "5px",
              }}
            >
              View
            </p>
            <p
              onClick={() => setApproach("edit")}
              style={{
                backgroundColor: approach === "edit" ? "lightgray" : null,
                padding: "5px",
              }}
            >
              Edit
            </p>
          </div>
          <div className='item'>
            {approach === "edit" && renderForm(schematypes, handleValue, handleSubmit)}
            {approach === "view" && state && (
              <div className={`grid-card-${type}`}>
                {Object.entries(state).map(([key, value]) => (
                  <div key={key} style={{ gridArea: key }} className="item-grid" id={`${type}-${key}`}>
                    {key !== 'id' && value}
                    {key === 'available' ? value ? 'Yes' : 'No' : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      }
      {method}
    </div>
  )
}

DetailContainer.getInitialProps = async ({ query: { type, mode, id } }) => {
  if (mode === 'create') {
    const schema = await axios.get(`http://localhost:3333/api/schemas/${type}`);
    return {
      schema: schema.data,
      method: 'POST'
    };
  } else {
    const schema = await axios.get(`http://localhost:3333/api/schemas/${type}`);
    const entity = await axios.get(`http://localhost:3333/api/entities/${type}/${id}`);
    return {
      entity: entity.data,
      schema: schema.data,
      method: 'PUT'
    };
  }
}