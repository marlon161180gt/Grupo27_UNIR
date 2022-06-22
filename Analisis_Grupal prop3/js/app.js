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
    .text('Analiisis Inflacionario Global')

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
    // .text('Food')

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
    // .text('10.58%')    

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
    .attr('class', 'titleFilter')
    .text('Filter by Category')

const checksCategory = filterCategory
    .append('div')
    .attr('class', 'checksCategory')

const filterCountry = filter
    .append('div')
    .attr('class', 'filterCountry')

const titleCountry = filterCountry
    .append('div')
    .attr('class', 'titleFilter')
    .text('Filter by Country')

const selectCountry = filterCountry
    .append('div')
    .attr('class', 'selectCountry')
    .append('select')
    .attr('class', 'form-select')
    .attr('style', 'margin-top: 5%')

const filterYear = filter
    .append('div')
    .attr('class', 'filterYear')

const titleYear = filterYear
    .append('div')
    .attr('class', 'titleFilter')
    .text('Filter by Year')

const rangeYear = filterYear
    .append('div')
    .attr('class', 'rangeYear')

const wrapper = rangeYear
    .append('div')
    .attr('class', 'wrapper')

const price_input = wrapper
    .append('div')
    .attr('class', 'price-input')

const fieldMin = price_input
    .append('div')
    .attr('class', 'field')

fieldMin
    .append('span')
    .text('Min')

fieldMin
    .append('input')
    .attr('type', 'number')
    .attr('class', 'input-min')

const separator = price_input
    .append('div')
    .attr('class', 'separator')
    .text('-')

const fieldMax = price_input
    .append('div')
    .attr('class', 'field')

fieldMax
    .append('span')
    .text('Max')

fieldMax
    .append('input')
    .attr('type', 'number')
    .attr('class', 'input-max')

const slider = wrapper
    .append('div')
    .attr('class', 'slider')
    .append('div')
    .attr('class', 'progress')
    
const rangeInput = wrapper
    .append('div')
    .attr('class', 'range-input')

rangeInput
    .append('input')
    .attr('type', 'range')
    .attr('class', 'range-min')

rangeInput
    .append('input')
    .attr('type', 'range')
    .attr('class', 'range-max')


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

const getAvgInflation = (country, category) => {

    if (country !== undefined && category !== undefined) {
        var newArray = data.filter(function (a){
            return a.Country == country &&
                a.Category == category
        })
        
        // console.log(newArray)
        const sumInflation = newArray.reduce((acc, value) => acc + value[2021], 0)
        const avgInflation = sumInflation / newArray.length
    
        valueCard3.text(avgInflation.toFixed(2) + "%")
    }
    else {
        if(country !== undefined && category === undefined){
            var newArray = data.filter(function (a){
                return a.Country == country
            })
            const sumInflation = newArray.reduce((acc, value) => acc + value[2021], 0)
            const avgInflation = sumInflation / newArray.length

            valueCard3.text(avgInflation.toFixed(2) + "%")
        }
        else{
            if(country === undefined && category !== undefined){
                var newArray = data.filter(function (a){
                    return a.Category == category
                })
                const sumInflation = newArray.reduce((acc, value) => acc + value[2021], 0)
                const avgInflation = sumInflation / newArray.length
    
                valueCard3.text(avgInflation.toFixed(2) + "%")
            }
            else{
                valueCard3.text("")
            }
        }
    }
    
}

const getCategory = (category) => {
    valueCard2.text(category)
    
}

checksCategory
    .selectAll('input')
    .data(distinctCategory)
    .enter()
    .append('div')
    .attr('class', 'form-check')
    .html(r => `
    <input class="form-check-input" type="radio" name="Country" value="${r}">
    <label class="form-check-label">${r}`)

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
    // console.log(selectCountry.node().value)
    getAvgInflation(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
})

getAvgInflation()

checksCategory.selectAll('div.form-check').on("change", (e) => {
    e.preventDefault()
    getAvgInflation(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
    getCategory(checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
})

getCategory()

}

load()