import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import CollectionHeader from "app/ui/CollectionHeader";
import TableCollection from "app/ui/Employe/TableCollection";
import { collectionColumns } from "./EmployeConfig";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";
import { showMessage } from "app/store/actions/fuse";

const styles = (theme) => ({
  layoutRoot: {},
});

// const app = initializeApp(config);
// const db = getFirestore(app);

function EmployeCollectionView() {
  const dispatch = useDispatch();
  const employees = useSelector(({ employe }) => employe.employees);

  const [tasks, setTasks] = useState([]);
  // const tasksCollectionRef = collection(db, "tasks");
  // const unsubscribe = onSnapshot(collection(db, "tasks"), (data) => {
  //   data.docs.map((doc) => {
  //     // dispatch(
  //     //   showMessage({
  //     //     message: `Le Devis N°${doc.id} a été modifier avec sucess`,
  //     //     variant: "success",
  //     //     anchorOrigin: {
  //     //       vertical: "center", //top bottom
  //     //       horizontal: "right", //left center right
  //     //     },
  //     //     autoHideDuration: 1200,
  //     //   })
  //     // );
  //   });
  // });
  useEffect(() => {
    dispatch(Actions.getEmployees());

    // const getTasks = async () => {
    //   const data = await getDocs(tasksCollectionRef);
    //   // setTasks([]);
    // };
    //getTasks();
    //unsubscribe();
  }, []);

  function getCollectionPage(page) {
    dispatch(Actions.getEmployees());
  }

  function searchAction(search) {
    if (search === undefined || search === null || search === "")
      dispatch(Actions.getEmployees());
    else {
      dispatch(Actions.getEmployees());
    }
  }

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-64 h-64",
      }}
      header={
        <CollectionHeader
          icon="assignment_ind"
          title="Employés"
          viewTitle=""
          viewLink="/devis_achat/new/"
          searchAction={searchAction}
          canEditNew={false}
        />
      }
      content={
        <TableCollection
          columns={collectionColumns}
          collection={employees}
          viewUrl="/employe_achat"
          getCollectionPage={getCollectionPage}
        />
      }
      innerScroll
    />
  );
}

const view = withReducer("employe", reducer)(EmployeCollectionView);

export default withStyles(styles, { withTheme: true })(view);
