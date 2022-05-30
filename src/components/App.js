import "../App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import ReportForm from "./accountBox/ReportForm";
import {AuthProvider} from "../contexts/AuthContext";
import Signup from "./Signup";
import { Container } from 'react-bootstrap';
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import {useEffect, useState} from "react";
import {collection, getDocs} from "@firebase/firestore";
import {db} from "../firebase";
import Database from "./database";



function App() {

  return (
              <Container className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh"}}>

                  <div className="w-100" style={{ maxWidth: '400px'}}>
                    <Router>
                        <AuthProvider>
                            <Switch>
                                <Route path="/signup" exact>
                                    <Signup />
                                </Route>
                                <Route path="/" exact>
                                    <Login />
                                </Route>
                                <Route path="/report" exact>
                                    <ReportForm />
                                </Route>
                                <Route path="/forgot-password" exact>
                                    <ForgotPassword />
                                </Route>
                                <Route path="/database" exact>
                                    <Database />
                                </Route>
                            </Switch>
                        </AuthProvider>
                    </Router>
                  </div>
              </Container>

  );
}

export default App;
