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
        { title: "Numéro Client", dataIndex: "clientId", key: "clientId" },
        { title: "Nom Client", dataIndex: "clientName", key: "clientName" },
      ]}
      title="Liste des paiements"
      route="/api/payements"
    />
  );
}
