import React, { useState, useEffect } from 'react';
import moment from 'moment'


function dateFormatter(tickItem) {
  return moment(tickItem).format('HH:mm')
}

export default function historyFloorPriceData(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const limit = (props.limit) ? props.limit : {label: 50, value: 50};
    fetch("http://104.248.32.119:3000/v1/collection/" + props.selectedOption.value + "/history/floor?limit=" + limit.value)
      .then(res => res.json())
      .then(
        (result) => {
          let its = [];
          result.reverse();
          result.forEach((it, idx) => {
            if (idx % Math.floor(limit.value / 20) !== 0) return;

            its.push({
              timestamp: dateFormatter(it.timestamp),
              value: it.value / 1e9,
            });
          });
          setIsLoaded(true);
          setItems(its);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [props.selectedOption, props.limit])
  
    return items;
}