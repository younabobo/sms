import React, { useEffect, useState } from "react";
import Params from "../Params";
import Table from "../components/Table";
const { url } = Params;

export default function Payment(props) {
  return (
    <Table
      columns={[
        { title: "Numero", dataIndex: "payementId", key: "id" },
        {
          title: "Date de convention",
          dataIndex: "conventionDate",
          key: "date",
        },
        { title: "Etat", dataIndex: "state", key: "state" },
        { title: "Quantité", dataIndex: "amount", key: "amount" },
        { title: "Quantité payée", dataIndex: "paidAmount", key: "paid" },
        { title: "Client", dataIndex: "clientId", key: "clientId" },
      ]}
      title="Client"
      route="/api/payements"
    />
  );
}
