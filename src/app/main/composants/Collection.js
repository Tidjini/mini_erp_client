import React from "react";

import Table from "app/composants/table/Table";
import { collectionStyles as styles } from "app/main/hooks/CollectionStyles";
import { getColumns } from "app/main/helpers/utils";

import { CircularProgress, Divider, Grid, Typography } from "@material-ui/core";
import Button from "app/main/composants/base/Button";

export default function Collection(props) {
  // later for footer
  const {
    header,
    backgroundColor,
    icon,
    Filters,
    Footer,
    items,
    loading,
    columns,
    Row,
    viewUrl,
    openDialog,
    id,
  } = props;

  const onClick = React.useCallback(
    (event, item) => {
      if (openDialog) {
        openDialog(event, item);
        return;
      }
      const { history } = props;
      history.push(`/${viewUrl}/${item[id]}`);
    },
    [id]
  );

  return (
    <div style={{ ...styles.container, padding: "10px 0" }}>
      <div className="flex container w-full">
        <div style={styles.container_l1}>
          <Grid
            style={{
              borderRadius: 10,
              backgroundColor: backgroundColor || "transparent",
            }}
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid
              item
              container
              alignItems="center"
              xs={6}
              sm={3}
              md={2}
              lg={1}
              spacing={1}
              style={styles.titleContainer}
            >
              <img alt="state" src={icon} style={styles.icon} />
              <div>
                <Typography style={styles.title}>
                  <span style={styles.titleSpan}>{header}</span>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} sm={3} md={2} lg={1}>
              <Button
                onClick={(e) => {
                  if (openDialog) {
                    openDialog(e, null);
                    return;
                  }

                  const { history } = props;
                  history.push(`/${viewUrl}/nouveau`);
                }}
              >
                Ajouter
              </Button>
            </Grid>
          </Grid>
          <Divider style={{ margin: "10px 0" }} />
          {Filters}
          <Divider style={{ margin: "10px 0" }} />

          <div className="inner-scroll" style={styles.table_container}>
            <Table
              cells={getColumns(columns)}
              data={items}
              CustomRow={Row}
              onClickItem={onClick}
            />
          </div>
          {loading === true && (
            <div style={styles.loading_container}>
              <CircularProgress color="inherit" size={48} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
