export enum DagElementTypes {
    Node = "node",
    Edge = "edge"
}

export interface DagElement {
    /**
     * Unique identifier of this element.
     */
    id: string

    /**
     * Determines if this is a node or an edge
     */
    type: DagElementTypes

    /**
     * Identifier of the source node if this is an edge.
     */
    source?: string

    /**
     * Identifier of the target node if this is an edge.
     */
    target?: string

    /**
     * A short description < 255 chars that describes the node or edge, may be used on mouseover actions.   
     */
    shortDescription?: string

    /**
     * A value that will be used to automatically map to a color for the node/edge
     */
    colorKey?: string
}