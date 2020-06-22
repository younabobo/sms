import React, { useState, useEffect } from "react";
import { Table as TableComponent } from "antd";
import Params from "../Params";
import PropTypes from "prop-types";
const url = Params.url;

function Table({ route, columns, title, expandable }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url + route)
      .then((res) => res.json())
      .then(setData)
      .catch(alert);
  }, []);
  return (
    <TableComponent
      expandable={expandable}
      dataSource={data}
      title={(data) => title}
      columns={columns}
    />
  );
}

Table.propTypes = {};

Table.defaultProps = {
  title: "Table",
  expandable: undefined,
};

export default Table;
