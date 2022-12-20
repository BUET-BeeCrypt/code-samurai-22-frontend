import { useEffect, useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import DatePicker from 'react-date-picker';

export default function LeftBar({projects, project, setProject, filter, setFilter}) {

  const exec = new Set()
  const agencies = new Set()
  projects.forEach(proj => {
    exec.add(proj.exec)
    // agencies.add(proj.affiliated_agency)
  })

  const [admin, setAdmin] = useState(false)

  const [value, onDateChange] = useState(filter.dateUpto);

  useEffect(() => {
    setFilter({...filter, dateUpto: value})
  }, [value])

  return <>
    <Form.Check type="checkbox" label='Show admin options' onChange={e => {setAdmin(e.target.checked)}} />
    <hr />
    <div style={{overflowX: 'scroll', padding: '5px', width: 'auto', whiteSpace: 'nowrap'}}>
      {/* <ButtonGroup> */}
        <Button variant={filter.exec ? 'secondary' : 'primary'} 
          className={'btn-sm'}
          onClick={e => {setFilter({...filter, exec: null})}}>All Exec</Button>
        {[...exec].map(category => <Button 
          variant={filter.exec !== category ? 'secondary' : 'primary'}
          className={'btn-sm'}
          onClick={e => {setFilter({...filter, exec: category})}}>{category}</Button>)}
      {/* </ButtonGroup> */}
    </div>
    <div style={{paddingTop: '5px', paddingBottom: '5px'}} className='mt-4'>
      Upto Date: <DatePicker onChange={onDateChange} value={value} className={'date-picker'} />
    </div>
    
    {admin && <div className="py-3">
      <hr />
      <h5>Admin: </h5>
      <Form.Control size="sm" type="text" placeholder="Search by Text" className="mt-4" onChange={e => {
          setFilter({...filter, title: e.target.value})
      }}/>
      <br />
      <div style={{overflowX: 'scroll', width: '100%', whiteSpace: 'nowrap'}}>
        <Button variant={filter.agency ? 'secondary' : 'primary'} 
          className={'btn-sm'}
          onClick={e => {setFilter({...filter, agency: null})}}>All Agencies</Button>
        {[...agencies].map(agency => <Button 
          variant={filter.agency !== agency ? 'secondary' : 'primary'}
          className={'btn-sm'}
          onClick={e => {setFilter({...filter, agency: agency})}}>{agency}</Button>)}
      </div>
      <br />
      <Form.Check type="checkbox" label='Sort by number of locations' onChange={e => {
        setFilter({...filter, sort: e.target.checked})
      }} />
    </div>}
    
    <hr />

    <ListGroup>
      { projects.map(p => <ListGroup.Item 
        action 
        key={p.project_id}
        active={project && project.project_id === p.project_id} onClick={() => {setProject(p)}}>
          {p.name}
        </ListGroup.Item>) 
      }
    </ListGroup>
  </>
}