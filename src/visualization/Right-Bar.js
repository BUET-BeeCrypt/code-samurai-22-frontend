import { createRef, useEffect, useRef, useState } from 'react'
import { Badge, Button, Card, Form, ProgressBar } from 'react-bootstrap'
import Rating from 'react-rating'
import { addComment, getComments, setRating } from '../api'

export default function RightBar({ project }) {
    const [comments, setComments] = useState([{project_id: 'id', username: 'user', comment: 'comment'}])

    const commentRef = useRef()

    useEffect(() => {
        if (project)
            getComments(project.project_id).then( data => {
                setComments(data)
            })
    }, [project])

    if (!project)
        return <> Select a project to see details </>
    const { name,location,latitude,longitude,exec,cost,timespan,project_id,goal,start_date,completion,actual_cost, agency, total_rating, rating } = project
    return <>
        <div className="">
            <span className="d-block pb-2 mb-0 h6 text-uppercase text-info font-weight-bold">
                {exec} - {location}
            </span>

            <span className="d-block pb-4 h4 text-dark border-bottom border-gray">
                {name}
                <Card.Subtitle className="pt-1 mb-2 text-muted">by {agency}</Card.Subtitle>
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
                    Number of location:
                    <br /> 
                    Latitude: {latitude} , Longitude: {longitude}
                    <br></br>
                    Cost: {actual_cost}M JPY / {cost}M JPY (expected)
                </span>
            </article>
        </div>
        <hr />
        <div>
            Rating: {rating} avg from {total_rating} <br /> 
            Provide your rating - <br />
            <Rating start={0} stop={5} step={1} onChange={e => {
                setRating(project_id, e).then(res => {
                    console.log(res)
                })
            }} />
            <hr />

            <Form.Control
                ref={commentRef}
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
            />

            <Button variant="primary" className={'btn-sm mt-2'} onClick={() => {
                if (commentRef.current.value) {
                    addComment(project_id, commentRef.current.value).then(res => {
                        setComments([...comments, {project_id, username: 'user', comment: commentRef.current.value}])
                        commentRef.current.value = ''
                    });
                }
            }}>Comment</Button>

            <hr />
            Comments: <br />
            
            {comments.map(({project_id, username, comment}) => (
                <>{username} : {comment} <br /></>
            ))}

        </div>
    </>
}