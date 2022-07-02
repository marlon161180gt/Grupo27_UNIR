// Selecciones
const layout = d3.select("#layout")

// Dimensiones

const margins = {
    top: 50,
    right: 20,
    bottom: 100,
    left: 65,
}

// Capas - Elementos HTML

// Titulo del analisis
const title = layout
    .append('div')
    .attr('class', 'title')
    .append('h2')
    .text('Analisis Inflacionario Global')

// Espacio para las tarjetas y la grafica
    const chartGroup = layout
    .append('div')
    .attr('class', 'chartGroup')

// Espacio de las tarjetas
const cardGroup = chartGroup
    .append('div')
    .attr('class', 'cardGroup')
    .attr('style', 'margin-bottom: 1%')

// Tarjetas (titulo y valor)
const card1 = cardGroup
    .append('div')
    .attr('class', 'card')

const valueCard1 = card1
    .append('div')
    .append('p')
    .attr('class', 'dataCard')
    .text('150')

const titleCard1 = card1
    .append('div')
    .append('h3')
    .text('Rango de Años')
 

const card2 = cardGroup
    .append('div')
    .attr('class', 'card')

const valueCard2 = card2
    .append('div')
    .append('p')
    .attr('class', 'dataCard')

const titleCard2 = card2
    .append('div')
    .append('h3')
    .text('Categoría')

const card3 = cardGroup
    .append('div')
    .attr('class', 'card')

const valueCard3 = card3
    .append('div')
    .append('p')
    .attr('class', 'dataCard')  

const titleCard3 = card3
    .append('div')
    .append('h3')
    .text('Inflación Promedio')

const card4 = cardGroup
    .append('div')
    .attr('class', 'card')

const valueCard4 = card4
    .append('div')
    .append('p')
    .attr('class', 'dataCard')

const titleCard4 = card4
    .append('div')
    .append('h3')
    .text('Variación último año')

// Espacio de la grafica
    const chartLayer = chartGroup
    .append('div')
    .attr('class', 'chartLayer')

// Titulo de la grafica
const titleChart = chartLayer
    .append('div')
    .append('h3')
    .attr('class', 'titleChart')
    .text('Analisis de tendencia')
 

// Area de la grafica
const chart = chartLayer
    .append('svg')
    .attr('class', 'chart')

// Inicio de la grafica
const drawChart = chart
    .append('g')
    .attr('class', 'drawChart')
    .attr('transform', `translate(${margins.left},${margins.top})`)

// Espacio para los elementos rect
const rectElements = drawChart
    .append('g')
    .attr('class', 'rectElements')

// Espacio para las etiquetas de datos
const labelsLayer = drawChart
    .append('g')
    .attr('class', 'labels')

// Espacio para el eje x
const xAxisLayer = drawChart
    .append('g')
    .attr('class', 'xAxis')

// Espacio para el eje y
const yAxisLayer = drawChart
    .append('g')
    .attr('class', 'yAxis')
    
// Espacio para los filtros
const filter = layout
    .append('div')
    .attr('class', 'filter')

// Filtro de categoria
const filterCategory = filter
    .append('div')
    .attr('class', 'filterCategory')

const titleCategory = filterCategory
    .append('div')
    .attr('class', 'titleFilter')
    .text('Filtro por Categoria')

const checksCategory = filterCategory
    .append('div')
    .attr('class', 'checksCategory')

// Filtro de País
const filterCountry = filter
    .append('div')
    .attr('class', 'filterCountry')

const titleCountry = filterCountry
    .append('div')
    .attr('class', 'titleFilter')
    .text('Filtro por Pais')

const selectCountry = filterCountry
    .append('div')
    .attr('class', 'selectCountry')
    .append('select')
    .attr('class', 'form-select')
    .attr('style', 'margin-top: 5%')

// Slider año (Filtro por año)
const filterYear = filter
    .append('div')
    .attr('class', 'filterYear')

const titleYear = filterYear
    .append('div')
    .attr('class', 'titleFilter')
    .text('Filtro por Año')

const rangeYear = filterYear
    .append('div')
    .attr('class', 'rangeYear')

// Espacio para el diseño de los input y el slider
const wrapper = rangeYear
    .append('div')
    .attr('class', 'wrapper')

// Espacio para los input
const price_input = wrapper
    .append('div')
    .attr('class', 'price-input')

// Contenedor para valor minimo
const fieldMin = price_input
    .append('div')
    .attr('class', 'field')

fieldMin
    .append('span')
    .text('Min')

// Input para obtener el valor minimo
fieldMin
    .append('input')
    .attr('type', 'number')
    .attr('class', 'input-min')

const separator = price_input
    .append('div')
    .attr('class', 'separator')
    .text('-')

// Contenedor para el valor maximo
const fieldMax = price_input
    .append('div')
    .attr('class', 'field')

fieldMax
    .append('span')
    .text('Max')

// Input para obtener el valor maximo
fieldMax
    .append('input')
    .attr('type', 'number')
    .attr('class', 'input-max')

// Contenedor del slider
const slider = wrapper
    .append('div')
    .attr('class', 'slider')
    .append('div')
    .attr('class', 'progress')

// Contenedor para rangos
const rangeInput = wrapper
    .append('div')
    .attr('class', 'range-input')

// Elemento de rango minimo
rangeInput
    .append('input')
    .attr('type', 'range')
    .attr('class', 'range-min')

// Elemento de rango máximo
rangeInput
    .append('input')
    .attr('type', 'range')
    .attr('class', 'range-max')

// Función para la carga de datos y creación de grafica
const load = async () => {
    data = await d3.csv('New_DataInflation.csv', d3.autoType)

    // Constantes para obtener un arreglo de elementos únicos 
    const distinctCountry = [... new Set(data.map((d) => d.Country))]
    const distinctCategory = [... new Set(data.map((d) => d.Category))]
    const distinctYears = [... new Set(data.map((d) => d.Year))]

    // Constantes para obtener valor mínimo y máximo del arreglo de años (distinctYears)
    const minYear = Math.min(...distinctYears)
    const maxYear = Math.max(...distinctYears)

    // Escaladores 
    const y = d3
        .scaleLinear()
        .range([drawChart.style('height').slice(0,-2), 0])

    const x = d3
        .scaleBand()
        .range([0, drawChart.style('width').slice(0,-2)])
        .paddingOuter(0.2)
        .paddingInner(0.1)

    // Ejes de la grafica
    const xAxisGroup = xAxisLayer
        .append('g')
        .attr('transform', `translate(0, ${drawChart.style('height').slice(0,-2)})`)
        .classed('axis', true)

    const yAxisGroup = yAxisLayer
        .append('g')
        .classed('axis', true)

    // Función para dibujar la grafica parametros(país y categoría)
    const drawChartRect = (country, category) => {

        // Validamos si nuestros parametros vienen vacíos
        if (country !== undefined && category !== undefined){

            // Obtenemos los valores de los años minimo y maximo de nuestro slider
            const minVal = rangeInput.select('input.range-min').node().value,
            maxVal = rangeInput.select('input.range-max').node().value
    
            // Creamos un nuevo arreglo dependiendo los parametros de la funcíon y las constantes de los años
            var newArray = data.filter(function (a){
                return a.Country == country &&
                    a.Category == category && a.Year >= minVal && a.Year <= maxVal
            })

            // Validamos que el nuevo arreglo tenga un valor
            if (newArray[0] === null || newArray[0] === undefined){

                // En caso de no tener valores borramos todos los elementos rect y textos
                const noData = rectElements
                    .selectAll('rect')
                    .remove()
    
                const noLabels = labelsLayer
                    .selectAll('text')
                    .remove()               

            } else {

                // En caso de que el nuevo arreglo tenga datos

                //Cambiamos todos los valores nulos a 0
                Object.keys(newArray).map((key) => 
                    (newArray[key]['Inflation'] === null) ?  newArray[key]['Inflation'] = 0 :  newArray[key]['Inflation'])
    
                // Definimos nuestros accesores

                // El accesor 'x' contendra los años
                const xAccessor = (d) => d.Year

                // El accesor 'y' contendra los datos de inflación
                const yAccessor = (d) => d.Inflation
    
                // Definimos el dominio dinamico que cambiara dependiendo de los datos en el filtro de años (slider)
                x.domain(d3.map(newArray, xAccessor))
    
                // Definimos el dominio dinamico que cambiara dependiendo los filtros de categoria, país y años
                y.domain([d3.min(newArray, yAccessor), d3.max(newArray, yAccessor)])

                // Dibujo de elementos rect
                const rect = rectElements
                    .selectAll('rect')
                    .data(newArray)
    
                rect
                    .enter()
                    .append('rect')
                    .attr('x', (d) => x(xAccessor(d)))
                    .attr('y', (d) => y(0))
                    .attr('width', x.bandwidth)
                    .attr('height', 0)
                    .attr('fill', 'rgba(6,147,227,1)')
                    .merge(rect)
                    .transition()
                    .duration(2900)
                    .attr('x', (d) => x(xAccessor(d)))
                    .attr('y', (d) => y(yAccessor(d)))
                    .attr('width', x.bandwidth)
                    .attr('height', (d) => drawChart.style('height').slice(0,-2) - y(yAccessor(d)))
                    .attr('fill', 'rgba(6,147,227,1)')

                // Dado que hacemos un cambio de nuestro accesor 'x' debemos cerrar el ciclo para reiniciar un nuevo dominimo y se ajusten
                // los rect
                rect.exit().remove()
    
                // Creamos las etiquetas de datos para cada elemento rect
                const labels = labelsLayer
                    .selectAll('text')
                    .data(newArray)

                const f = d3.format(',.2%')
                
                labels
                    .enter()
                    .append('text')
                    .attr('x', (d) => x(xAccessor(d)) + x.bandwidth() / 2)
                    .attr('y', (d) => y(0))
                    .attr('dy', (d) => y(0))
                    .merge(labels)
                    .transition()
                    .duration(2900)
                    .attr('x', (d) => x(xAccessor(d)) + x.bandwidth() / 2)
                    .attr('y', (d) => y(yAccessor(d))- (y(yAccessor(d))))
                    .attr('dy', (d) => y(yAccessor(d)) - 10)
                    .text((d) => f(+d.Inflation/100))

                // Dado que hacemos un cambio de nuestro accesor 'x' debemos cerrar el ciclo para reiniciar un nuevo dominimo y se ajusten
                // las etqiuetas
                labels.exit().remove()

                // Ejes dinamicos
                const xAxis = d3.axisBottom(x)
                var yAxis = undefined

                if (country === 'All Countries') {
                    yAxis = d3.axisLeft(y).tickFormat((d) => `${d3.format('.2s')(d)}`)
                } else {
                    yAxis = d3.axisLeft(y).tickFormat((d) => `${f(d/100)}`)
                }

                xAxisGroup
                    .transition()
                    .duration(2900)
                    .call(xAxis)

                yAxisGroup
                    .transition()
                    .duration(2900)
                    .call(yAxis)
            }
        }
    }

    // Función para obtener la inflación promedio de acuerdo a los parametros  y las constantes de los años
    const getAvgInflation = (country, category) => {
        
        // Obtenemos los valores de los años minimo y maximo de nuestro slider
        const minVal = rangeInput.select('input.range-min').node().value,
        maxVal = rangeInput.select('input.range-max').node().value

        // Validamos si nuestros parametros vienen vacíos
        if (country !== undefined && category !== undefined) {

            // Creamos un nuevo arreglo dependiendo los parametros de la funcíon y las constantes de los años
            var newArray = data.filter(function (a){
                return a.Country == country &&
                    a.Category == category &&
                    a.Year >= minVal && a.Year <= maxVal
            })

            // Validamos que nuestro nuevo arreglo contenga datos
            if (newArray === undefined) {

                // En caso de que no tenga datos mostramos un mensaje en la tarjeta de "No Data"
                valueCard3
                    .text('No Data')
                    .style('color', 'black')
                    .style('font-style','oblique')
                
            } else {
                
                // En caso de que nuestro nuevo arreglo tenga datos 
                // Sumamos todos los valores del atributo 'Inflation'
                const sumInflation = newArray.reduce((acc, value) => acc + value.Inflation, 0)
                
                // Filtramos los elementos que no esten vacios del nuevo arreglo y los guardamos en una constante
                const totalRegistros = newArray.filter(element => element.Inflation != null)
                
                // Calculamos el promedio dividiendo la suma de todos los valores del atributo 'Inflation' entre
                // El total de registros (Quitamos los valores nulos ya que son considerados como 0 y estos no entran en el calculo de la suma)
                
                var avgInflation = 0
                
                if (country === 'All Countries'){

                    avgInflation = sumInflation / (distinctCountry.length - 1)

                } else {
                    
                    avgInflation = sumInflation / totalRegistros.length
                }
                
                const f = d3.format(',.2%')
        
                // Validamos si el promedio es mayor a cero pintamos el texto de verde y en caso contrario pintamos el texto de rojo
                if (avgInflation < 0){
                    valueCard3
                    .style('color', 'red')
                    .style('font-size','40px')
                } else {
                    valueCard3
                    .style('color', 'green')
                    .style('font-size','40px')
                }

                // Asignamos el valor a la tarjeta redondeando a dos decimales
                valueCard3.text(f(avgInflation/100))
            }
        }   

    }

    // Función para asignar el rango de años a una tarjeta
    const getYearRange = () =>{
        valueCard1
            .text(rangeInput.select('input.range-min').node().value + "-" + rangeInput.select('input.range-max').node().value)
    }

    // Función para asignar la categoria a una tarjeta
    const getCategory = (category) => {
        valueCard2
            .text(category)
            .style('color', 'rgba(6,147,227,1)')
            .style('font-size','23px')
    }

    // Función para obtener la variación dependiendo los parametros y el valor máximo del año seleccionado
    const getVarLastYear = (country, category) => {

        // Obtenemos el año máximo del slider
        const maxVal = rangeInput.select('input.range-max').node().value

        // Validamos si nuestos paramestros tienen información
        if (country !== undefined && category !== undefined){

            // Creamos un nuevo arreglo que nos devuelva los resultados dependiendo los parametros y el año maximo y el año anterior
            var newArray = data.filter(function (a){
                return a.Country == country &&
                    a.Category == category && a.Year >= (maxVal-1) && a.Year <= maxVal
            })

            // Si nuestro nuevo arreglo no devuleve un dato mandamos el texto "No Data" a la tarjeta
            if (newArray[0] === undefined){
                valueCard4
                    .text('No Data')
                    .style('color', 'black')
            } else {

                // En caso de que nuestro nuevo arreglo tenga datos
                // Obtendremos el último registro de nuestro array siendo el año máximo y lo dividimos entre el primer registro de nuestro
                // Arreglo siendo el año anterior le restamos 1 para obtener la diferencia y multiplicamos por 100 para obtener el porcentaje
                const varLastYear = (newArray[1]['Inflation'] / newArray[0]['Inflation'] - 1) * 100

                // Validamos si nuestro resultado es distinto a un número u algún error como infinito
                if (isNaN(varLastYear) || !isFinite(varLastYear)){

                    // En caso de que nuestro resultado no sea un número o no sea finito regresamos a la tarjeta el texto 'No Data'
                    valueCard4
                        .text('No Data')
                        .style('color', 'black')

                } else {

                    // En caso de que nuestro resultado sea un número y sea finito
                    // Si nuestro resultado es negativo pintamos el texto de rojo, caso contrario nuestro resultado es positivo
                    // pintamos el texto de verde
                    if (varLastYear < 0){
                        valueCard4
                        .style('color', 'red')
                        .style('font-size','40px')
                    } else {
                        valueCard4
                        .style('color', 'green')
                        .style('font-size','40px')
                    }

                    // Asignamos el valor a la tarjeta redondeando a dos decimales
                    const f = d3.format(',.2%')
                    valueCard4.text(f(varLastYear/100))
                }

            }
        }

    }

    // Creando los botones radio de las categorias
    checksCategory
        .selectAll('input')
        .data(distinctCategory)
        .enter()
        .append('div')
        .attr('class', 'form-check')
        .html(r => `
        <input class="form-check-input" type="radio" name="Country" value="${r}">
        <label class="form-check-label">${r}`)
        

    // Asignando al primer elemento la propiedad de selección
    checksCategory
        .select('input')
        .property('checked', true)
    
    // Creando las opciones de los paises del elemento select
    selectCountry
        .selectAll('option')
        .data(distinctCountry)
        .enter()
        .append('option')
        .attr('value', (d) => d)
        .text((d) => d)

    // Input de valor minimo del año en modo solo lectura
    fieldMin
        .select('input')
        .attr('value', minYear)
        .attr('readonly', true)

    // Input de valor maximo del año en modo solo lectura
    fieldMax
        .select('input')
        .attr('value', maxYear)
        .attr('readonly', true)


    // Asignación al elemento rango el valor minimo, maximo y valor inicial (para dato minimo)
    rangeYear
        .select('input.range-min')
        .attr('min', minYear)
        .attr('max', maxYear)
        .attr('value', minYear)

    // Asignación al elemento rango el valor minimo, maximo y valor inicial (para dato maximo)
    rangeYear
        .select('input.range-max')
        .attr('min', minYear)
        .attr('max', maxYear)
        .attr('value', maxYear)

    // Eventos

    getAvgInflation(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
    getCategory(checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
    getVarLastYear(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
    drawChartRect(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
    getYearRange()

    // Evento para cuando se genere un cambio en el elemento de selección de país
    selectCountry.on("change", (e) => {
        e.preventDefault()
        getAvgInflation(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        getVarLastYear(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        drawChartRect(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)

    })

    // Evento para cuando se genere un cambio en el elemento de botones radio
    checksCategory.selectAll('div.form-check').on("change", (e) => {
        e.preventDefault()
        getAvgInflation(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        getCategory(checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        getVarLastYear(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        drawChartRect(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)

    })

    // Evento para cuando se mueva el slider para la selección de años
    let yearGAP = 1

    rangeInput.selectAll('input').on('input', (e) => {

        e.preventDefault()

        // Obtenemos los valores minimo y maximo de años
        let minVal = rangeInput.select('input.range-min').node().value,
        maxVal = rangeInput.select('input.range-max').node().value

        // Obtenemos la longitud del arreglo de años
        totalArray = distinctYears.length

        // Obtenemos la posición de los valores maximos y minimos dentro del array distinctYears
        positionArray_Min = distinctYears.indexOf(parseInt(minVal))
        positionArray_Max = distinctYears.indexOf(parseInt(maxVal))

        // Condicional para mantener los valores minimo y maximo separados por 1 año
        // Si la resta del valor maximo menos el valor minimo es menor al valor 'yearGAP'
        if(maxVal - minVal < yearGAP){

            // Si la clase de la variable del evento es el rango minimo
            if(e.target.className === 'range-min'){

                // Asignamos al rango minimo el valor maximo menos el gap definido
                rangeInput.select('input.range-min').node().value = maxVal - yearGAP

            // Si la clase de la variable del evento no es el rango minimo
            } else {

                //Asignamos al rango maximo el valor minimo mas el gap definido
                rangeInput.select('input.range-max').node().value = minVal + yearGAP
            }
         
        // Si la resta del valor maximo menos el valor minimo no es menor al valor 'yearGAP'
        } else {

            // Mantenemos los valores minimos y maximos en los input
            fieldMin
            .select('input')
            .attr('value', minVal)

            fieldMax
            .select('input')
            .attr('value', maxVal)

            // De acuerdo a la posicion de valor minimo y maximo del slider moveremos la barra de color negro del slider
            slider.style('left', (positionArray_Min / totalArray) * 105 + "%")
            slider.style('right', 100 - (positionArray_Max / totalArray) * 105 + "%")  
        }

        getAvgInflation(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        getVarLastYear(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        drawChartRect(selectCountry.node().value, checksCategory.select('div.form-check input.form-check-input[name="Country"]:checked').node().value)
        getYearRange()

    })
}

// Iniciamos la función 'load'
load()