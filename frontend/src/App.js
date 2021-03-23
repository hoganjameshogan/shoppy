import './App.scss';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {Header, Footer} from './components/BaseComps';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';


function App() {
  return (
    <Router>
      <Header />
        <main>
          <Container className="py3">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
