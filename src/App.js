import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function App() {
    const [userType, setUserType] = useState(null);
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
                        TH-App
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
                                <Nav.Link href="#" onClick={changeTab} data-tab='shared'>Add Proposal</Nav.Link>
                            </>
                        }

                        {userType === "MOP" &&
                            <>
                                <Nav.Link href="#" onClick={changeTab} data-tab='home'>Approve</Nav.Link>
                            </>
                        }

                        {userType === "ECNEC" &&
                            <>
                                <Nav.Link href="#" onClick={changeTab} data-tab='home'>Approve</Nav.Link>
                            </>
                        }

                        {/* <Nav.Link href="#" onClick={changeTab} data-tab='verify'>
                            Verify Document
                        </Nav.Link> */}
                    </Nav>
                </Container>
            </Navbar>

            <Container className='p-4 my-4'>
                {userType === null && <>
                    {selectedTab === "home" && <>
                        <Login />
                    </>}

                    {selectedTab === "register" && <>
                        <Register />
                    </>}
                </>}
            </Container>
    </>
}