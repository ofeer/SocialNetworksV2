import { List } from '@material-ui/core';
import { publDict } from '../jsons/publications_dict';


export const getLinks = (toNode, fromNode) => {
    var Links = []
    for (var artc in publDict){
        var authors =  publDict[artc]['author'];
        if (Array.isArray(authors)){
            if (authors.includes(toNode) && authors.includes(fromNode)){
                console.log("MADE ITTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
                Links.push({
                    'title' : publDict[artc]['title'],
                    'Links' :  publDict[artc]['ee']
                }) 
                break;
            }
           
        }

    }
    return Links;
}