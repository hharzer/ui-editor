// Libraries.

import React, { Component } from "react";

import style from "./Style.css"
import getMessages from "./Messages";

import {updateEventName, updateEventType, updatePublishName, updateReducer} from "./Reducer";
class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.event ? this.props.event.name : "",
            reducer: this.props.event ? this.props.event.reducer : "",
            publishable: this.props.event ? this.props.event.publishable : "",
            publishName: this.props.event ? this.props.event.publishName : "",
        }
    }

    publishEvent() {
        this.props.onSave({
            name: this.state.name,
            reducer: this.state.reducer,
            index: this.props.index,
            publishable: this.state.publishable,
            publishName: this.state.publishName
        })
    }

    deleteEvent(){
        this.props.deleteEvent(this.props.index);
    }

    render() {

        if (this.props.selectedTagID === undefined) {
            return getMessages();
        }

        let publishName = this.state.publishable? <input type="text" onChange={updatePublishName.bind(this)} value={this.state.publishName} placeholder="Enter event publish name for other components to subscribe to"/> : null;
        let eventNames = this.props.eventNames.map(eventName=><option value={eventName}></option>)

        return (
            <div className={style.event}>
                <input list="browsers" type="text" onChange={updateEventName.bind(this)} value={this.state.name} placeholder="Enter event name" title="Event Name"/>
                <datalist id="browsers">
                    {eventNames}
                </datalist>
                <br/>
                <textarea onChange={updateReducer.bind(this)} value={this.state.reducer} placeholder="Enter state reducer" title="Reducer"/>
                <div>
                    <label>
                    <input type="checkbox" onChange={updateEventType.bind(this)} checked={this.state.publishable? "checked": ""}/>
                    Publishable
                    </label>
                    {publishName}
                    <button onClick={this.publishEvent.bind(this)} id="saveEvent">Save</button>
                    <button onClick={this.deleteEvent.bind(this)} id="deleteEvent">Delete</button>
                </div>
            </div>
        );
    }
}

export default Event;
