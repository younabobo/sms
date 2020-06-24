import React from "react";
import Table from "../components/Table";

export default function Payment(props) {
  return (
    <>
      <Table
        update=""
        remove="/api/delete-client"
        columns={[
          {
            title: "Numero",
            dataIndex: "clientId",
            required: true,
            type: "number",
            input: false,
          },
          {
            title: "Nom complet",
            dataIndex: "fullName",
            key: "name",
            required: true,
            type: "text",
            input: true,
          },
          {
            title: "Numéro de téléphone",
            dataIndex: "phoneNumber",
            key: "phone",
            required: false,
            type: "text",
            input: true,
          },
          {
            title: "Nombre de payements",
            dataIndex: "payementsNumber",
            key: "amountPayments",
            required: true,
            type: "number",
            input: false,
          },
          {
            title: "Total",
            dataIndex: "total",
            type: "number",
            required: false,
            key: "total",
            input: false,
          },
        ]}
        title="Liste des clients"
        route="/api/clients"
      />
    </>
  );
}
