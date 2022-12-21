import React from "react";
import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/collection/CollectionActions";
import { margins } from "app/composants.v2/constants";

export default function TaskView(props) {
  const { params } = props.match;

  const [title, setTitle] = React.useState("Nouvelle Tâche");

  React.useEffect(() => {
    function handleTitle() {
      if (!Boolean(params)) {
        setTitle("Nouvelle Tâche");
        return;
      }
      const { id } = params;
      if (id === "nouveau") {
        setTitle("Nouvelle Tâche");
      } else {
        setTitle(`Edition Tâche (${id})`);
      }
    }

    handleTitle();
  }, [params]);

  return (
    <div style={{ margin: margins.default }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Header title={title} />
        <CollectionActions actions={[]} />
      </div>
    </div>
  );
}
