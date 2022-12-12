import React from "react";
import Input from "./Input";

function formatDate(date) {
  try {
    const dateFormated =
      date.getFullYear() +
      "-" +
      `${("0" + (date.getMonth() + 1)).slice(-2)}` +
      "-" +
      `${("0" + date.getDate()).slice(-2)}` +
      "T" +
      date.getHours() +
      ":" +
      date.getMinutes();
    return dateFormated;
  } catch (error) {
    return undefined;
  }
}
export default function InputDate(props) {
  const { name, placeholder, type, label, handleChange, value } = props;

  const [date, setDate] = React.useState("");

  React.useEffect(() => {
    if (value === "" || value === undefined || value === null) {
      setDate("");
    } else {
      const dateValue = new Date(value);
      const dateFormated = formatDate(dateValue);
      setDate(dateFormated);
    }
  }, [value]);

  return (
    <Input
      grid={{ xs: 12, sm: 6, md: 3 }}
      name={name}
      placeholder={placeholder}
      type="datetime-local"
      label={label}
      handleChange={handleChange}
      value={date}
      style={{}}
    />
  );
}
