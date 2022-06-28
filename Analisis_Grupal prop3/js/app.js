// Selecciones
const layout = d3.select("#layout")

// Dimensiones

const margins = {
    top: 10,
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

    //Accessors

    // const xAccessor = (d) => d.Country
    // const yAccessor = (d) 
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

    const years = Object.keys(data[0]).filter(year => !isNaN(+year))
    const minYear = Math.min(...years)
    const maxYear = Math.max(...years)


    //Accessors
    
    const yAccessor = (d) => d[2011]
    const xAccessor = (d) => d.Country
    

    // Escalators

    const y = d3
        .scaleLinear()
        .domain([d3.min(data, yAccessor), d3.max(data, yAccessor)])
        .range([drawChart.style('height').slice(0,-2), 0])

    const x = d3
        .scaleBand()
        .domain(d3.map(data, xAccessor))
        .range([0, drawChart.style('width').slice(0,-2)])
        .paddingOuter(0.2)
        .paddingInner(0.1)

        // console.log(d3.map(data, xAccessor))
        // console.log(d3.map(data, yAccessor))

    // Elements
    const rect = drawChart
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d) => x(xAccessor(d)))
        .attr('y', (d) => y(yAccessor(d)))
        .attr('width', x.bandwidth)
        .attr('height', (d) => drawChart.style('height').slice(0,-2) - y(yAccessor(d)))
        .attr('fill', 'rgb(75,172,198)')


    const drawChartRect = (country, category) => {
        if (country !== undefined && category !== undefined){

            const minVal = rangeInput.select('input.range-min').node().value,
            maxVal = rangeInput.select('input.range-max').node().value

            var newArray = data.filter(function (a){
                return a.Country == country &&
                    a.Category == category
            })

            console.log(newArray)

            var arrayYears = Object.entries(newArray[0]).filter(columns => columns >= minVal && columns <= (maxVal+1))   


        }
    }


    const getAvgInflation = (country, category) => {
        
        const minVal = rangeInput.select('input.range-min').node().value,
        maxVal = rangeInput.select('input.range-max').node().value

        if (country !== undefined && category !== undefined) {

            var newArray = data.filter(function (a){
                return a.Country == country &&
                    a.Category == category
            })

            if (newArray[0] === undefined) {

                valueCard3
                    .text('No Data')
                    .style('color', 'black')
                
            } else {

                var newArray2 = Object.entries(newArray[0]).filter(columns => columns >= minVal && columns <= (maxVal+1))
                
                const sumInflation = newArray2.reduce((acc, value) => acc + value[1], 0)
                
                const totalRegistros = newArray2.filter(element => element[1] != null)
        
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
                    a.Category == category
            })

            if (newArray[0] === undefined){
                valueCard4
                    .text('No Data')
                    .style('color', 'black')
            } else {

                const varLastYear = (newArray[0][maxVal] / newArray[0][maxVal-1] - 1) * 100

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

    //----------------------------------------------------------------------------------------------------------------------------------------------

    // // Dimensiones
    // const anchoTotal = +chart.style("width").slice(0, -2)
    // const altoTotal = (anchoTotal * 9) / 16

    // //Graph print
    // const ancho = anchoTotal - margins.left - margins.right
    // const alto = altoTotal - margins.top - margins.bottom
        
    //     // Elementos gráficos (layers)
    //     const svg = chart
    //       .append("svg")
    //       .attr("width", anchoTotal)
    //       .attr("height", altoTotal)
    //       .attr("class", "chart")
        
    //     drawChart
    //       .append("rect")
    //       .attr("height", alto)
    //       .attr("width", ancho)
    //       .attr("fill", "blue")
        
    
    // const draw = async () => {     

    //  //   data = await d3.csv('Dataset_inflation.csv', d3.autoType)

    //     // selectCountry
    //     // .selectAll("option")
    //     // .data(Object.keys(data[0]).slice(1))
    //     // .enter()
    //     // .append("option")
    //     // .attr("value", (d) => d)
    //     // .text((d) => d)

    //   // Accessor
    //   const xAccessor = (d) => d.Country

    //   // Escaladores
    //   const y = d3.scaleLinear().range([alto, 0])
    //   const color = d3
    //     .scaleOrdinal()
    //     .domain(Object.keys(data[0]).slice(1))
    //     .range(d3.schemeTableau10)

    //   // console.log(data)
    //   // console.log(d3.map(data, xAccessor))

    //   const x = d3.scaleBand().range([0, ancho]).paddingOuter(0.2).paddingInner(0.1)

    // //   const titulo = g
    // //     .append("text")
    // //     .attr("x", ancho / 2)
    // //     .attr("y", -15)
    // //     .classed("titulo", true)

    //  const etiquetas = drawChart.append("g")

    //   const xAxisGroup = drawChart
    //     .append("g")
    //     .attr("transform", `translate(0, ${alto})`)
    //     .classed("axis", true)
    //   const yAxisGroup = drawChart.append("g").classed("axis", true)

    //   const render = (variable) => {
    //     // Accesores
    //     const yAccessor = (d) => d[variable]
    //     data.sort((a, b) => yAccessor(b) - yAccessor(a))

    //     // Escaladores
    //     y.domain([0, d3.max(data, yAccessor)])
    //     x.domain(d3.map(data, xAccessor))

    //     // Rectángulos (Elementos)
    //     const rect = drawChart.selectAll("rect").data(data, xAccessor)
    //     rect
    //       .enter()
    //       .append("rect")
    //       .attr("x", (d) => x(xAccessor(d)))
    //       .attr("y", (d) => y(0))
    //       .attr("width", x.bandwidth())
    //       .attr("height", 0)
    //       .attr("fill", "green")
    //       .merge(rect)
    //       .transition()
    //       .duration(2500)
    //       // .ease(d3.easeBounce)
    //       .attr("x", (d) => x(xAccessor(d)))
    //       .attr("y", (d) => y(yAccessor(d)))
    //       .attr("width", x.bandwidth())
    //       .attr("height", (d) => alto - y(yAccessor(d)))
    //       .attr("fill", (d) =>
    //         xAccessor(d) == "Satélite" ? "#f00" : color(variable)
    //       )

    //     const et = etiquetas.selectAll("text").data(data)
    //     et.enter()
    //       .append("text")
    //       .attr("x", (d) => x(xAccessor(d)) + x.bandwidth() / 2)
    //       .attr("y", (d) => y(0))
    //       .merge(et)
    //       .transition()
    //       .duration(2500)
    //       .attr("x", (d) => x(xAccessor(d)) + x.bandwidth() / 2)
    //       .attr("y", (d) => y(yAccessor(d)))
    //       .text(yAccessor)

    //     // Títulos
    //     titulo.text(`${variable} de las Tiendas`)

    //     // Ejes
    //     const xAxis = d3.axisBottom(x)
    //     const yAxis = d3.axisLeft(y).ticks(8)
    //     xAxisGroup.transition().duration(2500).call(xAxis)
    //     yAxisGroup.transition().duration(2500).call(yAxis)
    //   }

    //   // Eventos
    //   selectCountry.on("change", (e) => {
    //     e.preventDefault()
    //     // console.log(e.target.value, metrica.node().value)
    //     render(e.target.value)
    //   })
    //   render()
    // }

    // draw()

    //----------------------------------------------------------------------------------------------------------------------------------

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

    })

    checksCategory.selectAll('div.form-check').on("change", (e) => {
        e.preventDefault()
        getAvgInflation(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        getCategory(checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        getVarLastYear(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)

    })

    let yearGAP = 1

    rangeInput.selectAll('input').on('input', (e) => {

        e.preventDefault()

        let minVal = rangeInput.select('input.range-min').node().value,
        maxVal = rangeInput.select('input.range-max').node().value

        totalArray = years.length
        positionArray_Min = years.indexOf(minVal)
        positionArray_Max = years.indexOf(maxVal)

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
            slider.style('right', 95 - (positionArray_Max / totalArray) * 100 + "%")  
        }

        getAvgInflation(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        getVarLastYear(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        drawChartRect(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)

})



}

load()