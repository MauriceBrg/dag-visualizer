import { FormEvent } from "react"
import { Container, Nav, Navbar, NavbarBrand, NavDropdown } from "react-bootstrap"

export enum DownloadFormat {
    PNG = "png",
    JPG = "jpg"
}

export const DagSearchInput = (props: { searchHandler?(searchTerm: string): void }) => {

    function onInputCapture(event: FormEvent<HTMLInputElement>) {
        const target = event.target as typeof event.target & { value: string }
        const textValue: string = target.value.trim()
        props.searchHandler?.(textValue)
    }

    return <input onInputCapture={onInputCapture} aria-label="Search for Nodes and Edges" className="form-control" type={"search"} placeholder={"Search / Highlight Nodes & Edges"}></input>
}

export function DownloadButton(props: { onDownloadHandler(format: DownloadFormat): void }) {
    return (
        <NavDropdown title="Download as" className="btn btn-light">
            {
                Object.values(DownloadFormat).map((value: string) => {
                    const format = value as DownloadFormat
                    return <NavDropdown.Item key={value} onClick={
                        (event) => { props.onDownloadHandler(format) }
                    }>{value}</NavDropdown.Item>
                })
            }
        </NavDropdown>

    )
}


export const ControlBar = (props: { searchHandler?(searchTerm: string): void, onDownloadHandler(format: DownloadFormat): void }) => {
    return <Navbar>
        <Container>
            <NavbarBrand>DAG Visualization</NavbarBrand>
            <Nav className="flex-fill me-3">
                <DagSearchInput searchHandler={props.searchHandler}></DagSearchInput>
            </Nav>
            <DownloadButton onDownloadHandler={props.onDownloadHandler}></DownloadButton>
        </Container>
    </Navbar>
}