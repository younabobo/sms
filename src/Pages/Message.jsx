import React from "react";
import Table from "../components/Table";

export default function Payment(props) {
  return (
    <Table
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
          type: "datetime",
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
  );
}
