import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AddProposal from "./proposal/AddProposal";
import PropVisualization from "./proposal/PropVisualization";
import Suggestion from "./proposal/Suggestions";
import Visualization from "./visualization/Visualization";

export function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export default function App() {
    
    let userTypeStorage = null;

    if (localStorage.getItem('token')) {
        userTypeStorage = parseJwt(localStorage.getItem('token')).role;
    }


    const [userType, setUserType] = useState(userTypeStorage);
    const [selectedTab, setSelectedTab] = useState("home");

    const changeTab = e => {
        e.preventDefault();
        setSelectedTab(e.target.dataset.tab || "home");
    }

    return <>
        <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.reload();
                        }}
                    >
                        TApp
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        {userType === "APP" &&
                            <>
                                <Nav.Link href="#" onClick={changeTab} data-tab='home'>Projects</Nav.Link>
                                {/* <Nav.Link href="#">Shared Documents</Nav.Link> */}
                            </>
                        }

                        {userType === null &&
                        <>
                            <Nav.Link href="#" onClick={changeTab} data-tab='home'>Login</Nav.Link>
                            <Nav.Link href="#" onClick={changeTab} data-tab='register'>Register</Nav.Link>
                        </>
                        }

                        {userType === "EXEC" &&
                            <>
                                <Nav.Link href="#" onClick={changeTab} data-tab='home'>Proposals</Nav.Link>
                                <Nav.Link href="#" onClick={changeTab} data-tab='suggestion'>Suggested Timeframe</Nav.Link>
                                <Nav.Link href="#" onClick={changeTab} data-tab='add'>Add Proposal</Nav.Link>
                            </>
                        }

                        {userType === "MOP" &&
                            <>
                                <Nav.Link href="#" onClick={changeTab} data-tab='home'>Proposals</Nav.Link>
                            </>
                        }

                        {userType === "ECNEC" &&
                            <>
                                <Nav.Link href="#" onClick={changeTab} data-tab='home'>Proposals</Nav.Link>
                            </>
                        }
                        
                        {userType !== null &&
                            <>
                                <Nav.Link href="#" onClick={() => {
                                    localStorage.removeItem('token');
                                    window.location.reload();
                                }} data-tab='home'>Log Out</Nav.Link>
                            </>
                        }

                        {/* <Nav.Link href="#" onClick={changeTab} data-tab='verify'>
                            Verify Document
                        </Nav.Link> */}
                    </Nav>
                </Container>
            </Navbar>

            <Container fluid>
                {userType === null && <>
                    {selectedTab === "home" && <>
                        <Login />
                    </>}

                    {selectedTab === "register" && <>
                        <Register />
                    </>}
                </>}

                {userType === "APP" && <>
                    {selectedTab === "home" && <>
                        <Visualization />
                    </>}
                </>}

                {userType === "EXEC" && <>
                    {selectedTab === "add" && <>
                        <AddProposal />
                    </>}
                    {selectedTab === "suggestion" && <>
                        <Suggestion />
                    </>}
                </>}

                {userType === "MOP" && <>
                    {selectedTab === "home" && <>
                        <PropVisualization />
                    </>}
                </>}
            </Container>
    </>
}