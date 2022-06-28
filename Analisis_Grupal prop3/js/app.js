// Selecciones
const layout = d3.select("#layout")

// Dimensiones

const margins = {
    top: 50,
    right: 20,
    bottom: 100,
    left: 50,
}

// Layers

// Title of analysis
const title = layout
    .append('div')
    .attr('class', 'title')
    .append('h2')
    .text('Analisis Inflacionario Global')

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

// Layer of chart
    const chartLayer = chartGroup
    .append('div')
    .attr('class', 'chartLayer')

// Espacio de Grafico de Tendencia -----------------------------------------------------------------
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
    .attr('class', 'drawChart')
    .attr('transform', `translate(${margins.left},${margins.top})`)

const labelsLayer = drawChart
    .append('g')
    .attr('class', 'labels')

const xAxisLayer = drawChart
    .append('g')

const yAxisLayer = drawChart
    .append('g')
    
//-------------------------------------------------------------------------------------------------

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

// Load Data
const load = async () => {
    data = await d3.csv('New_DataInflation (2).csv', d3.autoType)

    const distinctCountry = [... new Set(data.map((d) => d.Country))]
    const distinctCategory = [... new Set(data.map((d) => d.Category))]
    const distinctYears = [... new Set(data.map((d) => d.Year))]

    const minYear = Math.min(...distinctYears)
    const maxYear = Math.max(...distinctYears)

    // Escalators
    const y = d3
        .scaleLinear()
        .range([drawChart.style('height').slice(0,-2), 0])

    const x = d3
        .scaleBand()
        .range([0, drawChart.style('width').slice(0,-2)])
        .paddingOuter(0.2)
        .paddingInner(0.1)

    // const xAxisGroup = chart
    //     .append('g')
    //     .attr('transform', `translate(${margins.left}, ${chart.style('height').slice(0,-2)-45})`)
    //     .classed('axis', true)

    const xAxisGroup = xAxisLayer
        .append('g')
        .attr('transform', `translate(0, ${drawChart.style('height').slice(0,-2)})`)
        .classed('axis', true)

    const yAxisGroup = yAxisLayer
        .append('g')
        .classed('axis', true)



    const drawChartRect = (country, category) => {

        if (country !== undefined && category !== undefined){

            const minVal = rangeInput.select('input.range-min').node().value,
            maxVal = rangeInput.select('input.range-max').node().value

            var newArray = data.filter(function (a){
                return a.Country == country &&
                    a.Category == category && a.Year >= minVal && a.Year <= maxVal
            })

            if (newArray[0] === null || newArray[0] === undefined){

                const noData = drawChart
                    .selectAll('rect')
                    .remove()
   
                const noLabels = drawChart
                    .selectAll('text')
                    .remove()
                    
                // drawChart
                //     .append('text')
                //     .attr('class', 'noDataText')
                //     .text('No data to present')
                

            } else {

                // drawChart.select('text').remove()

                Object.keys(newArray).map((key) => 
                    (newArray[key]['Inflation'] === null) ?  newArray[key]['Inflation'] = 0 :  newArray[key]['Inflation'])
    
                const xAccessor = (d) => d.Year
                const yAccessor = (d) => d.Inflation
    
                x.domain(d3.map(newArray, xAccessor))
    
                y.domain([d3.min(newArray, yAccessor), d3.max(newArray, yAccessor)])
    
                const rect = drawChart
                    .selectAll('rect')
                    .data(newArray)
    
                rect
                    .enter()
                    .append('rect')
                    .attr('x', (d) => x(xAccessor(d)))
                    .attr('y', (d) => y(0))
                    .attr('width', x.bandwidth)
                    .attr('height', 0)
                    .attr('fill', 'rgb(75,172,198)')
                    .merge(rect)
                    .transition()
                    .duration(2500)
                    .attr('x', (d) => x(xAccessor(d)))
                    .attr('y', (d) => y(yAccessor(d)))
                    .attr('width', x.bandwidth)
                    .attr('height', (d) => drawChart.style('height').slice(0,-2) - y(yAccessor(d)))
                    .attr('fill', 'rgb(75,172,198)')
    
                const labels = labelsLayer
                    .selectAll('text')
                    .data(newArray)
    
                labels
                    .enter()
                    .append('text')
                    .attr('x', (d) => x(xAccessor(d)) + x.bandwidth() / 2)
                    .attr('y', (d) => y(0))
                    .merge(labels)
                    .transition()
                    .duration(2500)
                    .attr('x', (d) => x(xAccessor(d)) + x.bandwidth() / 2)
                    .attr('y', (d) => y(yAccessor(d)+0.1))
                    .text(yAccessor)

                // Ejes
                const xAxis = d3.axisBottom(x)
                const yAxis = d3.axisLeft(y)

                // const xAxisGroup = drawChart
                // .append('g')
                // .attr('transform', `translate(0, ${drawChart.style('height').slice(0,-2)})`)
                // .classed('axis', true)
                // .call(xAxis)
        
                // const yAxisGroup = drawChart
                //     .classed('axis', true)
                //     .call(yAxis)

                xAxisGroup.transition().duration(2500).call(xAxis)
                yAxisGroup.transition().duration(2500).call(yAxis)
                // yAxisGroup.call(yAxis)
            }

        }
    }


    const getAvgInflation = (country, category) => {
        
        const minVal = rangeInput.select('input.range-min').node().value,
        maxVal = rangeInput.select('input.range-max').node().value

        if (country !== undefined && category !== undefined) {

            var newArray = data.filter(function (a){
                return a.Country == country &&
                    a.Category == category &&
                    a.Year >= minVal && a.Year <= maxVal
            })

            if (newArray === undefined) {

                valueCard3
                    .text('No Data')
                    .style('color', 'black')
                
            } else {
                
                const sumInflation = newArray.reduce((acc, value) => acc + value.Inflation, 0)
                
                const totalRegistros = newArray.filter(element => element.Inflation != null)
                
        
                const avgInflation = sumInflation / totalRegistros.length
        
                if (avgInflation < 0){
                    valueCard3
                    .style('color', 'red')
                } else {
                    valueCard3
                    .style('color', 'green')
                }
                valueCard3.text(avgInflation.toFixed(2) + "%")
            }
        }   

    }

    const getCategory = (category) => {
        valueCard2.text(category)
    }

    const getVarLastYear = (country, category) => {

        const maxVal = rangeInput.select('input.range-max').node().value

        if (country !== undefined && category !== undefined){

            var newArray = data.filter(function (a){
                return a.Country == country &&
                    a.Category == category && a.Year >= (maxVal-1) && a.Year <= maxVal
            })

            if (newArray[0] === undefined){
                valueCard4
                    .text('No Data')
                    .style('color', 'black')
            } else {

                const varLastYear = (newArray[1]['Inflation'] / newArray[0]['Inflation'] - 1) * 100

                if (isNaN(varLastYear) || !isFinite(varLastYear)){

                    valueCard4
                        .text('No Data')
                        .style('color', 'black')

                } else {

                    if (varLastYear < 0){
                        valueCard4
                        .style('color', 'red')
                    } else {
                        valueCard4
                        .style('color', 'green')
                    }
                    valueCard4.text(varLastYear.toFixed(2) + "%")
                }

            }
        }

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
        

    checksCategory
        .select('input')
        .property('checked', true)
        
    selectCountry
        .selectAll('option')
        .data(distinctCountry)
        .enter()
        .append('option')
        .attr('value', (d) => d)
        .text((d) => d)

    fieldMin
        .select('input')
        .attr('value', minYear)
        .attr('readonly', true)

    fieldMax
        .select('input')
        .attr('value', maxYear)
        .attr('readonly', true)


    rangeYear
        .select('input.range-min')
        .attr('min', minYear)
        .attr('max', maxYear)
        .attr('value', minYear)

    rangeYear
        .select('input.range-max')
        .attr('min', minYear)
        .attr('max', maxYear)
        .attr('value', maxYear)

    // Events

    getAvgInflation(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
    getCategory(checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
    getVarLastYear(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
    drawChartRect(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)

    selectCountry.on("change", (e) => {
        e.preventDefault()
        getAvgInflation(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        getVarLastYear(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        drawChartRect(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)

    })

    checksCategory.selectAll('div.form-check').on("change", (e) => {
        e.preventDefault()
        getAvgInflation(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        getCategory(checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        getVarLastYear(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        drawChartRect(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)

    })

    let yearGAP = 1

    rangeInput.selectAll('input').on('input', (e) => {

        e.preventDefault()

        let minVal = rangeInput.select('input.range-min').node().value,
        maxVal = rangeInput.select('input.range-max').node().value

        totalArray = distinctYears.length
        positionArray_Min = distinctYears.indexOf(parseInt(minVal))
        positionArray_Max = distinctYears.indexOf(parseInt(maxVal))

        if(maxVal - minVal < yearGAP){

            if(e.target.className === 'range-min'){
                rangeInput.select('input.range-min').node().value = maxVal - yearGAP
            } else {
                rangeInput.select('input.range-max').node().value = minVal + yearGAP
            }
            
        } else {

            fieldMin
            .select('input')
            .attr('value', minVal)

            fieldMax
            .select('input')
            .attr('value', maxVal)

            slider.style('left', (positionArray_Min / totalArray) * 105 + "%")
            slider.style('right', 100 - (positionArray_Max / totalArray) * 105 + "%")  
        }

        getAvgInflation(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        getVarLastYear(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        drawChartRect(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)

})

}

load()