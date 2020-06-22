import React from "react";
import Table from "../components/Table";

export default function Payment(props) {
  return (
    <Table
      columns={[
        { title: "Numero", dataIndex: "messageId", key: "id" },
        {
          title: "Temps planifié",
          dataIndex: "scheduleTime",
          key: "time",
        },
        {
          title: "État",
          dataIndex: "state",
          key: "state",
        },
        { title: "Numéro client", dataIndex: "clientId", key: "clientId" },
        {
          title: "Nom du client",
          dataIndex: "clientName",
          key: "clientName",
        },
      ]}
      title="Liste des messages"
      route="/api/messages"
    />
  );
}
