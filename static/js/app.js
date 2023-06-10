const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function inint(){

    // select dropdown 
    let dropDown = d3.select("#selDataset")

    //get names for dropdown menu
    d3.json(url).then((data) => {
        console.log(data);

        let names = data.names;

        //add names as an option to dropdown

        for (i = 0; i<names.length; i++){
            dropDown.append("option").text(names[i]).property("value",names[i])
        }
        displayMetaData(names[0])
        displayBarchrat(names[0])
        displayBubleChart(names[0])

    });

}
function optionChanged(numID){
    displayMetaData(numID)
    displayBarchrat(numID)
    displayBubleChart(numID)
}
// Display each key-value pair 
//from the metadata JSON object somewhere on the page

function displayMetaData(numID){
    let metadaTable = d3.select("#sample-metadata")

    d3.json(url).then((data) => {

        let metadata = data.metadata;
        //console.log("metadata",metadata)
        // get data of the selected numId
        function returnNumID(num){
            return num.id == numID
        }
        selectedId = metadata.filter(returnNumID)[0]
        
        metadaTable.html("") //clear before

        // get key value, add to a heder to display
        Object.entries(selectedId).forEach(entry => {
        const [key, value] = entry;
        console.log(key, value);
        metadaTable.append("h5").text(`${key}: ${value}`)
});

      
    })
} 



function displayBarchrat(numID){
    
    d3.json(url).then((data) => {

        let samplesData = data.samples;

        // get data of the selected numId
        function returnNumID(num){
            return num.id == numID
        }
        selectedId = samplesData.filter(returnNumID)[0]
        console.log(selectedId)
        
        let otu_ids = selectedId.otu_ids
        let sample_values = selectedId.sample_values
        let otu_labels = selectedId.otu_labels

        let barData = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(x => `otu ${x}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            orientation: 'h',
            type: 'bar'
          }];
          
          
          let layout = {
            title: 'Colored Bar Chart',
          };
          
          Plotly.newPlot('bar', barData, layout);



      
    })
}

function displayBubleChart(numID){
    d3.json(url).then((data) => {

        let samplesData = data.samples;

        // get data of the selected numId
        function returnNumID(num){
            return num.id == numID
        }
        selectedId = samplesData.filter(returnNumID)[0]
        console.log(selectedId)
        let otu_ids = selectedId.otu_ids
        let sample_values = selectedId.sample_values
        let otu_labels = selectedId.otu_labels

        let bubleData = [{
            x: otu_ids,
            y: sample_values,
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Portland'
            },
            text: otu_labels,
            mode: "markers"

        }];

        let layout = {
            xaxis: {title: "OTU_ID"} 
        };

        Plotly.newPlot("bubble",bubleData, layout)
    })
}


inint()
