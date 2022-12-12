import React, { useEffect, useState } from "react";
import { showMessage } from "app/store/actions/fuse";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Table,
  TableBody,
  Typography,
  IconButton,
  Icon,
} from "@material-ui/core";
import { FuseScrollbars } from "@fuse";

import AppCompteHeader from "app/composants/table/AppCompteHeader";
import EcritureInputTable from "app/main/comptabilite/ecriture/components/EcritureInputTable";
import { AppInputSearch } from "app/composants/inputs";
import CompteRow from "./components/CompteRow";
import CompteSummary from "./components/CompteSummary";

const drawerWidth = 240;
const headerHeight = 200;
const toolbarHeight = 64;
const headerContentHeight = headerHeight - toolbarHeight;

function CompteTable(props) {
  const dispatch = useDispatch();

  const { compte } = props;
  const [selected, setSelected] = useState(0);
  const [journal, setJournal] = useState(null);
  const [periode, setPeriode] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  const compte_table = useSelector(({ dashboard }) => dashboard.compte_table);
  const exercice_actif = useSelector(
    ({ dashboard }) => dashboard.exercice_actif
  );

  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery("");
    onGetCollection(1, "");
  }, [compte]);
  useEffect(() => {
    onGetCollection(currentPage, searchQuery);
  }, [journal, periode, currentPage, searchQuery]);

  useEffect(() => {
    try {
      let p = Math.ceil(compte_table.count / compte_table.page_size);

      setPages(p);
    } catch (error) {
      setPages(1);
    }
  }, [compte_table]);

  function onSearchEnter(event) {
    const query = event.target.value;
    setCurrentPage(1);
    setSearchQuery(query);
  }

  function onGetCollection(page = 1, search = "") {
    if (compte != null && compte !== undefined) {
      const filter = {
        journal: "",
        periode: "",
      };
      if (journal !== null) {
        filter["journal"] = journal.code;
      }
      if (periode !== null) {
        filter["periode"] = periode.code;
      }

      dispatch(Actions.getComptesTable(compte, filter.journal, page, search));
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100%",
        position: "relative",
        flex: "1 1 auto",
        height: "100%",
      }}
    >
      <div className="flex container w-full">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 3.2rem",
            flex: "1 1 100%",
            zIndex: 2,
            maxWidth: "100%",
            minWidth: 0,
            minHeight: 0,
            marginBottom: 20,
          }}
        >
          <Grid
            container
            style={{
              display: "flex",
              padding: "20px 0",
            }}
          >
            <EcritureInputTable
              name="journal"
              label="Journal"
              placeholder="Journal (MAX 10)"
              type="text"
              handleChange={undefined}
              height={36}
              horizontal={true}
              width={156}
              onFocus={(e) => {}}
              selected={journal}
              setSelected={(item) => {
                setCurrentPage(1);
                setJournal(item);
              }}
              maxLength={30}
              header="List Journaux"
              primaryAttribute="code"
              style={{ marginRight: 20 }}
              // onEnter={onInputTab}
              // onTab={onInputTab}
            />

            <div
              style={{
                padding: "10px 20px",
                height: 36,
                background: "#e5383b",
                borderRadius: 5,
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                textTransform: "uppercase",
                display: exercice_actif["id"] === 0 ? "block" : "none",
              }}
            >
              aucun dossier est créer ou activer ...
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifycontent: "end",
              }}
            >
              <IconButton
                aria-haspopup="true"
                style={{ opacity: compte_table.previous ? 1 : 0 }}
                onClick={(e) => {
                  if (compte_table.previous != null)
                    setCurrentPage(currentPage - 1);
                }}
              >
                <Icon color="action" className="text-20">
                  arrow_left
                </Icon>
              </IconButton>

              <Typography
                className="text-16"
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  opacity: !isNaN(pages) ? 1 : 0,
                }}
              >
                {currentPage + "/" + pages}
              </Typography>
              <IconButton
                aria-haspopup="true"
                style={{ opacity: compte_table.next ? 1 : 0 }}
                onClick={(e) => {
                  if (compte_table.next != null)
                    setCurrentPage(currentPage + 1);
                }}
              >
                <Icon color="action" className="text-20">
                  arrow_right
                </Icon>
              </IconButton>

              {/* <AppInputSearch
                name="Search"
                placeholder="Recherche (Piece, Compte, Tier, Banque, Référence, Label)"
                type="text"
                handleChange={undefined}
                height={36}
                width={400}
                horizontal={true}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
                onEnter={onSearchEnter}
                onTab={(event) => {}}
              /> */}
            </div>
            <Grid
              item
              xs={12}
              style={{
                padding: "10px 20px",
                background:
                  compte_table.summary.solde_debit > 0.0
                    ? "#2a9d8f"
                    : compte_table.summary.solde_credit > 0.0
                    ? "#e63946"
                    : "#474747",
                borderRadius: 5,
                color: "white",
                textTransform: "uppercase",
                marginTop: 20,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  flex: 1,
                  fontWeight: "bold",
                  fontSize: 24,
                }}
              >{`Compte: ${compte}`}</Typography>
              <Typography
                style={{
                  fontWeight: "600",
                  fontSize: 18,
                }}
              >
                {`débit : ${new Intl.NumberFormat("fr-FR").format(
                  compte_table.summary.debit
                )}, crédit : ${new Intl.NumberFormat("fr-FR").format(
                  compte_table.summary.credit
                )}, `}
                {compte_table.summary.solde_debit > 0.0 &&
                  `solde débit : ${new Intl.NumberFormat("fr-FR").format(
                    compte_table.summary.solde_debit
                  )}`}

                {compte_table.summary.solde_credit > 0.0 &&
                  `solde crédit : ${new Intl.NumberFormat("fr-FR").format(
                    compte_table.summary.solde_credit
                  )}`}
              </Typography>
            </Grid>
          </Grid>

          <div
            className="inner-scroll"
            style={{
              display: "flex",
              flex: "1 1 100%",
              flexDirection: "column",
              minHeight: 0,
              borderRadius: "8px 8px 0 0",
            }}
          >
            <FuseScrollbars
              style={{
                flex: "1 1 auto",
                height: "100%",
                overflow: "auto",
                "-webkit-overflow-scrolling": "touch",
              }}
              enable={true}
              onYReachEnd={(ve) => {}}
              onXReachEnd={(ve) => {}}
              scrollToTopOnChildChange={false}
            >
              <Table
                aria-labelledby="tableTitle"
                className="min-w-md"
                size="small"
                stickyHeader
                stickyFooter
                style={{ minHeight: 150 }}
              >
                <AppCompteHeader />
                <TableBody>
                  {compte_table.results.map((compte, index) => (
                    <CompteRow
                      key={compte.compte}
                      compte={compte}
                      onClickItem={(c) => {}}
                      selected
                      setSelected
                    />
                  ))}
                </TableBody>
              </Table>
            </FuseScrollbars>
          </div>

          {/* <CompteSummary /> */}
        </div>
      </div>
    </div>
  );
}

export default withReducer("dashboard", reducer)(CompteTable);
