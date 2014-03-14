var bbDetail, bbOverview, dataSet, svg;

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
var xScaleOv = d3.time.scale().range([0, width]);
var yOv = d3.scale.linear().range([bbOverview.h, 0]);
var yDetail = d3.scale.linear().range([bbDetail.h, 0]);

var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
var xAxisOv = d3.svg.axis().scale(xScaleOv).orient("bottom");

var yAxisOv = d3.svg.axis().scale(yOv).orient("left");
var yAxisDetail = d3.svg.axis().scale(yDetail).orient("left");

var area = d3.svg.area()
    .x(function(d){return xScale(d.date);})
    .y0(bbDetail.h)
    .y1(function(d){return yDetail(d.tweets);});


var line = d3.svg.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yOv(d.tweets); });

var brush = d3.svg.brush()
    .x(xScaleOv)
    .on("brush", brushed);


svg = d3.select("#visUN").append("svg").attr({
    width: width + margin.left + margin.right,
    height: height + margin.top + margin.bottom})
    .append("g").attr({
        transform: "translate(" + margin.left + "," + margin.top + ")"
    });

svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

context = svg.append("g") // context == bbOverview == area2
    .attr("class","context")
    .attr("height", bbOverview.h);
   
focus = svg.append("g")  // focus == bbDetail == area
    .attr("class", "focus")
    .attr("height", bbDetail.h)
    .attr("transform","translate(0,100)");
    

/*
var focus = svg.append("g") 
    .attr("class", "focus")
    .attr("transform", "translate(" + marginDetail.left + "," + marginDetail.top + ")");

var context = svg.append("g") 
    .attr("class", "context")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
*/


// ==============================  Begin Data Call ==========================//

d3.csv("unHealth.csv", function(error, data) {
  data.forEach(function(d) {
    d.date = dateFormat(d.AnalysisDate);
    d.tweets = +d.WomensHealth; 
    rowsIn.push(d);
     
    }); 
   
    dataSet.push(data);
    return createVis();
       /*createDetail();*/
    });
 
 // ==============================   End Data Call ===================================== //
 

 
//=================================  Begin CreateDetail =====================
createVis = function(){

 
 
     //console.log(d3.extent(rowsIn, function(d) {  return d.date; }));
    // console.log(dataSet);/// long  array [1 * 53] == data in reference file
    // console.log(rowsIn);/// wide  array [53 * 1] == data in reference file
     
	  xScale.domain(d3.extent(rowsIn.map(function(d) { return d.date; })));	    	yDetail.domain([0,d3.max(rowsIn.map(function(d) { return d.tweets;  }))]);
	  
focus.append("path")
      	 .datum(rowsIn)
      	 .attr("class", "area")
      	 .attr("d", area);

focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + bbDetail.h + ")")
      .call(xAxis);

focus.append("g")
      .attr("class", "y axis")
      .call(yAxisDetail)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Tweets");
      
focus.selectAll("circle")
         .data(rowsIn)
	       .enter().append("svg:circle")
	        .attr("class","dots")
	       .attr("cx", function(d){return xScale(d.date);})
	       .attr("cy",function(d){return yDetail(d.tweets);})
         .attr("stroke","black")
         .attr("fill","black")
         .attr("r",1)
         .attr("clip-path","url(#clip)");


	 
// ====================  closes createDetail =====================

 //=================================   Begin Create OverView   =============================//
 
 

 
 
     //console.log(d3.extent(rowsIn, function(d) {  return d.date; }));
     //  console.log(dataSet);/// long  array [1 * 53] == data in reference file
     //console.log(rowsIn);/// wide  array [53 * 1] == data in reference file
     
	  xScaleOv.domain(xScale.domain());
	  yOv.domain(yDetail.domain());


	  
context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + bbOverview.h + ")")
      .call(xAxisOv);

context.append("g")
      .attr("class", "y axis")
      .call(yAxisOv)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Tweets");

context.append("path")
      	 .datum(rowsIn)
      	 .attr("class", "line")
      	 .attr("d", line);

context.selectAll("circle")
         .data(rowsIn)
	     .enter().append("svg:circle")
	     .attr("cx", function(d){return xScaleOv(d.date);})
	     .attr("cy",function(d){return yOv(d.tweets);})
         .attr("stroke","black")
         .attr("fill","black")
         .attr("r",1);

	 
 context.append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("y", -6)
      .attr("height", bbOverview.h + 7);	 

 };  /// ============================      closes CreateOv     =========================

function brushed() {
  xScale.domain(brush.empty() ? xScaleOv.domain() : brush.extent());
  focus.select(".area").attr("d", area);
  focus.select(".x.axis").call(xAxis);
  focus.selectAll(".dots").attr("cx", function(d){return xScale(d.date);})
	       .attr("cy",function(d){return yDetail(d.tweets);});

};
