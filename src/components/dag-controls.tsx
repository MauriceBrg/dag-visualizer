import { FormEvent } from "react"
import { Container, Navbar, NavbarBrand } from "react-bootstrap"

export const DagSearchInput = (props: { searchHandler?(searchTerm: string): void }) => {

    function onInputCapture(event: FormEvent<HTMLInputElement>) {
        const target = event.target as typeof event.target & { value: string }
        const textValue: string = target.value.trim()
        props.searchHandler?.(textValue)
    }

    return <input onInputCapture={onInputCapture} aria-label="Search for Nodes and Edges" className="form-control" type={"search"} placeholder={"Search / Highlight Nodes & Edges"}></input>
}

export const ControlBar = (props: { searchHandler?(searchTerm: string): void }) => {
    return <Navbar>
        <Container>
            <NavbarBrand>DAG Visualization</NavbarBrand>
            <DagSearchInput searchHandler={props.searchHandler}></DagSearchInput>
        </Container>
    </Navbar>
}