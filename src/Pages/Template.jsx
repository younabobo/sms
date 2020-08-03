import React from "react";
import Table from "../components/Table";

export default function Template() {
  return (
    <>
      <Table
        insert="/api/add-template"
        update="/api/update-template"
        remove="/api/delete-template"
        columns={[
          {
            title: "Numero",
            dataIndex: "templateId",
            required: false,
            type: "number",
            input: false,
            key: "id",
          },
          {
            title: "Nom",
            dataIndex: "designation",
            key: "designation",
            required: true,
            type: "text",
            input: true,
            maxLength: 250,
          },
          {
            title: "Contenu",
            dataIndex: "content",
            key: "content",
            required: true,
            type: "template",
            input: true,
            maxLength: 250,
          },
        ]}
        title="Liste des gabarits"
        route="/api/templates"
      />
    </>
  );
}
