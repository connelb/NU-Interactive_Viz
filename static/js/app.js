function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  function buildPlot() {
  
    /* data route */

  var url = "/samples/<sample>";
  d3.json(url).then(function(response) {

    console.log('response',response);

    //var data = response;

    // var layout = {
    //   scope: "usa",
    //   title: "Pet Pals",
    //   showlegend: false,
    //   height: 600,
    //         // width: 980,
    //   geo: {
    //     scope: "usa",
    //     projection: {
    //       type: "albers usa"
    //     },
    //     showland: true,
    //     landcolor: "rgb(217, 217, 217)",
    //     subunitwidth: 1,
    //     countrywidth: 1,
    //     subunitcolor: "rgb(255,255,255)",
    //     countrycolor: "rgb(255,255,255)"
    //   }
    // };

    // Plotly.newPlot("plot", data, layout);
  });
}

buildPlot();
console.log('buildPlot called');
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    console.log('sampleNames',sampleNames)
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  console.log('new sample called');
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
