var chart
function getBarChartData(complexity, showSource, doTour, selector){
    // return d3.json('data/toursteps.json')
    return d3.json('https://vcg.github.io/trust_in_science/bar_chart/data/toursteps.json')
    .then(toursteps => {
        d3.csv("https://vcg.github.io/trust_in_science/bar_chart/data/bar_chart_complex2.csv", (row,i) => {
            row.Index = i;
            row.Vax_18_49 = numbers_format(+row.Vax_18_49);
            row.Vax_50_79 = numbers_format(+row.Vax_50_79);
            row.Vax_80 = numbers_format(+row.Vax_80);
            row.Unvax_18_49 = numbers_format(+row.Unvax_18_49);
            row.Unvax_50_79 = numbers_format(+row.Unvax_50_79);
            row.Unvax_80 = numbers_format(+row.Unvax_80);

            row.Age_adjusted_unvax_IR = (+row.Unvax_18_49)+(+row.Unvax_50_79)+(+row.Unvax_80);
            row.Age_adjusted_vax_IR = (+row.Vax_18_49)+(+row.Vax_50_79)+(+row.Vax_80);

            row.group= row.Week;
            row.Max_Week_Date2 = row.Max_Week_Date
            row.Max_Week_Date = parseDate(row.Max_Week_Date);

            return row;
        })
        .then(data => {
            chart = new StackedBarChart({
                data: data,
                complexity: complexity,
                source: showSource,
                selector: selector
            });
            chart.initVis('chart', true)
            if(complexity == 'simple') chart.initVis('chart2', false)
            if(doTour) createTour(complexity, toursteps)
        });
    })
    
    
}

// getBarChartData('simple', true, true)
// getBarChartData('moderate', true, true)
// getBarChartData('complex', true, true)