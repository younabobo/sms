import React from "react";
import Table from "../components/Table";

export default function Payment(props) {
  return (
    <Table
      columns={[
        { title: "Numero", dataIndex: "clientId" },
        {
          title: "Nom complet",
          dataIndex: "fullName",
          key: "name",
        },
        {
          title: "Numéro de téléphone",
          dataIndex: "phoneNumber",
          key: "phone",
        },
        { title: "Total", dataIndex: "total", key: "total" },
        {
          title: "Nombre de payements",
          dataIndex: "payementsNumber",
          key: "amountPayments",
        },
      ]}
      title="Liste des clients"
      route="/api/clients"
    />
  );
}
