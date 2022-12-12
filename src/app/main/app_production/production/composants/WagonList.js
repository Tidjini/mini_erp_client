import React, { useEffect, useState } from "react";

import Table from "app/composants/table/Table";
import { cells, styles } from "./Configurations";
import { Dialog, Divider, Grid, Slide, Typography } from "@material-ui/core";
import { AppInputSearch } from "app/composants/inputs";
import Button from "app/main/composants/base/Button";

import WagonRow from "./WagonRow";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WagonList(props) {
  const wagons = useSelector(
    ({ production_production }) => production_production.wagon
  );

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
        style={{
          backgroundColor: "#e9c46a",
          color: "#14213d",
        }}
        onClick={handleClickOpen}
      >
        Recherche wagons
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
