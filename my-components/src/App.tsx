import React from 'react';

import './App.css';
import Button, {ButtonsThemes} from "./components/button/button";
import Modal from "./components/modal/modal";

const App = () =>
    <div className="App">
<Button theme={ButtonsThemes.dark} title={'test'}  >test</Button>
        <Modal display={true} children={<div>'modal window'</div>} onClose={() =>console.log('closed')}/>
    </div>

export default App;
