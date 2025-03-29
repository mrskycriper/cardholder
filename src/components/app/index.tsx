import { useEffect } from 'react';
import Header from '../header';
import CardStack from '../card-stack';
import './styles.module.css';
import { updateTheme } from './utils';

function App() {
    useEffect(() => {
        updateTheme();
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", () => {
            updateTheme();
          });
      }, []);
      
    return (
        <div className="App">
            <Header />
            <CardStack />
        </div>
    );
}

export default App;
