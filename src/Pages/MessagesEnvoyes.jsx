import React from "react";
import Message from "./Message";

export default function MessagesEnvoyes(props) {
  return (
    <Message
      defaultFilters={{ searchText: "SCHEDULED", searchedColumn: "state" }}
    />
  );
}
