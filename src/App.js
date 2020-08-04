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

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const Demo = () => {
  const [dialog, setDialog] = useState(false);
  const onFinish = (values) => {
    setDialog(true);
    const fd = new FormData();
    fd.set("xlsx-file", values.dragger[0]);
    fetch(url + "/api/update-commercials", {
      body: fd,
      method: "POST",
    })
      .then(() => setDialog(false))
      .then(() => document.location.reload())
      .catch(() => setDialog(false));
  };

  return (
    <>
      <Dialog open={dialog}>
        <CircularProgress></CircularProgress>
      </Dialog>
      <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
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

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
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
