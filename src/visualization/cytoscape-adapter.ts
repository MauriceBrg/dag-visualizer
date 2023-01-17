import cytoscape from "cytoscape";
import ColorHash from 'color-hash'
import { DagElement } from "../entities/dag-element";

export function convertDagElementToElementDefinition(dagElement: DagElement): cytoscape.ElementDefinition {

    const colorHash = new ColorHash()

    const backgroundColor = dagElement.colorKey !== undefined ? colorHash.rgb(dagElement.colorKey) : "gray"
    return {
        data: {
            id: dagElement.id,
            source: dagElement.source,
            target: dagElement.target,
            backgroundColor: backgroundColor
        },
    }
}

export function convertDagElementsToElementDefinitions(dagElements: DagElement[]): cytoscape.ElementDefinition[] {
    return dagElements.map(convertDagElementToElementDefinition)
}
