var chart

function getLineChartData(complexity, showSource, doTour, selector) {
    return d3.json('https://vcg.github.io/trust_in_science/bar_chart/data/toursteps.json') //TODO ERIC: ADAPT TO LINE CHART
        .then(toursteps => {
            d3.csv("https://vcg.github.io/trust_in_science/line_chart/data/line_chart_complex.csv", (row, i) => {
                row.Vax_18_49 = number_format(+row.Vax_18_49);
                row.Vax_50_79 = number_format(+row.Vax_50_79);
                row.Vax_80 = number_format(+row.Vax_80);
                row.Unvax_18_49 = number_format(+row.Unvax_18_49);
                row.Unvax_50_79 = number_format(+row.Unvax_50_79);
                row.Unvax_80 = number_format(+row.Unvax_80);

                row.Age_adjusted_unvax_IR = number_format(+row.Age_adjusted_unvax_IR);
                row.Age_adjusted_vax_IR = number_format(+row.Age_adjusted_vax_IR);

                row.Week = formatDate(+row.Max_Week_Date)
                row.date = (row.Max_Week_Date);

                row.Max_Week_Date = parseDate(row.Max_Week_Date);
                row.Week_no = +row.Week_no;
                row.Week = formatDate(+row.Max_Week_Date)
                row.date = row.Max_Week_Date;
                row.month = +row.Index;
                return row;
            }).then(data => {
                chart = new LineChart({
                    data: data,
                    complexity: complexity,
                    source: showSource,
                    selector: selector
                });
                chart.initVis('chart', true)
                if (doTour) createTour(complexity, toursteps)
            })
        });
}

getLineChartData('simple', true, false)
//getLineChartData('moderate', true, true)
//getLineChartData('complex', true, false)