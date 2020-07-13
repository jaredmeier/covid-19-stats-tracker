import React from 'react';
import { Cards, Chart, CountryPicker } from './components';
import { fetchData } from './api';

import styles from './App.module.css';
import covidImage from './images/covid.png';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      country: '',
    };

    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });
  }

  async handleCountryChange(country) {
    const data = await fetchData(country);
    this.setState({ data, country });
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={covidImage} alt="COVID-19 graphic"/>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
      </div>
    );
  }
}

export default App;