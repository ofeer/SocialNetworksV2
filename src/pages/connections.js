import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  import SimpleBottomNavigation from '../components/navigationBar'
  // import hardesNumbers from '../jsons/hardesNumbers'
  import { publDict } from '../jsons/publications_dict';
  import { authors_to_publication } from '../jsons/authors_to_publication';
  // import { ardashNumbers } from '../../public/ardash_numbersers';
  import {connect} from 'react-redux';
  
  const connections = (fetchStats, stats) =>
  { 
  const author_age  = (author) => {
    var articals_id = authors_to_publication[author] //array of this author artical id
    var age = 0; //minimal age
    for (var artical in articals_id){ //go over all artical
      var artical_id = articals_id[artical];
      if (publDict[artical_id] != undefined){
        var date = publDict[artical_id]['year'] //string of date
        var age_of_artical = 2020 - date 
        // console.log(age_of_artical)
        if(age_of_artical > age){
          age = age_of_artical
        }
      }
    }
    return age;
  } 
  
  const number_of_articals = (author) => {
      if( authors_to_publication[author] != undefined)
        return authors_to_publication[author].length
      else{
         return 0
      }
    }
//   const ardashNumbers = (author) => (ardashNumbers[author])
  
  
  
  const avrage_articals_per_age = (age) => {  
      var counter = 0;
      var accum = 0; 
      for(var author in authors_to_publication){
        var author_name = authors_to_publication[author]
        if(author_age(author_name) === age){
              counter = counter + 1;
              accum = accum + number_of_articals(author_name)
        }
      }
       return (accum/counter)
  }
//  const avarge_erdos_num_per_age = (age) => {
//    var counter = 0;
//    var accum = 0;
//    for(var author in authors_to_publication){
//         var author_name = authors_to_publication[author]
//         if(author_age(author_name) === age){
//               counter = counter + 1;
//               accum = accum + ardashNumbers(author_name)
//         }
//   }
const make_data_avarge_artricals = () => {
 var the_Data = [];
 var i = 0;
 while(i < 70){
    the_Data.push({name: i, uv: avrage_articals_per_age(i)})

}
return the_Data
}
// const make_data_avarge_erdos_num = () => {
//  var the_Data = [];
//  var i = 0;
//  while(i < 6){
//  data.push({name: i, uv: avarge_erdos_num_per_age(i)})

// }
// return the_Data
// }
  const data = make_data_avarge_artricals();
    
    return (
      <div className="App" >
          <SimpleBottomNavigation  />
          <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',

          }}>
        
            <header className="Chart">
                <LineChart
                    width={1000}
                    height={500}
                    data={data}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8"  />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
                </header>
          </div>  
     </div>
    );
  }
  

  function mapStateToProps(state) {
    return {stats: state.stats}
  
  }
  export default connect(mapStateToProps, {})(connections);