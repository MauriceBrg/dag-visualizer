import { DagElement } from "../entities/dag-element";

export async function getDag(): Promise<DagElement[]> {

    const response = await fetch(process.env.PUBLIC_URL + "/sample_dag.json")
    const data = await response.json()

    return data
}