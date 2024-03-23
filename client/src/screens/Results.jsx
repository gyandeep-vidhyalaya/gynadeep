import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './styles/Home.css';
import './styles/Results.css'
import ResultCard from '../components/ResultCard'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Results = () => {

  const yearOptions = [];
  for (let i = 2018; i <= 2040; i++) {
    yearOptions.push(
      <option key={i} value={i}>{i}</option>
    );
  }

  const [ResultData, setResultData] = useState([]);
  const [standard, setStandard] = useState('');
  const [division, setDivision] = useState('');
  const [year, setYear] = useState('');

  const loadResultData = async () => {
    const response = await fetch(`${BACKEND_URL}/api/resultdata`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    const ob = {};
    for (const result of data) {
      if (!ob[result['year']])
        ob[result['year']] = [];
      ob[result['year']].push(result);
    };

    const final_data = [];
    for (const key in ob) {
      let arr = ob[key].sort((a, b) => {
        if (a.standard !== b.standard) {
          return a.standard.localeCompare(b.standard);
        }
        return a.division.localeCompare(b.division);
      });
      final_data.push([key, arr]);
    }
    final_data.reverse();
    setResultData(final_data);

  };

  useEffect(() => {
    loadResultData();
  }, []);


  return (
    <div id='HomeScreen'>
      <Navbar />
      <div className='view-body'>
        {
          ResultData.length > 0 ?
            ResultData.map((resultList, index) => {
              return (
                <div key={index} className='result-list'>
                  <h2><b>Resuls of Year {resultList[0]}</b></h2>
                  <hr />
                  {
                    resultList[1].map((result, index) => {
                      return (
                        <ResultCard key={result._id} result={result} />
                      )
                    })
                  }
                </div>
              )
            })
            : ""
        }
      </div>
    </div>
  )
}

export default Results
