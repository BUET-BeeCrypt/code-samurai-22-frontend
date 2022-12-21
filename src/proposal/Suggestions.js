import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { getSuggestions } from "../api"

export default function Suggestion() {

    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        getSuggestions().then(setSuggestions)
    }, [])

    return <>
        <Table striped bordered hover size="sm">
        <thead>
        <tr>
          <th>Project ID</th>
          <th>Name</th>
          <th>Location</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Executive</th>
          <th>Cost</th>
            <th>Timespan</th>
          <th>Start Date (Optimized)</th>
          <th>End Date  (Optimized)</th>
        </tr>
      </thead>
        <tbody>
            {suggestions.map(({name,location,latitude,longitude,exec,cost,timespan,project_id,goal, start_date, end_date}) => (
            <tr key={project_id}>
                <td>{project_id}</td>
                <td>{name}</td>
                <td>{location}</td>
                <td>{latitude}</td>
                <td>{longitude}</td>
                <td>{exec}</td>
                <td>{cost}</td>
                <td>{timespan}</td>
                <td>{start_date}</td>
                <td>{end_date}</td>
            </tr>
            ))}
        </tbody>
        </Table>
    </>
}