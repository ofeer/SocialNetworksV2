
// import {erdesAdj} from '../jsons/erdesAdj'

// export const createGraph = ( finish , start) =>
// {   
  
//     let nodes = {}  
//     if (start in erdesAdj){
//         let temp =JSON.parse(JSON.stringify(erdesAdj[start]));
//         nodes['start'] = temp;
//     }
//     if (finish in erdesAdj){
//         let temp =JSON.parse(JSON.stringify(erdesAdj[finish]));
//         nodes['finish'] = temp;
//     }

//     for (var name in erdesAdj){
//         if ( name != start && name != finish){
//             let temp =JSON.parse(JSON.stringify(erdesAdj[name]));
//             nodes[name] = temp;
//         }

//         if(finish in erdesAdj[name] && finish != name){
//             if ( start  == name)
//                 nodes['start']['finish'] = 1;
//             else nodes[name]['finish'] = 1;
//         }
       
//     }


   
    
   
// return nodes

// }