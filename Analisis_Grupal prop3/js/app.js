// Selecciones
const layout = d3.select("#layout")

// Dimensiones

const margins = {
    top: 0,
    right: 20,
    bottom: 75,
    left: 100,
}

// Layers

// Title of analysis
const title = layout
    .append('div')
    .attr('class', 'title')
    .append('h2')
    .text('Nombre del analisis')

// Layer for cards and chart
    const chartGroup = layout
    .append('div')
    .attr('class', 'chartGroup')

// Layer for cards
const cardGroup = chartGroup
    .append('div')
    .attr('class', 'cardGroup')
    .attr('style', 'margin-bottom: 1%')

// Cards
const card1 = cardGroup
    .append('div')
    .attr('class', 'card')

const titleCard1 = card1
    .append('div')
    .append('h3')
    .text('Total Países')

const valueCard1 = card1
    .append('div')
    .append('p')
    .attr('class', 'dataCard')
    .text('150')

const card2 = cardGroup
    .append('div')
    .attr('class', 'card')

const titleCard2 = card2
    .append('div')
    .append('h3')
    .text('Categoría')

const valueCard2 = card2
    .append('div')
    .append('p')
    .attr('class', 'dataCard')
    .text('Food')

const card3 = cardGroup
    .append('div')
    .attr('class', 'card')

const titleCard3 = card3
    .append('div')
    .append('h3')
    .text('Inflación Promedio')

const valueCard3 = card3
    .append('div')
    .append('p')
    .attr('class', 'dataCard')
    .text('10.58%')    

const card4 = cardGroup
    .append('div')
    .attr('class', 'card')

const titleCard4 = card4
    .append('div')
    .append('h3')
    .text('Variación último año')

const valueCard4 = card4
    .append('div')
    .append('p')
    .attr('class', 'dataCard')
    .text('-58.87%')

// Layer of chart
    const chartLayer = chartGroup
    .append('div')
    .attr('class', 'chartLayer')

const titleChart = chartLayer
    .append('div')
    .append('h3')
    .attr('class', 'titleChart')
    .text('Analisis de tendencia')

const chart = chartLayer
    .append('svg')
    .attr('class', 'chart')

const drawChart = chart
    .append('g')
    .attr('transform', `translate(${margins.left},${margins.top})`)

const filter = layout
    .append('div')
    .attr('class', 'filter')

const filterCategory = filter
    .append('div')
    .attr('class', 'filterCategory')

const titleCategory = filterCategory
    .append('div')
    .attr('class', 'titleCategory')
    .text('Filter by Category')

const checksCategory = filterCategory
    .append('div')
    .attr('class', 'checksCategory')

const filterCountry = filter
    .append('div')
    .attr('class', 'filterCountry')

const titleCountry = filterCountry
    .append('div')
    .attr('class', 'titleCountry')
    .text('Filter by Country')

const selectCountry = filterCountry
    .append('div')
    .append('select')
    .attr('class', 'form-select')
    .attr('style', 'margin-top: 5%')
    
    //Accessors
// Escaladores 
// const y = d3
// .scaleLinear()
// .domain([0, d3.max(data, yAccessor)])
// .range([alto, 0])

// const x = d3
// .scaleBand()
// .domain(d3.map(data, xAccessor))
// .range([0, ancho])
// .paddingOuter(0.2)
// .paddingInner(0.1)


// Load Data
const load = async () => {
    data = await d3.csv('Dataset_inflation.csv', d3.autoType)

const distinctCountry = [... new Set(data.map((d) => d.Country))]
const distinctCategory = [... new Set(data.map((d) => d.Category))]

console.log(distinctCategory)

checksCategory
    .selectAll('div')
    .data(distinctCategory)
    .enter()
    .append('div')
    .attr('class', 'form-check')
    .html(r => `
    <input class="form-check-input" type="radio" name="Country" value=${r}>
    <label class"form-check-label">${r}`)

selectCountry
    .selectAll('option')
    .data(distinctCountry)
    .enter()
    .append('option')
    .attr('value', (d) => d)
    .text((d) => d)

// Events

selectCountry.on("change", (e) => {
    e.preventDefault()
    console.log(e.target.value, selectCountry.node().value)
})


}

load()