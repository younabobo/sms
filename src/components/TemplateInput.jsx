import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
function binaryRep(x, y = 1) {
  return Math.floor(x / Math.pow(256, y)) === 0 ? y : binaryRep(x, y + 1);
}
const addons = [
  { id: "fullName", label: "Nom complet", cost: 20 },
  { id: "total", label: "Total", cost: 8 },
  { id: "totalUnpaid", label: "Total non payé", cost: 8 },
  { id: "telephone", label: "Numéro de téléphone", cost: 10 },
];

export default function TemplateInput({ onChange, maxLength, type }) {
  const [value, setValue] = useState("");

  const calcSize = (value) =>
    value
      .split("")
      .reduce(
        (acc, curr, index) => (curr === "{" ? acc.concat(index) : acc),
        []
      )
      .map((x) => value.slice(0, x))
      .map((x, index) => x.slice(index))
      .map((x) => x.split("}").slice(-1)[0])
      .concat(value.split("}").slice(-1)[0])
      .join("")
      .split("")
      .map((x) => x.charCodeAt(0))
      .reduce((acc, curr) => acc + binaryRep(curr), 0) +
    value
      .split("{")
      .reduce((acc, curr) => [...acc, ...curr.split("}")], [])
      .filter((x, index) => index % 2)
      .map((x) => addons.filter((y) => y.id === x)[0].cost)
      .reduce((acc, curr) => acc + curr, 0);

  const handleChange = (v) =>
    !["{", "}"].includes(v.target.value.slice(-1)[0]) &&
    calcSize(v.target.value) < 280 &&
    setValue(v.target.value);
  const addField = (id) => {
    calcSize(value) + addons.filter((x) => x.id === id)[0].cost < 280 &&
      setValue(value + "{" + id + "}");
  };
  useEffect(() => {
    onChange(value);
  }, [value]);
  return (
    <>
      <Input.TextArea
        autoSize
        type={type}
        value={value}
        onChange={handleChange}
      />
      <div id="addons">
        {addons.map(({ id, label }) => (
          <Button onClick={() => addField(id)}>{label}</Button>
        ))}
      </div>
    </>
  );
}
