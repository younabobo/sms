import React, { useEffect, useState } from "react";
import Params from "../Params";
import Table from "../components/Table";
const { url } = Params;

export default function Payment(props) {
  return (
    <Table
      columns={[
        { title: "Numero", dataIndex: "clientId" },
        {
          title: "Nom complet",
          dataIndex: "fullName",
          // key: "name",
        },
        {
          title: "Numéro de téléphone",
          dataIndex: "phoneNumber",
          // key: "phone",
        },
        { title: "Total", dataIndex: "toal", key: "total" },
        {
          title: "Nombre de payements",
          dataIndex: "payementsNumber",
          // key: "amountPayments",
        },
      ]}
      title="Client"
      route="/api/clients"
    />
  );
}
