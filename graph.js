// set the dimensions and margins of the graph
var margin = { top: 10, right: 40, bottom: 30, left: 30 },
  width = 450 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom

// append the svg object to the body of the page
var sVg = d3
  .select('#Area')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  // translate this svg element to leave some margin.
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// X scale and Axis
var x = d3
  .scalePoint()
  .domain([
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
  ]) // This is the min and the max of the data: 0 to 100 if percentages
  .range([0, width]) // This is the corresponding value I want in Pixel
sVg
  .append('g')
  .attr('transform', 'translate(0,' + height + ')')
  .call(d3.axisBottom(x))

// X scale and Axis
var y = d3
  .scaleLinear()
  .domain([-10, 100]) // This is the min and the max of the data: 0 to 100 if percentages
  .range([height, 0]) // This is the corresponding value I want in Pixel
sVg.append('g').call(d3.axisLeft(y))
