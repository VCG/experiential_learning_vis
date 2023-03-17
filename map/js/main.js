// let parseDate = d3.timeParse("%Y-%m-%d");
// let number_format = d3.format(",")

// load data using promises
let promises = [
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"), // not projected -> you need to do it
    d3.csv("data/cumulative_cases_simple_map.csv", (row, _) => {
        row.Tot_Cases = +row.Tot_Cases;
        row.Tot_Cases2 = number_format(+row.Tot_Cases);
        return row;
    }),
    d3.csv("data/data_fin.csv").then(function (data) {
        data.forEach(d => {
            d.date = parseDate(d.SubmissionDate);
            d.value = +d.NewCasesAdj;
            d.value2 = +d.SevenDayAvgAdj;
        });
        return [_.chain(data).groupBy("State").map((v, k) => ({code: k, name: v[0].State2})).value(), data];
    })
];

function getMapChartData(props) {
    return Promise.all(promises)
        .then(function (data) {
            // TODO: Adapt tourstep to map
            return d3.json(`https://vcg.github.io/trust_in_science/line_chart/data/${props.showCovidData ? "covid" : "non_covid"}_toursteps.json`)
                .then(toursteps => {
                    let chart = new MapChart({ // ADAPT to Props
                        data: data,
                        complexity: props.complexity,
                        isInteractive: props.allowInteraction,
                        source: props.showSource
                    });
                    chart.initVis('chart');
                    if (props.doTour) createTour(props.complexity, toursteps, chart.provData)
                });
        })
        .catch(function (err) {
            console.log(err)
        });
}
//
// let props = {
//     complexity: 'moderate',
//     doTour: false,
//     showSource: true,
//     changes: true,
//     showCovidData: false,
//     allowInteraction: true
// };
// getMapChartData(props);

