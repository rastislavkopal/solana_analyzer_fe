
export const ItemListedForDistributionOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      events: {
        click(event, chartContext, config) {
            let dataPoint = config.config.series[config.seriesIndex].data[config.dataPointIndex];
            window.open(`https://magiceden.io/item-details/${dataPoint.mintAddress}`, '_blank').focus();
            }
        },
        zoom: {
            enabled: true,
            type: 'xy'
        }
    },
    tooltip: {
      theme: "dark",
      custom: ({series, seriesIndex, dataPointIndex, w})=>{
        let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

        let convertMinutesToTime = (minutes) => {
          var h = Math.floor(minutes / 60);
          var m = minutes % 60;
          h = h < 10 ? '0' + h : h; 
          m = m < 10 ? '0' + m : m; 
          return h + 'h ' + m + 'm';
        }

        return `<ul>
            <li><img src="${data.image}" width="auto" height="140"/></li>
            <li>${data.name}</li>
            <li>Listed for: ${ convertMinutesToTime(data.y.toFixed(0)) }</li>
        </ul>`;
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
        tickAmount: 10,
        labels: {
            style: {
                colors: "#c8cfca",
                fontSize: "10px",
            },
            formatter: function(val) {
                return parseFloat(val).toFixed(1)
            }
        }
      },
    yaxis: {
        tickAmount: 7,
        labels: {
            style: {
                colors: "#c8cfca",
                fontSize: "10px",
              },
            formatter: function(val) {
                return parseFloat(val).toFixed(1)
            }
        }
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 5,
      borderColor: "#56577A",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [],
      },
      colors: ["#0075FF", "#2CD9FF"],
    },
    colors: ["#0075FF", "#2CD9FF"],
  };
  