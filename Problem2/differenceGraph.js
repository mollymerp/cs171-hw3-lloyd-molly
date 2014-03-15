var bbDetail, bbOverview, dataSet, svg, brush, createVis, dataSet, handle, height, margin, svg, width;

var marginOv = {
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

var width = 960 - marginOv.left - marginOv.right;
var height = 800 - marginOv.bottom - marginOv.top;
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

	xScaleDetail = d3.scale.linear().range([0, width]).domain([0,2050]);
	xScaleOv = d3.scale.linear().range([0, width]).domain([0,2050]);
	yScaleOv = d3.scale.pow().exponent(.5).range([bbOverview.h, 0]);
	yScaleDetail = d3.scale.pow().exponent(.5).range([bbDetail.h, 0]);

	xAxisDetail = d3.svg.axis().scale(xScaleDetail).orient("bottom");
	xAxisOv = d3.svg.axis().scale(xScaleOv).orient("bottom");

	yAxisOv = d3.svg.axis().scale(yScaleOv).orient("left");
	yAxisDetail = d3.svg.axis().scale(yScaleDetail).orient("left");
	
var lineDetail, lineOv;

	lineDetail = d3.svg.line()
	.interpolate("linear")
    .x(function(d) { return xScaleDetail(d.year);})
    .y(function(d) { return yScaleDetail(d.avg);});
    
    lineOv = d3.svg.line()
    .x(function(d) { return xScaleOv(d.year); })
    .y(function(d) { return yScaleOv(d.avg);});
    
    brush = d3.svg.brush()
    .x(xScaleOv)
    .on("brush", brushed);
    
    
var dataSet = [];
var dataWide = [];

    
svg = d3.select("#DifVisUN").append("svg").attr({
    width: width + marginDetail.left + marginDetail.right,
    height: height + marginOv.top + marginOv.bottom})
    .append("g").attr({
        transform: "translate(" + marginOv.left + "," + marginOv.top + ")"
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
	 
	 dataWide = rows;

     var values = color.domain().map(function(name) {
	   return {
	       name: name,
	       values: rows.map(function(d) {
		  if (+d[name] == 0) {
		       return {year:d.year,population:null, id: name};}
		   else{ return {year: d.year, population: +d[name], id:name};}
	       })}});
	 
	
	     
     values.forEach(function(d,i) { 
	 dataSet.push(d);
     });
  
    return createVis();
});


// ----------------------------------------- End Data Call //

createVis = function(){

// ------------------------------------------  Begin Create Detail //
	dataSet.map(function(m){
		m.values = m.values.filter(function(a){return  a.population >0;});
    }); 
    
    /*dataWide.map(function(d){
    	d.values = d.filter(function(a){ return a.avg >0;});
    	});*/
    
var  points = [];

  dataSet.forEach(function(data, i) {
	data.values.forEach(function(d, j) {
		points.push(d);});});
    
console.log(dataWide);

xScaleDetail.domain([0,2050]);
yScaleDetail.domain([0,d3.max(dataWide.map(function(d,i) {return d.maxVal;}))]);

console.log(xScaleDetail(1996));	

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

var popEstFocus = focus.selectAll(".popEst")
                .data(dataSet)
                .enter().append("g")
                .attr("class", "popEst");
  console.log(dataSet);
/* popEstFocus.append("path")
      	 .attr("class", "line")
      	 .attr("d", function(d){return lineDetail(d.values);})
      	 .style("stroke", function(d) {return color("avg"); });*/


popEstFocus.selectAll("circle")
       		.data(dataWide)
       		.enter().append("svg:circle")
	        .attr("class","dots")
	       .attr("cx", function(d){ return xScaleDetail(d.year);})
	       .attr("cy",function(d){return yScaleDetail(d.avg);})
	       .attr("stroke",function(d) {return color("avg"); })
	       .attr("fill",function(d) {return color("avg"); })
	       .attr("r",2)
	       .attr("clip-path","url(#clip)");
	       
	
}; // closes createVis()


function brushed (){};