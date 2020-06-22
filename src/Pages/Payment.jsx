import React from "react";
import Table from "../components/Table";

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
