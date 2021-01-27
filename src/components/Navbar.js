import HomeChar from '../pages/HomeChar'
import search from '../pages/search'
import conncetions from '../pages/connections'
import statistics from '../pages/statistics' 
import { Route } from 'react-router-dom';
const Navbar = () => {
    return (

             <div className="Routes">
                <Route exact path='/' component={HomeChar} />
                <Route exact path='/search' component={search} />
                <Route exact path='/connections' component={statistics} />
                
            </div>

    )
}
export default Navbar;