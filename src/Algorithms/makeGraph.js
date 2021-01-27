import React, { useState, useEffect } from 'react'
export const MakeGraph  = (erdesAdj) => {

    console.log("IN MAKE GRAPH");

    const transfer = (g) => {
        for (var name in erdesAdj){
          for (var adj in erdesAdj[name]["coauthors"])
            g.setEdge(name, adj , 1);
        }
        return g
    }
    
    const graphlib = require('graphlib');
    let graph = new graphlib.Graph(); 
    var g = transfer(graph)
    console.log("FINISHED");
    console.log(g);
    return g;   
  
    
}