// Libraries.

import React, { Component } from "react";
import ReactDOM from "react-dom";

// Dependencies.
import "./Index/index.css";

// Components.

import Elements from "./Elements";
import Preview from "./Preview";
import DraggableComponent from "./DraggableComponent";


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            components: [],
            previewComponent: {
                name: "",
                markup: "",
                style: "",
                state: "{}",
                events: [{
                    id: "ID1",
                    name: "",
                    reducer: ""
                }]
            }
        }
    }

    updatePreview(element) {
        this.setState({
            previewComponent: element
        });
    }

    render() {
        return (
            <div>
                <div className="showBackground">
                    <Elements createMode={false} onPreview={this.updatePreview.bind(this)} />
                    <DraggableComponent>
                        <Preview component={this.state.previewComponent} />
                    </DraggableComponent>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById("index"));