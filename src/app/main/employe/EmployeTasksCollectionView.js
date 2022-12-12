import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import CollectionHeader from "app/ui/CollectionHeader";
import TableCollection from "app/ui/Tasks/TableCollection";
import { tasksColumns } from "./EmployeConfig";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

// import config from "app/services/firebaseService/firebaseServiceConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";
import { showMessage } from "app/store/actions/fuse";

const styles = (theme) => ({
  layoutRoot: {},
});

// const app = initializeApp(config);
// const db = getFirestore(app);

function EmployeTasksCollectionView() {
  const dispatch = useDispatch();
  const tasks = useSelector(({ employe }) => employe.tasks);

  //   const tasksCollectionRef = collection(db, "tasks");
  //   const unsubscribe = onSnapshot(collection(db, "tasks"), (data) => {
  //     data.docs.map((doc) => {
  //       dispatch(
  //         showMessage({
  //           message: `Le Devis N°${doc.id} a été modifier avec sucess`,
  //           variant: "success",
  //           anchorOrigin: {
  //             vertical: "center", //top bottom
  //             horizontal: "right", //left center right
  //           },
  //           autoHideDuration: 1200,
  //         })
  //       );
  //     });
  //   });
  useEffect(() => {
    dispatch(Actions.getTasks());

    // const getTasks = async () => {
    //   const data = await getDocs(tasksCollectionRef);
    //   // setTasks([]);
    // };
    //getTasks();
    //unsubscribe();
  }, []);

  function getCollectionPage(page) {
    dispatch(Actions.getTasks());
  }

  function searchAction(search) {
    if (search === undefined || search === null || search === "")
      dispatch(Actions.getTasks());
    else {
      dispatch(Actions.getTasks());
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
          icon="add_task"
          title="Tasks"
          viewTitle=""
          viewLink="/devis_achat/new/"
          searchAction={searchAction}
          canEditNew={false}
        />
      }
      content={
        <TableCollection
          columns={tasksColumns}
          collection={tasks}
          viewUrl="/employe_achat"
          getCollectionPage={getCollectionPage}
        />
      }
      innerScroll
    />
  );
}

const view = withReducer("employe", reducer)(EmployeTasksCollectionView);

export default withStyles(styles, { withTheme: true })(view);
