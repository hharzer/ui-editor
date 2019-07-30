import { codeModifier } from "./codeModifier";

// Elements to  react component.
const convertToReactcomponent = (element)=>{

    element.events.forEach(event=>{
        event.id = event.id.replace("-","");
    })

    let getComponentEventedMarkup = (markup, events)=>{
        events.forEach(event=>{
            let id = `id="${event.id}"`;
            markup = markup.replace(id, `${id} ${event.name}={this.${event.id+event.name}.bind(this)}`);
        });
    
        return markup.split("{state.").join("{this.state.")
    }
    
    let getComponentReducers = (events) => {
        return events.map(event=>{
            let functionName = event.id+event.name;
            let functionDef = codeModifier(event.reducer);
            return `
    ${functionName} () {
            ${functionDef}
    }`
        }).join("\n")
    }
    

    let componentEventedMarkup = getComponentEventedMarkup(element.markup, element.events)
    let componentReducers = getComponentReducers(element.events)
    let componentName = element.name.split(" ").join("")
    let componentState = element.state
    let ReactComponent = 
    `
    (class ${componentName} extends Component {
    
        constructor(props) {
            super(props);
            this.state = ${componentState};
        }
    
        ${componentReducers}
    
        render() {
    
            return (${componentEventedMarkup})
        }
    })
    `
    return ReactComponent;
}

module.exports = {
    convertToReactcomponent
}