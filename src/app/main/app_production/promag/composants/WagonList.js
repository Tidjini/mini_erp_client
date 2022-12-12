import React, { useEffect, useState } from "react";

import Table from "app/composants/table/Table";
import { cells, styles } from "./Configurations";
import {
  Button,
  Dialog,
  Divider,
  Grid,
  Slide,
  Typography,
} from "@material-ui/core";
import { AppInputSearch } from "app/composants/inputs";

import WagonRow from "./WagonRow";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function WagonList(props) {
  const wagons = useSelector(({ production_main }) => production_main.wagons);

  const [currentList, setCurrentList] = useState([]);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const list = [
        ...wagons.attentes,
        ...wagons.empliements,
        ...wagons.enfournements,
        ...wagons.defournements,
        ...wagons.emballages,
      ];

      const liste = list.sort((a, b) =>
        Number(a.numero) < Number(b.numero)
          ? -1
          : Number(b.numero) < Number(a.numero)
          ? 1
          : 0
      );
      setCurrentList(liste);
    }
  }, [open, wagons]);

  const onSearchChanged = (event) => {
    setSearch(event.target.value);
  };

  const onSearchApplied = () => {
    const list = [
      ...wagons.attentes,
      ...wagons.empliements,
      ...wagons.enfournements,
      ...wagons.defournements,
      ...wagons.emballages,
    ];
    if (search === "") {
      setSearch("");
      const liste = list.sort((a, b) =>
        Number(a.numero) < Number(b.numero)
          ? -1
          : Number(b.numero) < Number(a.numero)
          ? 1
          : 0
      );
      setCurrentList(liste);
      return;
    }

    const liste = list.sort((a, b) =>
      Number(a.numero) < Number(b.numero)
        ? -1
        : Number(b.numero) < Number(a.numero)
        ? 1
        : 0
    );
    setCurrentList([...liste.filter((e) => e.numero === search)]);
    setSearch("");
  };

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="contained"
        style={{
          margin: "0 20px 0 0",
          boxShadow: "none",
          backgroundColor: "#0a9396",
          color: "#EFF1FF",
          height: 28,
          fontSize: 12,
          textTransform: "none",
        }}
        onClick={handleClickOpen}
      >
        Recherche
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        style={{}}
      >
        <div style={{ ...styles.container, minHeight: 800 }}>
          <div className="flex container w-full">
            <div style={styles.container_l1}>
              <Grid container style={styles.header}>
                <Grid item xs={6} style={styles.titleContainer}>
                  <div>
                    <Typography style={styles.title}>
                      <span style={styles.titleSpan}>Liste</span> Wagons
                    </Typography>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    ...styles.titleContainer,
                    justifycontent: "end",
                  }}
                >
                  <AppInputSearch
                    name="search"
                    placeholder="N° Wagon"
                    type="text"
                    handleChange={onSearchChanged}
                    value={search}
                    height={36}
                    width={150}
                    horizontal={true}
                    onFocus={(event) => {}}
                    onBlur={(event) => {}}
                    onEnter={(e) => {
                      onSearchApplied();
                    }}
                    onTab={(event) => {}}
                    style={{ marginLeft: 10 }}
                  />
                  <Button
                    variant="contained"
                    style={{
                      marginLeft: 20,
                      boxShadow: "none",
                      backgroundColor: "#0a9396",
                      color: "#EFF1FF",
                      height: 28,
                      fontSize: 12,
                      textTransform: "none",
                    }}
                    onClick={(e) => {
                      onSearchApplied();
                    }}
                  >
                    Recherche
                  </Button>
                </Grid>
              </Grid>
              <Divider style={styles.divider} />
              <div
                className="inner-scroll"
                style={{ ...styles.table_container, width: "100%" }}
              >
                <Table
                  cells={cells}
                  data={currentList}
                  CustomRow={WagonRow}
                  onClickItem={(e, i) => {}}
                  onDoubleClickItem={(e) => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
export default withReducer("production_main", reducer)(WagonList);
