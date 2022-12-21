import { useRef } from "react";
import { Container } from "react-bootstrap";
import { addProposal } from "../api";

export default function AddProposal() {

    const projectIDRef = useRef();
    const nameRef = useRef();
    const proposedDateRef = useRef();
    const costRef = useRef();
    const goalRef = useRef();
    const agencyRef = useRef();
    const timespanRef = useRef();
    const locationRef = useRef();
    const latitudeLongtitudeRef = useRef();

    return <>
        <Container>
        <form onSubmit={e => {
            e.preventDefault()
            console.log({
                project_id: projectIDRef.current.value, 
                name: nameRef.current.value, 
                proposal_date: proposedDateRef.current.value, 
                cost: Number.parseFloat(costRef.current.value), 
                exec: agencyRef.current.value, 
                goal: goalRef.current.value, 
                timespan: Number.parseInt(timespanRef.current.value), 
                location: locationRef.current.value, 
                latitude: Number.parseFloat(latitudeLongtitudeRef.current.value.split(',')[0]), 
                longitude: Number.parseFloat(latitudeLongtitudeRef.current.value.split(',')[1])
            });

            addProposal({
                project_id: projectIDRef.current.value, 
                name: nameRef.current.value, 
                proposal_date: proposedDateRef.current.value, 
                cost: Number.parseFloat(costRef.current.value), 
                exec: agencyRef.current.value, 
                goal: goalRef.current.value, 
                timespan: Number.parseInt(timespanRef.current.value), 
                location: locationRef.current.value, 
                latitude: Number.parseFloat(latitudeLongtitudeRef.current.value.split(',')[0]), 
                longitude: Number.parseFloat(latitudeLongtitudeRef.current.value.split(',')[1])
            }).then(d => {
                [projectIDRef, nameRef, proposedDateRef, costRef, goalRef, agencyRef, timespanRef, locationRef, latitudeLongtitudeRef].forEach(ref => ref.current.value = '');
            });
        }}>
        <h2 className="mb-4">Add Project Proposal</h2>
        <div className="form-group row mb-4">
          <label className="col-3 col-form-label" htmlFor="text" /> 
          <div className="col-9">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">Project ID</div>
              </div> 
              <input ref={projectIDRef} id="text" name="text" placeholder="propXXXXX" type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div className="form-group row mb-4">
          <label htmlFor className="col-3 col-form-label">Name</label> 
          <div className="col-9">
            <input ref={nameRef} name type="text" className="form-control" />
          </div>
        </div>
        <div className="form-group row mb-4">
          <label htmlFor className="col-3 col-form-label">Location</label> 
          <div className="col-9">
            <input ref={locationRef} name type="text" className="form-control" />
          </div>
        </div>
        <div className="form-group row mb-4">
          <label htmlFor className="col-3 col-form-label">Latitude,Longitude</label> 
          <div className="col-9">
            <input ref={latitudeLongtitudeRef} name type="text" className="form-control" />
          </div>
        </div>
        <div className="form-group row mb-4">
          <label htmlFor className="col-3 col-form-label">Timespan (in years)</label> 
          <div className="col-9">
            <input ref={timespanRef} name type="text" className="form-control" />
          </div>
        </div>
        <div className="form-group row mb-4">
          <label htmlFor className="col-3 col-form-label">Goal</label> 
          <div className="col-9">
            <input ref={goalRef} name type="text" className="form-control" />
          </div>
        </div>
        <div className="form-group row mb-4">
          <label htmlFor className="col-3 col-form-label">Executive Agency</label> 
          <div className="col-9">
            {/* <input ref={agencyRef} name type="text" className="form-control" /> */}
            <select ref={agencyRef} name className="custom-select">
              {['LGED', 'RDA', 'BREB', 'BWDB', 'BPDB', 'BTRC', 'BBA', 'PWD', 'LGD' , 'MOEDU', 'ECNEC', 'MOP'].map(agency => <option value={agency} key={agency}>{agency}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group row mb-4">
          <label htmlFor className="col-3 col-form-label">Cost in Millions</label> 
          <div className="col-9">
            <input ref={costRef} name type="text" className="form-control" />
          </div>
        </div>
        <div className="form-group row mb-4">
          <label htmlFor className="col-3 col-form-label">Proposed Date</label> 
          <div className="col-9">
            <input ref={proposedDateRef} name type="text" className="form-control" placeholder="YYYY-MM-DD" />
          </div>
        </div> 
        <div className="form-group row mb-4">
          <div className="offset-3 col-9">
            <button name="submit" type="submit" className="btn btn-primary">Create</button>
          </div>
        </div>
      </form>
  </Container>
    </>
}