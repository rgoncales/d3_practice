function getRandomInt(max) {
  const maxY = 11
  return Math.floor(Math.random() * maxY * Math.floor(max)) - 10
}

const USER_INPUT = 10
const DUMMY_DATA = []
var X_AXIS = []

for (i = 97; i < 123; i++) {
  const charLabel = String.fromCharCode(i)
  const value = getRandomInt(USER_INPUT)
  DUMMY_DATA.push({ value: value, region: charLabel })
  X_AXIS.push(charLabel)
}

// set the dimensions and margins of the graph
var margin = { top: 10, right: 40, bottom: 30, left: 30 }
var width = 1000 - margin.left - margin.right
var height = 600 - margin.top - margin.bottom

// append the svg object to the body of the page
var container = d3
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
  .padding(0.3)

// Y scale
var yScale = d3
  .scaleLinear()
  .domain([-10, 100]) // This is the min and the max of the data: 0 to 100 if percentages
  .range([height, 0]) // This is the corresponding value I want in Pixel\

// append y axis
var ylabel = container.append('g').call(d3.axisLeft(yScale))

// append x axis
container
  .append('g')
  .attr('transform', 'translate(0,' + yScale(0) + ')')
  .call(d3.axisBottom(xScale))

// bars
function getBarHeight(value) {
  if (value >= 0) {
    return yScale(0) - yScale(value)
  }
  return yScale(value) - yScale(0)
}

function getBarStart(value) {
  if (value >= 0) {
    return yScale(value)
  }
  return yScale(0)
}

const bars = container
  .selectAll('.bar')
  .data(DUMMY_DATA)
  .enter()
  .append('rect')
  .classed('bar', true)
  .attr('width', xScale.bandwidth())
  .attr('height', data => getBarHeight(data.value))
  .attr('x', data => xScale(data.region))
  .attr('y', data => getBarStart(data.value))
