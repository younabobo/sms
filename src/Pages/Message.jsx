import React, { useEffect, useState } from "react";
import Params from "../Params";
import Table from "../components/Table";
const { url } = Params;

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
      title="Client"
      route="/api/messages"
    />
  );
}
