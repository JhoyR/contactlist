import Contact from './Contact';
import './App.css'
import { useState } from 'react';

function App() {

  var [list, setList] = useState([]);

  return (
      <Contact />
  );
}
export default App;
