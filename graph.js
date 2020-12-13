// set the dimensions and margins of the graph
var margin = { top: 10, right: 40, bottom: 30, left: 30 }
var width = 1000 - margin.left - margin.right
var height = 600 - margin.top - margin.bottom

var X_AXIS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'y',
  'z',
]

// append the svg object to the body of the page
var sVg = d3
  .select('#graph-area')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  // translate this svg element to leave some margin.
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// X scale
var xScale = d3
  .scaleBand()
  .domain(X_AXIS) // This is the min and the max of the data: 0 to 100 if percentages
  .range([0, width]) // This is the corresponding value I want in Pixel

// X scale
var yScale = d3
  .scaleLinear()
  .domain([-10, 100]) // This is the min and the max of the data: 0 to 100 if percentages
  .range([height, 0]) // This is the corresponding value I want in Pixel\

// append y axis
var ylabel = sVg.append('g').call(d3.axisLeft(yScale))

// append x axis
sVg
  .append('g')
  .attr('transform', 'translate(0,' + yScale(0) + ')')
  .call(d3.axisBottom(xScale))
