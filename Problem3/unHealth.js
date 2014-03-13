var bbDetail, bbOverview, dataSet, svg;

var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

var width = 960 - margin.left - margin.right;

var height = 800 - margin.bottom - margin.top;

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

dataSet = [];
var rowsIn = [];

var dateFormat = d3.time.format("%m/%d/%Y").parse;

var xScale = d3.time.scale().range([0, width]);
var yOv = d3.scale.linear().range([bbOverview.h, 0]);
var yDetail = d3.scale.linear().range([bbDetail.h, 0]);

var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
var yAxisOv = d3.svg.axis().scale(yOv).orient("left");

var line = d3.svg.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yOv(d.tweets); });



svg = d3.select("#visUN").append("svg").attr({
    width: width + margin.left + margin.right,
    height: height + margin.top + margin.bottom})
    .append("g").attr({
        transform: "translate(" + margin.left + "," + margin.top + ")"
    });



d3.csv("unHealth.csv", function(error, data) {
  data.forEach(function(d) {
    d.date = dateFormat(d.AnalysisDate);
    d.tweets = +d.WomensHealth;
    rowsIn.push(d);
     
  }); 
  
 //console.log(data); /// wide array [1x53]
   
    dataSet.push(data);
    return {
	createOv();
        createDetail();
}});
 
 
 
 //=================================   Begin Create OverView   =============================
 
 
 createOv = function(){

 
 
     //console.log(d3.extent(rowsIn, function(d) {  return d.date; }));
    // console.log(dataSet);/// long  array [1 * 53] == data in reference file
    // console.log(rowsIn);/// wide  array [53 * 1] == data in reference file
     
	  xScale.domain(d3.extent(rowsIn, function(d) {  return d.date; }));
	  yOv.domain(d3.extent(rowsIn, function(d) { return d.tweets;  }));
	  
     svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + bbOverview.h + ")")
      .call(xAxis);

     svg.append("g")
      .attr("class", "y axis")
      .call(yAxisOv)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Tweets");

svg.append("path")
      	 .datum(rowsIn)
	 .attr("class", "line")
	 .attr("d", line);

svg.selectAll("circle")
         .data(rowsIn)
	       .enter().append("svg:circle")
	       .attr("cx", function(d){return xScale(d.date);})
	       .attr("cy",function(d){return yOv(d.tweets);})
         .attr("stroke","black")
         .attr("fill","black")
         .attr("r",1);

	 
 };  /// ============================      closes CreateOv     =========================
