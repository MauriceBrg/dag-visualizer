import cytoscape from "cytoscape";
import { DagElement } from "../entities/dag-element";

export function convertDagElementToElementDefinition(dagElement: DagElement): cytoscape.ElementDefinition {
    return {
        data: {
            id: dagElement.id,
            source: dagElement.source,
            target: dagElement.target,
        },
    }
}

export function convertDagElementsToElementDefinitions(dagElements: DagElement[]): cytoscape.ElementDefinition[] {
    return dagElements.map(convertDagElementToElementDefinition)
}
