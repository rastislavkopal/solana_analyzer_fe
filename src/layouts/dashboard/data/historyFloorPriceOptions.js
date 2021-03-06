import moment from "moment";

export const historyFloorPriceOptionsDashboard = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    noData: {  
      text: "Loading data...",  
      align: 'center',  
      verticalAlign: 'middle',  
      offsetX: 0,  
      offsetY: 0,  
      style: {  
        color: "#ffffff",  
        fontSize: '20px',  
        fontFamily: "Helvetica"  
      }  
    },
    xaxis: {
        type: "datetime",
        labels: {
            style: {
            colors: "#c8cfca",
            fontSize: "10px",
            },
            formatter: function (value, timestamp) {
              return moment(value).format("HH:mm");
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "10px",
        },
      },
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
  