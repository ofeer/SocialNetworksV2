import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  import SimpleBottomNavigation from '../components/navigationBar'
  import Box from '@material-ui/core/Box';
  import {connect} from 'react-redux';
  import hardesNumbers from '../jsons/hardesNumbers'
  import {homePageAlgo} from '../Algorithms/homePageAlgo'
  import {fetchConnections, setProcessedConnections} from '../actions'
  import {MakeGraph} from '../Algorithms/makeGraph'
  import erdesP from '../components/erdesP.jpg';
 
  

  const data = homePageAlgo(hardesNumbers);
  const HomeChar = ({connections, fetchConnections, setProcessedConnections, stats}) =>
  {
    const getProcessedConnections = (rawData) => {
      console.log(rawData);
      setProcessedConnections(MakeGraph(rawData));
    }
    

    console.log(connections);
    if(!connections.rawData){
        console.log("In FETCH");
        fetchConnections((rawData) => getProcessedConnections(rawData));
      
    }
    // if(!stats.authors_to_publications){
    //   fetchStats();
    //   console.log(stats);
    // }
    return (  
      <div className="App">

          <SimpleBottomNavigation  />
          <div className="photo" style={{
                  textAlign: 'right',
                  marginRight: '75%',
                  position: 'relative'  
          }} >
          <img src={erdesP} alt="erdesP" />
          </div>
          <div style={{
                  textAlign: 'right',
                  marginRight: '16%',
                  position: 'relative'  
          }}>
            
          <Box component="div" visibility="visible" letterSpacing={1} >
             .פאול ארדש (26.3.1913 - 20.9.1996) היה מתמטיקאי יהודי יליד הונגריה <br />
             ,פאול היה ידוע בשיתופי הפעולה הרבים שלו, כאשר פרסם בערך כ-1500 מאמרים במשך חייו <br />
             .לארדש לא היה מקום מגורים קבוע, והוא נדד ממקום למקום כדי לעבוד עם מתמטיקאים אחרים <br />
             .מספר שיתופי הפעולה יוצאי הדופן שלו הביא ליצירת מספרי ארדש <br />
             .עיקר תרומתו של ארדש היא לתורת המספרים ולמתמטיקה בדידה , כאשר הוא פרסם מאות מאמרים בנושאי קומבינטוריקה ותורת הגרפים <br />
          </Box>
          <br /><br />
          <Box component="div" visibility="visible" letterSpacing={1}>
            ,ארדש נחשב למתמטיקאי הפורה ביותר בהיסטוריה מבחינת מספר המאמרים שפרסם<br />
            ,"מסיבה זו, הוא הפך בסביבה המתמטית לנקודת מוקד במה שמכונה "גרף המאמרים <br />
            ,"כלומר, מחברים שפרסמו מאמר עם ארד נחשבים בעלי "מספר ארדש 1 <br />
            ."אלו שלא פרסמו מאמר עם ארדש עצמו אבל פרסמו מאמר עם מתמטיקאי שכן עשה זאת  הם בעלי "מספר ארדש 2 <br />
          </Box>
          </div>
        <div style={{
              position: 'relative',
              transform: 'translate(-50%, -50%)',
              marginLeft: '45%',
              marginTop: "20%", 
              textAlign: 'right'
              
              
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
                  <XAxis dataKey="name" label={{value: "Erdos Number", fontSize: 18, offset:-5 , position: "insideBottom"}}/>
                  <YAxis dataKey="Number Of Authors" label={{value: "Number Of Authors", angle: -90, fontSize: 18, offset:15 , position: "left"}}/>
                  <Tooltip />
                  <Legend verticalAlign= {"middle"}/>
                  <Line type="monotone"  dataKey="Number Of Authors" stroke="#000000" />
              </LineChart>
              </header>
        </div>  
          
        
      </div>
    );
  }

  function mapStateToProps(state) {
    return {connections: state.connections, stats: state.stats}
  }

  export default connect(mapStateToProps, {fetchConnections, setProcessedConnections})(HomeChar);