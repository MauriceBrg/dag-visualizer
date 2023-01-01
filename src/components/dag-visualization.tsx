import cytoscape, { Collection, CollectionReturnValue } from 'cytoscape';
import dagre from 'cytoscape-dagre';

import CytoscapeComponent from 'react-cytoscapejs';
import { DagElement } from '../entities/dag-element';
import { convertDagElementsToElementDefinitions } from '../visualization/cytoscape-adapter';
import { useRef, useCallback } from 'react';

const HIGHLIGHT_CLASS_NAME = "highlight"

function addHighlightToNodeAndConnections(collection: Collection): void {
    collection.addClass(HIGHLIGHT_CLASS_NAME)

    collection.nodes().successors().addClass(HIGHLIGHT_CLASS_NAME)
    collection.nodes().predecessors().addClass(HIGHLIGHT_CLASS_NAME)

}

function removeHighlightFromNodeAndConnections(collection: Collection): void {

    collection.removeClass(HIGHLIGHT_CLASS_NAME)

    collection.nodes().successors().removeClass(HIGHLIGHT_CLASS_NAME)
    collection.nodes().predecessors().removeClass(HIGHLIGHT_CLASS_NAME)

}

export function removeAllHighlights(cy: cytoscape.Core) {
    cy.$("*").removeClass(HIGHLIGHT_CLASS_NAME)
}

export function highlightCollection(collection: Collection | CollectionReturnValue) {
    collection.addClass(HIGHLIGHT_CLASS_NAME)
}

export function DagVisualizationComponent(props: { dagElements: DagElement[], cyRef(cy: cytoscape.Core): void }) {
    cytoscape.use(dagre)

    const cy = useRef<cytoscape.Core | null>(null);
    const setCytoscape = useCallback(
        (ref: cytoscape.Core) => {
            cy.current = ref;
            cy.current.on("select", "node", (event) => {
                const target: Collection[] = event.target
                addHighlightToNodeAndConnections(target[0])
            })
            cy.current.on("unselect", "node", (event) => {
                const target: Collection[] = event.target
                removeHighlightFromNodeAndConnections(target[0])
            })
            props.cyRef(cy.current)


        },
        [cy, props],
    );

    const style: React.CSSProperties = {
        // "background": "gray",
        "width": "max-width",
        "height": "100vh",
    }

    const layout = {
        name: 'dagre',
        nodeDimensionsIncludeLabels: true,
        // grid: true,
        // directed: true,
    }

    const stylesheet: cytoscape.Stylesheet[] = [
        {
            selector: 'node',
            style: {
                // 'background-color': 'data(color)',
                'label': 'data(id)',
            }
        },
        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                // 'label': 'data(id)'
            }
        },
        {
            selector: `node.${HIGHLIGHT_CLASS_NAME}`,
            style: {
                // 'color': 'red',
                'background-color': 'yellow',
            }
        },
        {
            selector: `edge.${HIGHLIGHT_CLASS_NAME}`,
            style: {
                // 'label': 'data(id)',
                'line-color': 'green',
                'target-arrow-color': 'green',
            }
        }
    ]

    if (props.dagElements.length === 0) {
        return <strong>No DAG :(</strong>
    }

    return <CytoscapeComponent
        cy={setCytoscape}
        elements={convertDagElementsToElementDefinitions(props.dagElements)}
        layout={layout}
        style={style}
        // @ts-ignore - Somehow the types seem to be out of date.
        stylesheet={stylesheet}
        autoungrabify={true} // Make sure nodes can't be dragged around as that creates a mess
    ></CytoscapeComponent>
}