/** @jsx React.DOM
*/
var React = require('react');
global.Immutable = require('immutable');

var Chart = React.createClass({
  componentDidUpdate: function (prevProps) {
    if (!Immutable.is(this.props.chart, prevProps.chart)) {
      this.state.chartInstance.destroy();
      this.initializeChart();
    }
    if (!Immutable.is(this.props.width, prevProps.width) ||
        !Immutable.is(this.props.height, prevProps.height)) {
      this.state.chartInstance.setSize(this.props.width, this.props.height);
    }
    // prevent re-render
    return false;
  },
  render: function () {
    return (
      <div ref="myChart"></div>
    );
  },
  componentDidMount: function () {
    this.initializeChart();
  },
  initializeChart: function () {
    var chartOptions = Immutable.Map({
      chart: {
        renderTo: this.refs.myChart.getDOMNode(),
        width: this.props.width || null,
        height: this.props.height || null,
      },
      series: this.props.series
    });
    var chartModel = this.props.chart.merge(chartOptions);
    this.setState({
      chartInstance: new global.Highcharts.Chart(chartModel.toJS())
    });
  }
});

var seriesObject = Immutable.Vector({
  name: 'Year 1800',
  data: [107, 31, 635, 203, 2]
}, {
  name: 'Year 1900',
  data: [133, 156, 947, 408, 6]
}, {
  name: 'Year 2008',
  data: [973, 914, 4054, 732, 34]
});

global.getNewChartObject = function () {
  return Immutable.Map({
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Historic World Population by Region'
    },
    subtitle: {
      text: 'Source: Wikipedia.org'
    },
    xAxis: {
      categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population (millions)',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      formatter: function() {
        return ''+
          this.series.name +': '+ this.y +' millions';
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -100,
      y: 100,
      floating: true,
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      shadow: true
    },
    credits: {
      enabled: false
    }
  });
};

global.chart = React.renderComponent(
  <Chart
    series={seriesObject}
    chart={getNewChartObject()} />,
    document.getElementById('example')
);
