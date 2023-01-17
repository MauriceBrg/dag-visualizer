import React, { useEffect, useState } from 'react';
import './App.css';
import { DagVisualizationComponent, highlightCollection, removeAllHighlights } from './components/dag-visualization';
import { Stack } from 'react-bootstrap';
import { ControlBar } from './components/dag-controls';
import { DagElement, DagElementTypes } from './entities/dag-element';
import cytoscape from 'cytoscape';
import { getDag } from './services/dag';


function App() {

  const defaultDag: DagElement[] = [
    {
      id: "someNode",
      type: DagElementTypes.Node,
    },
    {
      id: "anotherNode",
      type: DagElementTypes.Node,
    },
    {
      id: "thirdNode",
      type: DagElementTypes.Node,
    },
    {
      id: "fourthNode",
      type: DagElementTypes.Node,
    },
    {
      id: "fifthNode",
      type: DagElementTypes.Node,
    },
    {
      id: "fromNodeToAnotherNode",
      type: DagElementTypes.Edge,
      source: "someNode",
      target: "anotherNode",
    },
    {
      id: "fromAnotherNodeToThirdNode",
      type: DagElementTypes.Edge,
      source: "anotherNode",
      target: "thirdNode",
    },
    {
      id: "fromFourthNodeToAnotherNode",
      type: DagElementTypes.Edge,
      source: "fourthNode",
      target: "anotherNode",
    },
    {
      id: "fromfifthNodeToThirdNode",
      type: DagElementTypes.Edge,
      source: "fifthNode",
      target: "thirdNode",
    },
  ]

  const [dag, setDag] = useState<DagElement[]>([])

  useEffect(
    () => {
      getDag().then(
        (value) => {
          setDag(value)
        }
      )
    }, [])

  const [cy, setCy] = useState<cytoscape.Core | null>(null)

  function searchHandler(searchTerm: string) {
    console.log("Search term : " + searchTerm)

    searchTerm = searchTerm.trim()

    if (searchTerm !== "") {
      // Elements that contain the search term in their id (case-insensitive)
      const collection = cy!.filter(`[id @*= "${searchTerm}"]`)
      console.debug(`Found ${collection?.length} results`)
      removeAllHighlights(cy!)
      highlightCollection(collection)
      collection.length > 0 ? cy?.fit(collection) : cy?.fit()
    } else if (cy) {
      // Remove all highlights if the search term is empty and cy is set.
      removeAllHighlights(cy!)
      cy.fit()
    }
  }

  return (
    <Stack>
      <ControlBar searchHandler={searchHandler}></ControlBar>
      <DagVisualizationComponent dagElements={dag} cyRef={(cy: cytoscape.Core) => { setCy(cy) }}></DagVisualizationComponent>
    </Stack>
  );
}

export default App;
