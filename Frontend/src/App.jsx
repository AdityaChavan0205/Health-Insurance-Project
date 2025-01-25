import React from 'react';
import Navbar from './Components/Navbar';
import { Provider } from 'react-redux';
import store from './Components/redux/store/store';

const App = () => (
    <Provider store={store}>
        <Navbar />
    </Provider>
);

export default App;
