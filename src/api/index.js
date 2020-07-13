import axios from "axios";

const url = "https://covid19.mathdro.id/api";

const fetchData = async(country) => {
  const params = country ? `/countries/${country}` : '';

  try {
    const { data: { 
      confirmed, 
      recovered, 
      deaths, 
      lastUpdate } 
    } = await axios.get(url + params);

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch(error) {
    console.log(error);
  }
}

const fetchDailyData = async() => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    
    const modifiedData = data.map(dailyData => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate
    }));

    return modifiedData;
  } catch(error) {
    console.log(error);
  }
}

const fetchCountries = async() => {
  try {
    const { data: { countries } } = await axios.get(`${url}/countries`);
    return countries.map(country => country.name);
  } catch(error) {
    console.log(error);
  }
}

export {
  fetchData,
  fetchDailyData,
  fetchCountries,
}

