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
rowsIN = [];

var dateFormat = d3.time.format("%x").parse;

var xScale = d3.time.scale().range([0, width]);
var yOv = d3.scale.linear().range([bbOverview.h, 0]);
var yDetail = d3.scale.linear().range([bbDetail.h, 0]);

var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
var yAxisOv = d3.svg.axis().scale(yOv).orient("left");

var lineOv = d3.svg.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yOv(d.tweets); });



svg = d3.select("#visUN").append("svg").attr({
    width: width + margin.left + margin.right,
    height: height + margin.top + margin.bottom})
    .append("g").attr({
        transform: "translate(" + margin.left + "," + margin.top + ")"
    });

function sortAscending (a,b) {
	return a-b;
}

d3.csv("unData.csv", function(error, data) {
  data.forEach(function(d) {
    d.date = dateFormat(d.AnalysisDate);
    d.tweets = +d.WomensHealth;
  },
  
   function(rows){ rowsIn.push(rows);;
  
 // console.log(data); /// wide array [1x53]
 
  dataSet = data;
  return createOv ();
 })});
 
 
 //=================================   Begin Create OverView   =============================
 
 
 createOv = function(){
 	
 	dataSet.sort(sortAscending ());
 
 	 //console.log(dataSet); /// long array [53 * 1] == data in reference file
 	 
	  xScale.domain(d3.extent(dataSet, function(d) {  return d.date; }));
	  yOv.domain(d3.extent(dataSet, function(d) { return d.tweets;  }));
	  
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
      .text("Women's Health Tweets");

	  svg.append("path")
      	.datum(rows)
	  	.attr("class", "line")
	  	.attr("d", function(d) { 
	  					console.log(d.tweets);
						return lineOv(d.tweets); });

	  
 };  /// ============================      closes CreateOv     =========================
 
   