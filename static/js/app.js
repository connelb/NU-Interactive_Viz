
function buildMetadata(sample) {

  function buildPlot() {
    var url = "/metadata/" + sample;
    var selector = d3.select('#sample-metadata');
    selector.html('');

    d3.json(url).then((response) => {

      Object.entries(response).forEach(([key, value]) => {
        selector
          .append('div')
          .html(`${key}: ${value}</br>`)
      }
      );
    });
  }

  // BONUS: Build the Gauge Chart
  // buildGauge(data.WFREQ);
  //})
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
var labels = [];
var values = [];
var hovertext = [];
var bubbleChart = d3.select('#bubble');

//sample.forEach((sampleDatum,i)=>{
  //for (i=0;i<sample.length;i++){
    //console.log(sample, sample.length);
  var url = "/samples/" + sample;
  

  d3.json(url).then((response) => {
    //console.log(response)
    labels.push(response.otu_ids)
    values.push(response.sample_values)
    hovertext.push(response.otu_labels)
  })
  //}
  console.log('what is labels', labels,values);
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).


    var trace = {
      labels: labels,
      values: values,
      type: 'pie'
    };

    var data = [trace];

    var layout = {
      title: "Title here",
    };

    Plotly.newPlot("pie", data, layout);
  //})
}

function init() {
      // Grab a reference to the dropdown select element
      var selector = d3.select("#selDataset");


      // Use the list of sample names to populate the select options
      d3.json("/names").then((sampleNames) => {
        sampleNames.forEach((sample) => {
          selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        const firstSample = sampleNames[0];
        //var top10 = sampleNames.slice(0,10)
        buildCharts(firstSample);
        buildMetadata(firstSample);
      });
    }

function optionChanged(newSample) {
      // Fetch new data each time a new sample is selected
      //console.log('new sample called');
      buildCharts(newSample);
      buildMetadata(newSample);
    }

// Initialize the dashboard
init();

