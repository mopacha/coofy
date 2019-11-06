# ![@coofy/orgchart](https://balkangraph.com/content/img/icon-orgchart-js.png) @coofy/orgchart

[@coofy/orgchart](https://github.com/mopacha/coofy/tree/dev01/orgchart) is a simple encapsulation based on OrgChart JS(v6.0.2)

OrgChart JS is a simple, flexible and highly customizable organization chart plugin for presenting the structure of your organization and the relationships in an elegant way.

![OrgChart](https://balkangraph.com/content/img/screenshot-orgchart-js-2.png)

## [Demos](https://balkangraph.com/OrgChartJS/Demos/BasicUsage)  &nbsp;&nbsp;&nbsp;&nbsp;  [Docs](https://balkangraph.com/OrgChartJS/Docs/GettingStarted)  &nbsp;&nbsp;&nbsp;&nbsp;  [Download](https://balkangraph.com/OrgChartJS/Download) &nbsp;&nbsp;&nbsp;&nbsp;  [Support](https://balkangraph.com/OrgChartJS/Support)

## Features
- Supports both local data and remote data (JSON)
- Smooth expand/collapse effects
- Align the chart in 8 orientations
- Allows user to change orgchart structure by drag/drop nodes
- Supports pan and zoom
- Edit Form
- Node Customization
- Search
- Scroll Bars
- Lazy Loading
- Mixed Hierarchy
- Exporting
- Assistant
- Family Tree

## Installation


```
npm i @coofy/orgchart
```

## Usage
```
        <div id="tree"/>
        <script>
				var OrgChart = require('@coofy/orgchart') 
 
        var chart = new OrgChart(document.getElementById("tree"), {
            nodeBinding: {
                field_0: "name"
            },
            nodes: [
                { id: 1, name: "Amber McKenzie" },
                { id: 2, pid: 1, name: "Ava Field" },
                { id: 3, pid: 1, name: "Peter Stevens" }
            ]
        });
        </script>
```




