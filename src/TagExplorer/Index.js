// Libraries.

import React, { Component } from "react";

// Components. 

// private - expand/collapse 
// public  - onClick - Show list of classes. 
import Tags from "./Tags";
import StyleExplorer from "../StyleExplorer";

// Styles.

import "./Style.css";

class TagExplorer extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
    }

    render() {

        let nodeTree = this.props.node;

        return (
            <div className="container events-tab">
                <div className="title">TagExplorer</div>
                <div className="tags">
                    <Tags node={nodeTree}/>
                </div>
                <StyleExplorer />
            </div>
        );
    }
}

export default TagExplorer;
