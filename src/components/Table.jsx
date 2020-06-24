import React, { useState, useEffect } from "react";
import {
  Table as TableComponent,
  Form,
  Input,
  Button,
  Tooltip,
  Space,
  Popover,
  DatePicker,
} from "antd";
import Params from "../Params";
import PropTypes from "prop-types";

import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
const url = Params.url;

function Table({ route, columns, title, expandable, insert, update, remove }) {
  let searchInput;
  const [state, setState] = useState({});
  const [openCreateNew, setOpenCreateNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url + route)
      .then((res) => res.json())
      .then(setData)
      .catch(alert);
  }, []);

  const submit = (data, method) =>
    new Promise((resolve, reject) => {
      fetch(url + (method === "insert" ? insert : update), {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then(resolve)
        .catch(reject);
    });

  const Formulaire = ({ method }) => (
    <Form onFinish={(data) => submit(data, method)}>
      {columns
        .filter(({ input }) => input)
        .map(({ title, required, type, dataIndex, maxLength }) => (
          <Form.Item
            label={title}
            name={dataIndex}
            rules={[
              {
                required,
                message: "Ce champ est requis",
              },
            ]}
          >
            {type === "datetime" ? (
              <DatePicker showTime />
            ) : (
              <Input type={type} maxLength={maxLength} />
            )}
          </Form.Item>
        ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  const onUpdate = (resource) =>
    fetch(url + update, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    });
  const onDelete = (resource) =>
    fetch(url + remove, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    }).catch(console.log);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {insert && (
          <div style={{ alignSelf: "flex-end", margin: 30 }}>
            <Popover
              content={<Formulaire method="insert" />}
              title={
                route.split("/").slice(-1)[0][0].toUpperCase() +
                route.split("/").slice(-1)[0].slice(1, -1)
              }
              trigger="click"
              visible={openCreateNew}
              onVisibleChange={setOpenCreateNew}
            >
              <Button type="primary">
                Nouveau{" "}
                {route.split("/").slice(-1)[0][0].toUpperCase() +
                  route.split("/").slice(-1)[0].slice(1, -1)}
              </Button>
            </Popover>
          </div>
        )}
        <TableComponent
          expandable={expandable}
          dataSource={data.map((datum, index) => ({ ...datum, key: index }))}
          title={(data) => title}
          columns={columns
            .map((column) => ({
              ...column,
              ...getColumnSearchProps(column.dataIndex),
              sorter: {
                compare: (a, b) =>
                  String(a[column.dataIndex]).localeCompare(
                    b[column.dataIndex]
                  ),
              },
            }))
            .concat(
              [update, remove].filter((x) => x).length
                ? [
                    {
                      title: "Action",
                      key: "action",
                      render: (text, record) => (
                        <div>
                          {update && (
                            <Popover
                              content={<Formulaire method="update" />}
                              title={
                                route.split("/").slice(-1)[0][0].toUpperCase() +
                                route.split("/").slice(-1)[0].slice(1, -1)
                              }
                              trigger="click"
                              visible={openEdit}
                              onVisibleChange={setOpenEdit}
                            >
                              <Tooltip
                                onClick={() => setOpenEdit(true)}
                                placement="bottom"
                                title="Modifier"
                              >
                                <Button>
                                  <EditOutlined />
                                </Button>
                              </Tooltip>
                            </Popover>
                          )}
                          {remove && (
                            <Tooltip
                              onClick={() => onDelete(record)}
                              placement="bottom"
                              title="Supprimer"
                            >
                              <Button>
                                <DeleteOutlined />
                              </Button>
                            </Tooltip>
                          )}
                        </div>
                      ),
                    },
                  ]
                : []
            )}
        />
      </div>
    </>
  );
}

Table.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      dataIndex: PropTypes.string,
      key: PropTypes.string,
    })
  ),
};

Table.defaultProps = {
  title: "Table",
  expandable: undefined,
};

export default Table;
