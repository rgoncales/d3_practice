const MAX_SEED = 10
const MIN_SEED = -10
const DEFAULT_SEED = 5
const X_AXIS = 'abcdefghijklmnopqrstuvwxyz'
const Y_AXIS = [-10, 90]

function getRandomInt(max) {
  const maxY = 10
  return Math.floor(Math.random() * maxY * Math.abs(max)) - 10
}

// generates data based on a given seed
function generateData(seed) {
  const data = []
  for (i = 97; i < 123; i++) {
    const charLabel = String.fromCharCode(i)
    const value = getRandomInt(seed)
    data.push({ value: value, region: charLabel })
  }
  return data
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

// Y scale
var yScale = d3
  .scaleLinear()
  .domain(Y_AXIS) // This is the min and the max of the data: 0 to 100 if percentages
  .range([height, 0]) // This is the corresponding value I want in Pixel\

// append y axis
var ylabel = container.append('g').call(d3.axisLeft(yScale))

// X scale
var xScale = d3
  .scaleBand()
  .domain(X_AXIS)
  .range([0, width]) // This is the corresponding value I want in Pixel
  .padding(0.3)

// append x axis
container
  .append('g')
  .attr('transform', 'translate(0,' + yScale(0) + ')')
  .call(d3.axisBottom(xScale))

// bar functions
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

function drawBars() {
  const DUMMY_DATA = generateData(DEFAULT_SEED)
  container
    .selectAll('.bar')
    .data(DUMMY_DATA)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', xScale.bandwidth())
    .attr('height', data => getBarHeight(data.value))
    .attr('x', data => xScale(data.region))
    .attr('y', data => getBarStart(data.value))
}
function updateBars(graphData) {
  container
    .selectAll('.bar')
    .data(graphData)
    .transition()
    .duration(500)
    .attr('width', xScale.bandwidth())
    .attr('height', data => getBarHeight(data.value))
    .attr('x', data => xScale(data.region))
    .attr('y', data => getBarStart(data.value))
}
function userInputChange() {
  let value = this.value
  value = Math.floor(value)
  value = Math.min(value, MAX_SEED)
  value = Math.max(value, MIN_SEED)
  d3.select('#user_input').property('value', value)
  updateBars(generateData(value))
}

// initialState and onChange
drawBars()
d3.select('#user_input').on('change', userInputChange)
d3.select('#user_input').property('value', DEFAULT_SEED)
