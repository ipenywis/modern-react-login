import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import ReportForm from "./components/accountBox/ReportForm";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
   <Router>
     <Switch>
       <Route path="/" exact>
           <AppContainer>
               <AccountBox />
           </AppContainer>
       </Route>
       <Route path="/report">
            <ReportForm />
       </Route>
     </Switch>
   </Router>
  );
}

export default App;
