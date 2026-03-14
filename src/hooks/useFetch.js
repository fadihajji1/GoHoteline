import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {  // url is the endpoint to fetch data from
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {  // useEffect is a hook that runs when the component mounts/updates
    const fetchData = async () => { 
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);  // to auto refresh the search page without clicking on search button add [url]


  // reFetch is a function that can be called to refetch the data
  // in other way it refresh the page of data === refresh button on browser
  const reFetch = async () => { 
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
