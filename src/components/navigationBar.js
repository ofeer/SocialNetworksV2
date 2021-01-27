import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SearchIcon from '@material-ui/icons/Search';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 700,
  },
});


export default function SimpleBottomNavigation() {
    let history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation style={{
      
        position: 'realtive', transform: 'translate(-50%, -50%)', marginLeft: '50%', marginTop:'5%'
      }} 
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction onClick={() => history.push('/') } label="HOME-PAGE" icon={<HomeIcon color="action" />} />
      <BottomNavigationAction onClick={() => history.push('/search')} label="connection to hardes" icon={<SearchIcon />} />
      <BottomNavigationAction onClick={() => history.push('/Connections')} label="Connection between two people" icon={<SettingsInputComponentIcon />} />
    </BottomNavigation>
  );
  
}
