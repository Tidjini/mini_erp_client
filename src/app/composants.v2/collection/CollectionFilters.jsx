import React from "react";
//thirds
import { Dialog, DialogActions, DialogContent, Slide } from "@material-ui/core";
//application
import Button from "app/composants.v2/Button";
import Input from "app/composants.v2/Input";
import { margins, backcolors, forecolors } from "app/composants.v2/constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Collectionfilter(props) {
  const { onFilter, filter, children } = props;

  const [open, setOpen] = React.useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };
  return (
    <div
      style={{
        marginTop: margins.default,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Input
        name="search"
        placeholder="Rechercher des task"
        onChange={onFilter}
        value={filter.search}
      />
      <Button
        style={{
          marginLeft: 14,
          backgroundColor: "#e5e5e5",
          color: "#2b2d42",
        }}
        onClick={(event) => onOpen()}
      >
        Filtrer
      </Button>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button
            style={{
              background: backcolors.add,
            }}
            onClick={(event) => {
              onClose();
            }}
          >
            Apply
          </Button>
          <Button
            style={{
              background: backcolors.lightGray,
              color: forecolors.default,
            }}
            onClick={(event) => {
              onClose();
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
