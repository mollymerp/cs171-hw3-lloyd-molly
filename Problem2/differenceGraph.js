var bbDetail, bbOverview, dataSet, svg, brush, createVis, dataSet, handle, height, margin, svg, width;

var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

var marginDetail= {
	top:100,
	right:50,
	bottom:20,
	left: 50
};

var width = 960 - margin.left - margin.right;
var height = 800 - margin.bottom - margin.top;
var heightDetail = 800 - marginDetail.bottom - marginDetail.top;
var color = d3.scale.category10();

bbOverview = {
    x: 0,
    y: 10,
    w: width,
    h: 50
};

bbDetail = {
    x: 0,
    y: 100,
    w: width,
    h: 300
};

var xScaleDetail, xScaleOv,  yScaleDetail, yScaleOv, xAxisDetail, xAxisOv, yAxisDetail, yAxisOv;

	xScale = d3.time.scale().range([0, width]);
	xScaleOv = d3.time.scale().range([0, width]);
	yScaleOv = d3.scale.pow().exponent(.5).range([bbOverview.h, 0]);
	yScaleDetail = d3.scale.pow().exponent(.5).range([bbDetail.h, 0]);

	xAxis = d3.svg.axis().scale(xScale).orient("bottom");
	xAxisOv = d3.svg.axis().scale(xScaleOv).orient("bottom");

	yAxisOv = d3.svg.axis().scale(yScaleOv).orient("left");
	yAxisDetail = d3.svg.axis().scale(yScaleDetail).orient("left");
	
var lineDetail, lineOv;

	lineDetail = d3.svg.line()
    .x(function(d) { return xScaleOv(d.year); })
    .y(function(d) { return yScaleOv(d.avg);});
    
    lineOv = d3.svg.line()
    .x(function(d) { return xScaleDetail(d.year); })
    .y(function(d) { return yScaleDetail(d.avg);});
    
    brush = d3.svg.brush()
    .x(xScaleOv)
    .on("brush", brushed);
    
    
var dataSet = [];
var dataWide = [];

    
svg = d3.select("#DifVisUN").append("svg").attr({
    width: width + margin.left + margin.right,
    height: height + margin.top + margin.bottom})
    .append("g").attr({
        transform: "translate(" + margin.left + "," + margin.top + ")"
    });

context = svg.append("g") // context == bbOverview == area2
    .attr("class","context")
    .attr("height", bbOverview.h);
   
focus = svg.append("g")  // focus == bbDetail == area
    .attr("class", "focus")
    .attr("height", bbDetail.h)
    .attr("transform","translate(0,100)");

// ------------------------------------------- Begin Data Call //

d3.csv("consensus.csv", function(data) {

    return {
                year:+data.year,
                /*usCensus: +data.USCensus,
                popRefBur: +data.PopulationBureau,
                un: +data.UN,
                hyde: +data.HYDE,
                maddison: +data.Maddison,*/
                avg: +data.avg,
                minVal: +data.min,
                maxVal: +data.max};
},

 function(rows) {
	   color.domain(d3.keys(rows[0]).filter(function(key) { return key !== 				"year"; }));
	  
	 var rowsClean = rows; 
	 
	 console.log(rows);
	
	 dataWide.push(rowsClean);

     var values = color.domain().map(function(name) {
	   return {
	       name: name,
	       values: rowsClean.map(function(d) {
		  if (+d[name] == 0) {
		       return {year:d.year,population:null, id: name};}
		   else{ return {year: d.year, population: +d[name], id:name};}
	       })}});
	 
	
	     
     values.forEach(function(d,i) { 
	 dataSet.push(d);
     });

     console.log(dataSet);
     
    return createVis();
});
/*

// ----------------------------------------- End Data Call //

createVis = function(){

// ------------------------------------------  Begin Create Detail //

	xScaleDetail.domain(d3.extent(dataWide.map(function(d) { return d.year; })));	    	yScaleDetail.domain([0,d3.max(dataWide.map(function(d) { return d.avg;}))]);
	

   focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + bbDetail.h + ")")
      .call(xAxisDetail);

   focus.append("g")
      .attr("class", "y axis")
      .call(yAxisDetail)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Population");

  var popEst = svg.svg.selectAll(".popEst")
                .data(allValues)
                .enter().append("g")
                .attr("class", "popEst");
  
  	focus.append("path")
      	 .datum(dataSet)
      	 .attr("class", "line")
      	 .attr("d", lineDetail);
	
	
	
}; // closes createVis()
*/

function brushed (){};