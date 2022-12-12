import React, { useCallback, useEffect } from "react";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";

import axios from "axios";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Slide,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import XLSX from "xlsx";

import DevisAchatCompareHeader from "./DevisAchatCompareHeader";
import DevisAchatTableCompareBody from "./DevisAchatTableCompareBody";
import AppActionDialog from "app/main/components/AppActionDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DevisAchatTableCompareDialog(props) {
  const { table_compare, open, setOpen, onCellClicked } = props;

  function printTable() {
    try {
      window.open(`${URL}media/table_compare.pdf`, "_blank").focus();
    } catch (error) {}
  }
  function downloadExcel() {
    let body = [];
    table_compare.body.forEach((element) => {
      body = [...body, element.row];
    });

    var ws_data = [[], table_compare.header, ...body, ...table_compare.footer];

    const workSheet = XLSX.utils.aoa_to_sheet(ws_data);
    workSheet["A1"] = {
      ...workSheet["A1"],
      s: {
        fill: {
          patternType: "none", // none / solid
          fgColor: { rgb: "FF000000" },
          bgColor: { rgb: "FFFFFFFF" },
        },
        font: {
          name: "Times New Roman",
          sz: 16,
          color: { rgb: "#FF000000" },
          bold: true,
          italic: false,
          underline: false,
        },
        border: {
          top: { style: "thin", color: { auto: 1 } },
          right: { style: "thin", color: { auto: 1 } },
          bottom: { style: "thin", color: { auto: 1 } },
          left: { style: "thin", color: { auto: 1 } },
        },
      },
    };

    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "TCO");

    let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "TC0.xlsx");
  }

  const handleClose = () => {
    setOpen(false);
  };

  const onPasseCommande = useCallback(() => {
    const body = table_compare.body;
    if (body === undefined || body === null) return;
    const elements = [];

    body.forEach((element) => {
      let selected = element.selected;
      if (selected < 2) {
        selected = element.min;
      }
      elements.push({
        prix: element.row[selected]["label"],
        id: element.row[selected]["detail_id"],
      });
    });
    const { history } = props;
    const selection = { articles: elements };
    axios
      .post(`${DATA_SERVICE_URL}devis_achat/convert/`, selection)
      .then((response) => {
        const commandes = response.data.commandes;
        history.push(`/commande_achat/${commandes[0]}`);
      });

    setOpen(false);
  }, [table_compare]);
  return (
    table_compare && (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xl"
      >
        <DialogContent>
          <div className="w-full flex">
            {/* <DevisAchatColumnFixed
              body={table_compare.body}
              footer={table_compare.footer}
            /> */}
            <TableContainer component={Paper} size="small" style={{ flex: 1 }}>
              <Table
                aria-label="simple table"
                className="min-w-md"
                stickyColumn={0}
              >
                <DevisAchatCompareHeader header={table_compare.header} />
                <DevisAchatTableCompareBody
                  body={table_compare.body}
                  footer={table_compare.footer}
                  onCellClicked={onCellClicked}
                />
              </Table>
            </TableContainer>
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={downloadExcel} variant="contained" color="primary">
            Télécharger En Excel
          </Button> */}
          <Button
            variant="contained"
            style={{
              marginRight: 4,
              boxShadow: "none",
              backgroundColor: "#467D2B",
              color: "#EFF1FF",
              textTransform: "none",
            }}
            onClick={printTable}
          >
            IMPRIMER
          </Button>
          {/* <Button
            variant="contained"
            style={{
              marginRight: 4,
              boxShadow: "none",
              backgroundColor: "#1265E7",
              color: "#EFF1FF",
              textTransform: "none",
            }}
            onClick={onPasseCommande}
          >
            PASSER LA COMMANDE
          </Button> */}

          <AppActionDialog
            buttonLabel="PASSER LA COMMANDE"
            title="Conversion"
            actionOne={onPasseCommande}
            actionOneLabel="Confirmation"
            actionTwo={undefined}
            actionTwoLabel=""
            actionThreeLabel="Annuler"
            message={`Voulez-vous convertir ce devis (selecions) en commande validé ?`}
            backgroundColor={"#1265E7"}
          />

          <Button
            variant="contained"
            style={{
              marginRight: 4,
              boxShadow: "none",
              backgroundColor: "red",
              color: "#EFF1FF",
              textTransform: "none",
            }}
            onClick={handleClose}
          >
            FERMER
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}
