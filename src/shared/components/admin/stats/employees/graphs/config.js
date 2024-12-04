function labelDate() {
  const formatter = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "short",
  })

  return formatter.format(new Date(this.value))
}

function tooltipDate(date) {
  const formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    day: "numeric",
    month: "short",
  })

  return formatter.format(new Date(date))
}

export default {
  legend: {
    enabled: false,
  },

  chart: {
    type: "column",
  },

  credits: {
    enabled: false,
  },

  rangeSelector: {
    enabled: true,
    allButtonsEnabled: true,
    selected: 2,
    buttons: [
      {
        type: "week",
        count: 1,
        text: "1н",
      },
      {
        type: "week",
        count: 2,
        text: "2н",
      },
      {
        type: "month",
        count: 1,
        text: "1м",
      },
      {
        type: "all",
        text: "всё",
      },
    ],
  },

  navigator: {
    enabled: true,
    height: 20,
  },

  scrollbar: {
    enabled: true,
  },

  plotOptions: {
    column: {
      dataLabels: {
        enabled: true,
      },
      events: {},
    },
    series: {
      cursor: "pointer",
      marker: {
        enabled: true,
      },
      point: {
        events: {},
      },
    },
  },

  xAxis: {
    crosshair: {
      width: 10,
      color: "rgba(0,0,0,0.2)",
      cursor: "pointer",
    },

    ordinal: false,

    labels: {
      formatter: labelDate,
    },
  },

  tooltip: {
    formatter: function (obj, obj1) {
      const date = tooltipDate(this.x)
      const y = parseInt(this.y)
      return `<span><b>${y}</b></span><span>${date}</span>`
    },
    backgroundColor: null,
    borderWidth: 0,
    shadow: false,
    useHTML: true,
    valueDecimals: 0,
  },

  series: [
    {
      name: "",
      showInLegend: false,
    },
  ],
}
