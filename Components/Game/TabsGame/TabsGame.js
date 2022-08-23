import React from "react";
import { Tab } from "semantic-ui-react";
import InfoGame from "../InfoGame";
export default function TabsGame(props) {
  const { game } = props;

  const panes = [
    {
      menuItem: "Informacion",
      render: () => (
        <Tab.Pane>
          <InfoGame game={game} />
        </Tab.Pane>
      ),
    },
    // {
    //   menuItem: "Comentarios",
    //   render: () => (
    //     <Tab.Pane>
    //       <h1>Lista de Comentarios</h1>
    //     </Tab.Pane>
    //   ),
    // },
  ];
  return <Tab className="tabs-game" panes={panes} />;
}
