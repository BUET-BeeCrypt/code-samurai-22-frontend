import { useEffect, useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import DatePicker from 'react-date-picker';

function ConvertToCSV(json) {
  if (json.length === 0) return ''
  var fields = Object.keys(json[0])
var replacer = function(key, value) { return value === null ? '' : value } 
var csv = json.map(function(row){
  return fields.map(function(fieldName){
    return JSON.stringify(row[fieldName], replacer)
  }).join(',')
})
csv.unshift(fields.join(',')) // add header column
 csv = csv.join('\r\n');
 return csv
}

export default function LeftBar({projects, project, setProject, filter, setFilter}) {

  const exec = new Set()
  const agencies = new Set()
  projects.forEach(proj => {
    exec.add(proj.exec)
    // agencies.add(proj.affiliated_agency)
  })

  const [value, onDateChange] = useState(filter.dateUpto);

  useEffect(() => {
    setFilter({...filter, dateUpto: value})
  }, [value])

  return <>
    {/* <Form.Check type="checkbox" label='Show admin options' onChange={e => {setAdmin(e.target.checked)}} /> */}
    {/* <hr /> */}
    <div style={{overflowX: 'scroll', padding: '5px', width: 'auto', whiteSpace: 'nowrap'}}>
      {/* <ButtonGroup> */}
        <Button variant={filter.exec ? 'secondary' : 'primary'} 
          className={'btn-sm'}
          onClick={e => {setFilter({...filter, exec: null})}}>All Agency</Button>
        {[...exec].map(category => <Button 
          variant={filter.exec !== category ? 'secondary' : 'primary'}
          className={'btn-sm'} style={{marginLeft: '5px'}}
          onClick={e => {setFilter({...filter, exec: category})}}>{category}</Button>)}
      {/* </ButtonGroup> */}
    </div>
    <Form.Control size="sm" type="text" placeholder="Search by Text" className="mt-4" onChange={e => {
          setFilter({...filter, title: e.target.value})
      }}/>
    <div style={{paddingTop: '5px', paddingBottom: '5px'}} className='mt-4'>
      Upto Date: <DatePicker onChange={onDateChange} value={value} className={'date-picker'} />
    </div>
    
    {/* {admin && <div className="py-3">
      <hr />
      <h5>Admin: </h5>
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
    </div>} */}

    <hr />
    Download:&nbsp;
    <a id="downloadAnchorElem" style={{display:"none"}}></a>
    <Button variant="primary" size="sm" block onClick={() => { 
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects));
      const dlAnchorElem = document.getElementById('downloadAnchorElem');
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", "filtered-data.json");
      dlAnchorElem.click();
    }}>JSON</Button>
    &nbsp; &nbsp;
    <Button variant="primary" size="sm" block onClick={() => { 
      const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(ConvertToCSV(projects));
      const dlAnchorElem = document.getElementById('downloadAnchorElem');
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", "filtered-data.csv");
      dlAnchorElem.click();
    }}>CSV</Button>

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