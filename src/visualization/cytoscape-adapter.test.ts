import { DagElementTypes } from "../entities/dag-element"
import { convertDagElementsToElementDefinitions, convertDagElementToElementDefinition } from "./cytoscape-adapter"


it("Should return an ElementDefinition for a Node", () => {
    const result = convertDagElementToElementDefinition({
        id: "something",
        type: DagElementTypes.Node,
    })

    expect(result.data.id).toBe("something")
})

it("Should return an ElementDefinition for an Edge", () => {
    const result = convertDagElementToElementDefinition({
        id: "something",
        source: "sourceNode",
        target: "targetNode",
        type: DagElementTypes.Node,
    })

    expect(result.data.id).toBe("something")
    expect(result.data.source).toBe("sourceNode")
    expect(result.data.target).toBe("targetNode")
})

it("Should return an empty list if there are no DagElements", () => {
    const result = convertDagElementsToElementDefinitions([])
    expect(result).toEqual([])
})

it("Should return 2 elements if 2 elements are passed in", () => {
    const result = convertDagElementsToElementDefinitions([
        {
            id: "something",
            source: "sourceNode",
            target: "targetNode",
            type: DagElementTypes.Node,
        },
        {
            id: "something",
            type: DagElementTypes.Node,
        }
    ])
    // No need to test the conversion here, that's what other tests are for.
    expect(result.length).toBe(2)
})