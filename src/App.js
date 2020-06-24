import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Client from "./Pages/Client";
import Payment from "./Pages/Payment";
import Message from "./Pages/Message";
import Template from "./Pages/Template";
import NavBar from "./components/NavBar";

import {
  SmileOutlined,
  MessageOutlined,
  MoneyCollectOutlined,
  BookOutlined,
} from "@ant-design/icons";

function App() {
  return (
    <Router>
      <NavBar
        routes={[
          { path: "/client", title: "Clients", icon: SmileOutlined },
          { path: "/message", title: "Messages", icon: MessageOutlined },
          { path: "/payment", title: "Paiements", icon: MoneyCollectOutlined },
          { path: "/template", title: "Gabarit", icon: BookOutlined },
        ]}
      />
      <Switch>
        <Route path="/client">
          <Client />
        </Route>

        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/message">
          <Message />
        </Route>
        <Route path="/template">
          <Template />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
