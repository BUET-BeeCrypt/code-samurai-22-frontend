import { createRef, useEffect, useRef, useState } from 'react'
import { Alert, Badge, Button, Card, Form, ProgressBar } from 'react-bootstrap'
import Rating from 'react-rating'
import { addComment, getComments, setRating } from '../api'
import { parseJwt } from '../App'

const dateToString = (date) => {
    return new Date(date).toJSON().slice(0,10);
}

export default function RightBar({ project }) {
    
    if (!project)
        return <> Select a project to see details </>
    const { name,location,latitude,longitude,exec,cost,timespan,project_id,goal,proposal_date} = project
    return <>
        <div className="">
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
                    from proposed {proposal_date.substr(0, 10)} to {timespan} years
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

                <span className="pt-1 d-block pb-2 mb-0 font-weight-bold">
                    Number of location:
                    <br /> 
                    Latitude: {latitude} , Longitude: {longitude}
                    <br></br>
                    Cost: {cost} Crore BDT (expected)
                </span>
            </article>

            { cost < 50 && parseJwt(localStorage.getItem('token')).role === 'MOP' && <>
                <Button variant="primary" size="sm" block onClick={() => {
                }}>Approve Proposal</Button>
            </>}

        </div>
    </>
}