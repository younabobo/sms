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
import { Dialog, CircularProgress } from "@material-ui/core";
import Params from "../Params";
import PropTypes from "prop-types";
import TemplateInput from "./TemplateInput";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
const url = Params.url;
const defaultDate = `${new Date().getFullYear()}-${
  new Date().getMonth() > 9
    ? new Date().getMonth()
    : "0" + String(new Date().getMonth())
}-${
  new Date().getDate() > 9
    ? new Date().getDate()
    : "0" + String(new Date().getDate())
}`;

function Table({
  route,
  columns,
  title,
  expandable,
  insert,
  update,
  remove,
  defaultFilters,
}) {
  const [dialog, setDialog] = useState(false);
  let searchInput;
  const [state, setState] = useState(defaultFilters);
  const [openCreateNew, setOpenCreateNew] = useState(false);
  const [openEdit, setOpenEdit] = useState({});
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
      setDialog(true);
      fetch(url + (method === "insert" ? insert : update), {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      })
        .then(resolve)
        .catch(reject);
    })
      .then((res) => {
        if (res.status !== 200)
          res
            .text()
            .then(JSON.parse)
            .then(({ error }) => alert(error));
        return res;
      })
      .then(() => setDialog(false))
      .catch(() => setDialog(false));

  const Formulaire = ({ method, id, idKey }) => {
    const defaultData = columns
      .filter(({ input }) => input)
      .reduce(
        (acc, cur) =>
          cur.type === "date" ? { ...acc, [cur.dataIndex]: defaultDate } : acc,
        {}
      );
    const [data, setData] = useState(defaultData);

    const handleInputChange = (index, value) =>
      method === "update"
        ? setData({ ...data, [index]: value, [idKey]: id })
        : setData({ ...data, [index]: value });
    const handleFinish = () => submit(data, method);
    return (
      <Form>
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
              {type === "date" ? (
                <Input
                  type="date"
                  showTime
                  onChange={(e) => {
                    e.persist();
                    handleInputChange(dataIndex, e.target.value);
                  }}
                  defaultValue={defaultDate}
                />
              ) : type === "template" ? (
                <TemplateInput
                  onChange={(val) => handleInputChange(dataIndex, val)}
                />
              ) : (
                <Input
                  type={type}
                  maxLength={maxLength}
                  onChange={({ target: { value: val } }) =>
                    handleInputChange(dataIndex, val)
                  }
                />
              )}
            </Form.Item>
          ))}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => handleFinish()}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const onDelete = (resource) => {
    setDialog(true);
    fetch(url + remove, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    })
      .then(
        (res) =>
          res.status !== 200 &&
          res
            .text()
            .then(JSON.parse)
            .then(({ error }) => alert(error))
      )
      .then(() => setDialog(false))
      .catch(() => setDialog(false));
  };
  return (
    <>
      <Dialog open={dialog}>
        <CircularProgress></CircularProgress>
      </Dialog>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {insert && (
          <div
            style={{
              alignSelf: "flex-end",
              marginTop: 10,
              marginBottom: 5,
              marginRight: 30,
            }}
          >
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
          size="small"
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
                              content={
                                <Formulaire
                                  method="update"
                                  id={record[columns[0].dataIndex]}
                                  idKey={columns[0].dataIndex}
                                />
                              }
                              title={
                                route.split("/").slice(-1)[0][0].toUpperCase() +
                                route.split("/").slice(-1)[0].slice(1, -1)
                              }
                              trigger="click"
                              visible={openEdit[record.key]}
                              onVisibleChange={(value) =>
                                setOpenEdit({
                                  ...Object.keys(openEdit).reduce(
                                    (acc, curr) => ({ ...acc, [curr]: false }),
                                    {}
                                  ),
                                  [record.key]: value,
                                })
                              }
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
  defaultFilters: {},
};

export default Table;
