// Dependencies.

export function updateselectedIndex (e) {
    let componentName = e.currentTarget.innerText.split("\n")[0];
    // Find the element from state that matches the currently selected element.
    let selectedComponent = this.state.elements.find(component=>component.name===componentName);
    let selectedIndex = this.state.elements.findIndex(component=>component.name===componentName);

    // Update the state with selectedElement.
    this.setState({
        selectedIndex,
        name: selectedComponent.name,
        markup: selectedComponent.markup
    })

    this.setEditMode();
}

export function saveElement (element) {
    
    let newElements = Array.from(this.state.elements);
    
    if(this.state.editMode){
        // Find the element.
        let elementUnderEdit = newElements[this.state.selectedIndex];

        // Merge.
        elementUnderEdit = Object.assign(elementUnderEdit, element)

        // Push it to original list.
        newElements[this.state.selectedIndex] = elementUnderEdit;
    }
    else {
        let newElement = {
            name: element.name,
            markup: element.markup,
            events: [],
            state: element.state,
            style: element.style,
            children: [],
            id: Math.ceil(Math.random()*1000),
            config:"{}"
        };

        newElements.push(newElement);
    }

    // Update the state with new values.
    // 1. Initialise the editState with default values/ empty it.
    // TODO: remove editMode.
    this.setState({
        elements: newElements,
        editMode: false,
        element: {
            name: element.name,
            markup: element.markup,
            style: element.style,
            state: element.state,
            events: element.events || []
        },
        show: false
    });

    localStorage.setItem("ui-editor", JSON.stringify(newElements));

    // hide the editor.
    this.toggleEditor();
}


export function updateEvent (events) {
    // Create new state.
    let newElements = Object.assign({}, this.state).elements;

    newElements[this.state.selectedIndex].events = events;

    // Set state to the new state.
    this.setState({
        elements: newElements
    });

    localStorage.setItem("ui-editor", JSON.stringify(newElements));
}

export function onDelete(componentName) {
    // Get all the elements
    let elements = Array.from(this.state.elements);
    
    // Find the index of element to be deleted.
    let index = elements.findIndex(component=>component.name===componentName)

    // Remove the element from the list
    elements.splice(index,1);

    // Update the state with new elements.
    this.setState({
        elements: elements
    })

    // Persist the changes.
    localStorage.setItem("ui-editor", JSON.stringify(elements));
}

export function toggleEditor () {
    this.setState({
        show: !this.state.show
    });
}

export function setEditMode () {
    this.setState({
        editMode: true,
        show: true
    })
}

export function updateConfig(config){
    
    let newElements = Object.assign({}, this.state).elements;
    
    let parent = newElements.find(element=>element.name===config.parentName);
    let child = newElements.find(element=>element.name===config.childName);

    parent.state = JSON.parse(parent.state);

    if(parent.config === undefined){
        parent.config = {};
    }
    else {
        parent.config = JSON.parse(parent.config);
    }
    parent.config[child.name] = parent.config[child.name] || {}
    parent.config[child.name].overideState = config.override
    
    if(parent.config[child.name].overideState) {    
        parent.state[child.name] = JSON.parse(child.state);
    } 
    else {
        delete parent.state[child.name];
        delete parent.config[child.name];
    }


    parent.state = JSON.stringify(parent.state)
    parent.config = JSON.stringify(parent.config)

    this.setState({
        elements: newElements
    })

    localStorage.setItem("ui-editor", JSON.stringify(newElements));
}