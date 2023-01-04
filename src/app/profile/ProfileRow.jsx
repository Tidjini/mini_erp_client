import React from "react";
//thirds
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Icon, IconButton, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import useUserStateInfo from "app/hooks/useUserStateInfo";
import InputSelector from "app/composants.v2/InputSelector";

export default function ProfileRow(props) {
  const { data: item, onClick, onDoubleClick, selectedItem } = props;
  const [form, setForm] = React.useState(item);
  const [changeForm, setChangeForm] = React.useState(false);

  const user = useSelector(({ auth }) => auth.user.data);
  const { stateInfo } = useUserStateInfo(form);

  const statues = [
    { display: "Non Définie", value: "u" },
    { display: "Active", value: "a" },
    { display: "Non Active", value: "n" },
    { display: "Absent", value: "ab" },
  ];

  const handleChange = React.useCallback(
    (event) => {
      const { name, value } = event.target;
      const newForm = { ...form };
      newForm[name] = value;
      setForm({ ...newForm });
    },
    [form]
  );

  React.useEffect(() => {
    setChangeForm(false);
  }, [selectedItem]);

  return (
    <TableRow
      onClick={() => onClick(item)}
      style={{
        cursor: "pointer",
        backgroundColor:
          selectedItem && selectedItem.id === item.id
            ? "#2FB1A040"
            : "transparent",
      }}
    >
      <TableCell align={"left"} style={{ width: 72, alignItems: "center" }}>
        <img
          style={{
            width: 48,
            height: 42,
            borderRadius: 24,
          }}
          src="assets/images/man.png"
        />
      </TableCell>
      <TableCell align={"left"}>
        <Typography style={{ fontSize: 14, fontWeight: "700" }}>
          {item.name}
        </Typography>
      </TableCell>
      <TableCell align={"left"}>
        {!changeForm && (
          <Typography
            style={{
              padding: "5px 20px",
              borderRadius: 15,
              width: 150,

              fontSize: 11,
              fontWeight: "700",
              textAlign: "center",
              ...stateInfo,
            }}
            onClick={(e) => {
              const change = selectedItem && selectedItem.id === item.id;
              setChangeForm(change);
            }}
          >
            {stateInfo.text.toUpperCase()}
          </Typography>
        )}
        {changeForm && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: 200,
            }}
          >
            <InputSelector
              name="statue"
              value={form.statue}
              options={statues}
              onChange={handleChange}
              style={{ marginRight: 14 }}
            />
            <IconButton style={{ backgroundColor: "#2a9d8f20" }}>
              <Icon style={{ color: "#264653" }}>save</Icon>
            </IconButton>
          </div>
        )}
      </TableCell>
      <TableCell>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "flex-end",
          }}
        >
          <Icon
            style={{
              color: "#355070",
              marginRight: 14,
            }}
          >
            directions
          </Icon>
          <Typography
            style={{
              fontWeight: "700",
              color: "#355070",
            }}
          >
            {item.distance}
          </Typography>
        </div>
      </TableCell>
      <TableCell align={"right"}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "flex-end",
          }}
        >
          <Icon
            style={{
              color: "#fca311",
              marginRight: 14,
            }}
          >
            access_time
          </Icon>
          <Typography style={{ fontWeight: "700", color: "#355070" }}>
            {item.duration}
          </Typography>
        </div>
      </TableCell>
      <TableCell>
        <Typography
          style={{
            fontSize: 14,
            fontWeight: "700",
            color: "#2b2d42",
            width: 36,
            height: 36,
            borderRadius: 28,
            backgroundColor: "#90e0ef50",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item.task_count}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
