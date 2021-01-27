import React, { useState, useEffect } from 'react'
import { Linking } from 'react';
import SimpleBottomNavigation from '../components/navigationBar'
import Graph from "react-graph-vis";
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SendIcon from '@material-ui/icons/Send'; 
import Button from '@material-ui/core/Button'; 
import { CommonLoading } from 'react-loadingg';
import { getLinks } from '../Algorithms/getLinks'
import { Route } from 'react-router-dom';

const EmptyGraph = {nodes: [],  edges: []};
const EmptyLinks = [];

const Search = ({connections}) =>{
  const events = {
    selectEdge: function(event) {
      setLinks(EmptyLinks)
      var Sedges = event['edges'][0];
      var fromnode;
      var tonode;
      for (var edge in graph['edges']){
        if (graph['edges'][edge]['id'] == Sedges){
          fromnode = graph['edges'][edge]['from']
          tonode = graph['edges'][edge]['to']
        }
      }
      for (var node in graph['nodes']){
        if (graph['nodes'][node]['id'] == fromnode){
          fromnode = graph['nodes'][node]['label']
        }
        if (graph['nodes'][node]['id'] == tonode){
          tonode = graph['nodes'][node]['label']
        }
      }
      console.log(getLinks(tonode, fromnode))
      setLinks(getLinks(tonode, fromnode));

    }
    
  };
  const options = {
    layout: {
      improvedLayout: true
    },
    edges: {
      color: "#000000"
    },
    height: "500px",
    width: "1000px"
  };
  const changeVal = (value) => {
     setValue(value);
  }
  const changeNUmberOfPaths = (num) =>{
    setNumOfpaths(num);
  } 
  const convert = (paths) => {
    var nodesList = [];
    var nodes = [];
    var edges = [];
    var i = 0;    
    for(var path in paths){
      for (var node in paths[path]["edges"]){
        var edge = paths[path]["edges"][node]
        var autFrom = false
        var autTo = false
        for (var v in nodesList){
          if (edge["fromNode"] ==  nodesList[v]["name"])
            autFrom = true
          if (edge["toNode"] == nodesList[v]["name"])
            autTo = true
        }
        if (!autFrom){
              var node =  edge["fromNode"]
                nodesList.push( {name: node, id : i} )
          
              if(edge["fromNode"] === "Paul Erd\u00f6s"){
                nodes.push({id: i, label: edge["fromNode"], color:{background:'#8096E3'}});
              }
              else{
                nodes.push({id: i, label: edge["fromNode"]});
              }
              i++
        }
        if (!autTo){
              var node =  edge["toNode"]
            
                nodesList.push( {name: node, id : i} )
                if(edge["toNode"] === value){
                  nodes.push({id: i, label: edge["toNode"], color:{background:'#9BDCDC'}});
  
                }
                else{
                  nodes.push({id: i, label: edge["toNode"]});
                }
              i++
        }
        for ( var nodeinNodes in nodesList){
          if (nodesList[nodeinNodes]["name"] == edge["fromNode"] ){
            var edgeFrom = nodesList[nodeinNodes]["id"] 
          }
          if (nodesList[nodeinNodes]["name"] == edge["toNode"] ){
            var edgeTo = nodesList[nodeinNodes]["id"] 
          }
        }      
  
        edges.push({from: edgeFrom, to: edgeTo});
       
      }
    }
    return {
      nodes: nodes,
      edges: edges
    }
  }

const [value, setValue] = useState("");
const [numOfPaths,setNumOfpaths] = useState(1);
const [isSubmmited ,setIsSubmmited] = useState(false)
const [loading ,setLoading] = useState(false)
const [graph, setGraph] = useState(EmptyGraph)
const [Links, setLinks] = useState(EmptyLinks)

const lower_upper_case = (str) => {
   var words = str.split(" ");
   var ans = ""
   for(var word in words){
    ans += words[word].charAt(0).toUpperCase() + (words[word].slice(1)) + " "
   }
   ans = ans.substring(0, ans.length-1)
  return ans;
}
const valid_input = (name) =>{
  for(var v in connections.rawData){
    if(name === v){
      return true
    }
  }
  return false
}
const getNames = (data) => {
  var val = [];
  for(var v in data){
    val.push(v)
  }
  return val
}
useEffect ( async () => {


  if (graph === EmptyGraph)
    setIsSubmmited(false);
  else {
    setIsSubmmited(true);
    setLoading(false)
  }

},[graph]);
const optionss = getNames(connections.rawData);  
const handleSubmit = async  (e, graph) => {
    setLoading(true); 
    setGraph(EmptyGraph)
    e.preventDefault();
    const ksp = require('k-shortest-path')
    var name =  lower_upper_case(value);
    if (!valid_input(name)){
     alert("the name: " + name + " wasn't found")
     return;
    }
    setTimeout(()=> {
      console.log("started algo")
      var path = ksp.ksp(graph, "Paul Erd\u00f6s", lower_upper_case(value), numOfPaths)
      console.log("ended")
      var changed_graph = convert(path);
      setGraph(changed_graph);
    },500)
  } 

 return (
    
    <div className="search"  >
          <SimpleBottomNavigation  />
          {loading && <CommonLoading />}
          <div style={{
              position: 'absolute', left: '50%', top: '48%',
              transform: 'translate(-50%, -50%)',
          }}>

              { isSubmmited && <Graph
                graph={graph}
                options={options}
                events={events}/>}

          </div> 
                
      
          <div style={{
              position: 'absolute', left: '50%', top: '92%',
              transform: 'translate(-50%, -50%)'
          }}>

          <Autocomplete
            id="combo-box-demo"
            options={optionss.sort((a, b) => -b[0].localeCompare(a[0]))}
            getOptionLabel={(option) => option}
            groupBy={(option) => option[0]}
            style={{ width: 300 }}
            onChange={(e, value) => {changeVal(value)} }
            renderInput={(params) => <TextField {...params} type="text" label="author name"
            variant="outlined"
            />}
          />
          *it takes ~15 seconds to find one path
          <br />
            <Autocomplete
            id="combo-box-demo2"
            options={[1,2,3,4,5,6,7,8]}
            getOptionLabel={(option) => option.toString()}
            style={{ width: 300, marginTop: '2%' }}
            onChange={(e, value) => {changeNUmberOfPaths(value)} }
            renderInput={(params) => <TextField {...params} type="text" label="number of paths"
            variant="outlined"
            />}
          />
          <form onSubmit={(e) => handleSubmit(e, connections.processed_data)}  >
                <Button 
                   type="submit" value="Submit" variant="outlined"
                icon={<SendIcon/>} >submit
                 </Button>
            </form>
         
          </div>

          <div style={{
              position: 'absolute', left: '20%', top: '20%',
              transform: 'translate(-50%, -50%)'
          }}>
          { Links.length ? (Links.map( (link) => 
          <p> articles : {Array.isArray(link.Links) ? 
            
            (link.Links.map( (lik) => 
             <a target="_blank" href={lik}>{link.title} <br/></a> 
            )) 
            : <a target="_blank" href={link.Links}>{link.title}</a>} <br/></p>  )
          ) : "" }
          </div>
        
          
     </div>
  );
}


function mapStateToProps(state) {
  return {connections: state.connections}

}
export default connect(mapStateToProps, {})(Search);
