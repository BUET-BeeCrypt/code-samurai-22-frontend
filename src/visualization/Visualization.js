import { useLoadScript } from "@react-google-maps/api";
import Papa from 'papaparse'
import { useEffect, useState } from "react";
import LeftBar from "./Left-Bar";
import Map from "./Map";
import "./styles.css";
import RightBar from "./Right-Bar";
import { getAllProjects } from "../api";

export default function Visualization() {

  const [projects, setProjects] = useState([])
  const [project, setProject] = useState(null)
  const [filtered, setFiltered] = useState([])
  const [filter, setFilter] = useState({
    exec: null,
    dateUpto: null,
    title: null,
    agency: null,
    sort: null
  })

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCLU4VA5Xc0zhK9TGQCAnKLrZBTOyAxmXY" // Add your API key
  });

  useEffect(() => {
    getAllProjects().then(
      setProjects
    )
  }, []);

  useEffect(() => {
    let filtered = projects
    if (filter.exec) filtered = filtered.filter(proj => (proj.exec === filter.exec));
    if (filter.agency) filtered = filtered.filter(proj => (proj.affiliated_agency === filter.agency));
    if (filter.title) filtered = filtered.filter(proj => (proj.name.toLowerCase().includes(filter.title.toLowerCase())))
    if (filter.dateUpto) filtered = filtered.filter(proj => {
      const projEnd = new Date(Date.parse(proj.start_date.substr(0, 10)));
      projEnd.setFullYear(projEnd.getFullYear() + proj.timespan)
      return projEnd < filter.dateUpto
    });
    if (filter.sort) filtered.sort((l, r) => (r[filter.sort]- l[filter.sort]))
    setFiltered(filtered)
  }, [projects, filter])

  return (<div className="main-conatiner">
      <div className="float-left">
        <LeftBar project={project} projects={filtered} setProject={setProject} filter={filter} setFilter={setFilter}/>
      </div>
      <div className="main-map">
        {isLoaded ? <Map project={project} projects={projects} setProject={setProject} /> : null}
      </div>
      <div className={`float-right ${!project && 'd-none'}`}>
          <RightBar project={project} />
      </div>
    </div>)
}
