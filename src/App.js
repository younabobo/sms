import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Client from "./Pages/Client";
import Payment from "./Pages/Payment";
import Message from "./Pages/Message";
import Template from "./Pages/Template";
import NavBar from "./components/NavBar";
import MessagesEnvoyes from "./Pages/MessagesEnvoyes.jsx";
import { Dialog, CircularProgress } from "@material-ui/core";

import {
  SmileOutlined,
  MessageOutlined,
  MoneyCollectOutlined,
  BookOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Form, Button, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Params from "./Params";
const { url } = Params;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const Demo = () => {
  const [dialog, setDialog] = useState(false);
  const [error, setError] = useState(false);

  const normFile = (e) => {
    if (Object.keys(e).includes("event")) setDialog(true);
    else setDialog(false);
    if (e.file.status !== "done") setError(e.file.response);
    else {
      setError(false);
      document.location.reload();
    }
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      <Dialog open={dialog}>
        <CircularProgress></CircularProgress>
      </Dialog>
      <Form name="validate_other" {...formItemLayout}>
        <Form.Item label="Dragger">
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
            rules={[{ required: true }]}
          >
            <Upload.Dragger name="xlsx-file" action="/api/update-commercials">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}
      </Form>
    </>
  );
};
function App() {
  return (
    <Router>
      <NavBar
        routes={[
          { path: "/client", title: "Clients", icon: SmileOutlined },
          { path: "/message", title: "Messages", icon: MessageOutlined },
          { path: "/payment", title: "Paiements", icon: MoneyCollectOutlined },
          { path: "/template", title: "Gabarit", icon: BookOutlined },
          {
            path: "/sent",
            title: "Messages planifiés",
            icon: ScheduleOutlined,
          },
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
        <Route path="/sent">
          <MessagesEnvoyes />
        </Route>
      </Switch>
      <Demo />
    </Router>
  );
}

export default App;
