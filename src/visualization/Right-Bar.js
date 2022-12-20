import { Badge, Card, ProgressBar } from 'react-bootstrap'

export default function RightBar({ project }) {
    if (!project)
        return <> Select a project to see details </>
    const { name,location,latitude,longitude,exec,cost,timespan,project_id,goal,start_date,completion,actual_cost } = project
    return <>
        <div className="position-relative">
            <span className="d-block pb-2 mb-0 h6 text-uppercase text-info font-weight-bold">
                {exec} - {location}
            </span>

            <span className="d-block pb-4 h4 text-dark border-bottom border-gray">
                {name}
                <Card.Subtitle className="pt-1 mb-2 text-muted">by {exec}</Card.Subtitle>
                <Badge
                    bg="success"
                    className="px-2 py-1 ml-3 mb-1 align-middle"
                    style={{ fontSize: "0.75rem" }}
                >
                    from {start_date.substr(0, 10)} to {timespan} years
                </Badge>
            </span>


            <article
                className="pt-0 text-secondary text-justify"
                style={{ fontSize: "0.9rem", whiteSpace: "pre-line" }}
            >
                {goal}
                <span className="pt-2 d-block pb-2 mb-0 h5 text-info border-bottom border-gray">
                    More details
                </span>
                Completion Status: <br />
                <ProgressBar>
                    <ProgressBar striped variant="success" now={completion} key={1} 
                    label={`${completion}%`} />
                    <ProgressBar striped variant="danger" now={100 - completion} key={2} 
                    label={`${100 - completion}%`}/>
                </ProgressBar>

                <span className="pt-1 d-block pb-2 mb-0 font-weight-bold">
                    Number of location: Latitude: {latitude} , Longitude: {longitude}
                    <br></br>
                    Total Cost: {cost}M JPY
                </span>
                

            </article>
        </div>
    </>
}