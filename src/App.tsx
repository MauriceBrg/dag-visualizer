import { useEffect, useState } from 'react';
import './App.css';
import { DagVisualizationComponent, highlightCollection, removeAllHighlights } from './components/dag-visualization';
import { Stack } from 'react-bootstrap';
import { ControlBar, DownloadFormat } from './components/dag-controls';
import { DagElement } from './entities/dag-element';
import cytoscape from 'cytoscape';
import { getDag } from './services/dag';


function App() {

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

  function downloadHander(format: DownloadFormat) {
    console.log(`Got a ${format} download request.`)

    let b64uri = undefined;

    switch (format) {
      case DownloadFormat.PNG:
        b64uri = cy?.png({
          full: true,

        })
        break;
      case DownloadFormat.JPG:
        b64uri = cy?.jpg({
          full: true,
          quality: .5,
        })
        break;
    }

    console.log("Generated Image")
    const downloadLink = document.createElement("a")
    downloadLink.href = b64uri!
    downloadLink.download = `dag.${format}`
    console.log(`Starting download of dag.${format}`)
    downloadLink.click()
    downloadLink.remove()
  }

  return (
    <Stack>
      <ControlBar searchHandler={searchHandler} onDownloadHandler={downloadHander}></ControlBar>
      <DagVisualizationComponent dagElements={dag} cyRef={(cy: cytoscape.Core) => { setCy(cy) }}></DagVisualizationComponent>
    </Stack>
  );
}

export default App;
