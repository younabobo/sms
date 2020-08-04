import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Params from "../Params";
import { Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";

const { url } = Params;
const defaultDate = `${new Date().getFullYear()}-${
  new Date().getMonth() + 1 > 9
    ? new Date().getMonth() + 1
    : "0" + String(new Date().getMonth() + 1)
}-${
  new Date().getDate() > 9
    ? new Date().getDate()
    : "0" + String(new Date().getDate())
}`;

export default function Payment({ defaultFilters }) {
  const [redirect, setRedirect] = useState(false);

  const CustomInsert = ({ onFinish }) => {
    const [data, setData] = useState({
      scheduleTime: defaultDate,
    });
    useEffect(() => console.log(data), [data]);
    const handleFinish = () => {
      if (
        !Object.keys(data).every(
          (dt) =>
            ["scheduleTime", "clientId", "templateId"].includes(dt) ||
            ["scheduleTime", "xlsx-file", "templateId"].includes(dt)
        ) ||
        Object.keys(data).length !== 3
      )
        alert("Données incomplètes");
      else {
        const fd = new FormData();
        Object.keys(data).forEach((key) => {
          fd.append(key, data[key]);
        });
        const req = {
            method: "POST",
            body: Object.keys(data).includes('clientId') ? JSON.stringify(data) : fd,
          }
        if (Object.keys(data.includes('clientId') req.headers = { 'Content-Type': 'application/json' }
        fetch(
          url +
            "/api/schedule-message" +
            (Object.keys(data).includes("xlsx-file") ? "s" : ""),
          
        )
          .then((res) => res.json())
          .then((res) => setRedirect("/sent"));
      }
    };
    return (
      <Form style={{ width: 500 }}>
        <Form.Item
          label="Temps planifié"
          name="scheduleTime"
          rules={[
            {
              required: true,
              message: "Ce champ est requis",
            },
          ]}
        >
          <Input
            type="date"
            onChange={(e) => {
              e.persist();
              setData({ ...data, scheduleTime: e.target.value });
            }}
            defaultValue={defaultDate}
          />
        </Form.Item>
        <Form.Item
          label="Numéro client"
          name="clientId"
          rules={[{ required: true, message: "Ce champ est requis" }]}
        >
          <Input
            min={1}
            type="number"
            disabled={Object.keys(data).includes("xlsx-file")}
            onChange={(x) => {
              x.persist();
              if (x.target.value !== "") {
                setData({
                  ...data,
                  clientId: Number(x.target.value),
                });
              } else {
                const d = { ...data };
                delete d.clientId;
                setData(d);
              }
            }}
          />
          <Upload
            disabled={Object.keys(data).includes("clientId")}
            beforeUpload={(file) => {
              setData({ ...data, "xlsx-file": file });
              return false;
            }}
          >
            <Button>
              <UploadOutlined /> Fichier excel
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Numero gabarit"
          name="templateId"
          rules={[{ required: true, message: "Ce champ est requis" }]}
        >
          <Input
            min={1}
            type="number"
            onChange={(x) => {
              x.persist();
              if (x.target.value !== "") {
                setData({
                  ...data,
                  templateId: Number(x.target.value),
                });
              } else {
                const d = { ...data };
                delete d.templateId;
                setData(d);
              }
            }}
          />
        </Form.Item>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleFinish();
          }}
        >
          Envoyer
        </Button>
      </Form>
    );
  };
  return (
    <>
      <Table
        defaultFilters={defaultFilters}
        CustomInsert={CustomInsert}
        columns={[
          {
            title: "Numero",
            dataIndex: "messageId",
            key: "id",
            required: true,
            type: "number",
            input: false,
          },
          {
            title: "Temps planifié",
            dataIndex: "scheduleTime",
            key: "time",
            required: true,
            type: "date",
            input: true,
          },
          {
            title: "État",
            dataIndex: "state",
            key: "state",
            required: true,
            type: "text",
            input: false,
          },
          {
            title: "Numéro client",
            dataIndex: "clientId",
            key: "clientId",
            required: true,
            type: "number",
            input: true,
          },
          {
            title: "Nom du client",
            dataIndex: "clientName",
            key: "clientName",
            required: true,
            type: "text",
            input: false,
          },
          {
            title: "Numero de template",
            dataIndex: "templateId",
            key: "templateId",
            required: false,
            type: "number",
            input: true,
          },
        ]}
        title="Liste des messages"
        route="/api/messages"
        insert="/api/schedule-message"
      />
      {redirect && <Redirect to={redirect} />}
    </>
  );
}
