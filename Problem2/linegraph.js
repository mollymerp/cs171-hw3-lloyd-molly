   

var bbVis, brush, createVis, dataSet, handle, height, margin, svg, svg2, width;

    margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    width = 960 - margin.left - margin.right;

    height = 300 - margin.bottom - margin.top;

    bbVis = {
        x: 0 + 100,
        y: 10,
        w: width - 100,
        h: 100
    };

var usCensusData = [{}];
var popRefBur = [];
var un = [];
var hyde = [];
var maddison = [];

var dataSet = [];
var color = d3.scale.category10();



    svg = d3.select("#vis").append("svg").attr({
        width: width + margin.left + margin.right,
        height: height + margin.top + margin.bottom
    }).append("g").attr({
            transform: "translate(" + margin.left + "," + margin.top + ")"
        });


   d3.csv("worldPop.csv", function(d) {
       //color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));
            return {
                year:+d.year,
                usCensus: +d.USCensus,
                popRefBur: +d.PopulationBureau,
                un: +d.UN,
                hyde: +d.HYDE,
                maddison: +d.Maddison};
    },
	  function(error,rows){
	      console.log(rows[0]);
	      rowsClean = rows || ""
	      dataSet.push(rowsClean);
	      console.log(usCensusData);
	      return createVis();

});


createVis = function() {

   // console.log(dataSet[0]);

    function isPos(element){
	return element > 0; }   
 
  

    dataSet.forEach(function(data) {
	 data.forEach(function(d,i){
	    if (d.usCensus > 0) {
	        usCensusData.push([{ "year":d.year,"population": d.usCensus} ]); };
	     if (d.popRefBur > 0) {
	         popRefBur.push([{ "year": d.year, "population": d.popRefBur}]);} 
	     
})
     })
    console.log(popRefBur);

         var xAxis, xScale, yAxis, yScale;
         xScale = d3.scale.linear().domain([0,100]).range([0, bbVis.w]); // define the right domain generically

// example that translates to the bottom left of our vis space:
var visFrame = svg.append("g").attr({
"transform": "translate(" + bbVis.x + "," + (bbVis.y + bbVis.h) + ")",
//....

});

visFrame.append("rect");
//....

// yScale = .. // define the right y domain and range -- use bbVis

// xAxis = ..
// yAxis = ..
// // add y axis to svg !


    };
