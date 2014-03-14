var bbVis, brush, createVis, dataSet, handle, height, margin, svg, svg2, width;

    margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 100
    };

    width = 960 - margin.left - margin.right;

    height = 500 - margin.bottom - margin.top;

    bbVis = {
        x: 0 + 100,
        y: 10,
        w: width - 100,
        h: 400
    };

var xAxis, x, yAxis, y;
         x = d3.scale.linear().range([0, bbVis.w]);
          // define the right domain generically
y = d3.scale.pow().exponent(.5).range([bbVis.h,0]);

xAxis =d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.format("d"));
yAxis = d3.svg.axis().scale(y).orient("left");

//from mbostock: dat == data, dataSet = estimates



var dat = [];
var dataSet = [];
var allValues = [];
var allYears = [];
var allDataYears=[];
var color = d3.scale.category10();


 svg = d3.select("#vis").append("svg").attr({
          width: width + margin.left + margin.right,
          height: height + margin.top + margin.bottom})
        .append("g")
        .attr({
            transform: "translate(" + margin.left + "," + margin.top + ")"
});


 d3.csv("worldPop.csv", function(data) {

    return {
                year:+data.year,
                usCensus: +data.USCensus,
                popRefBur: +data.PopulationBureau,
                un: +data.UN,
                hyde: +data.HYDE,
                maddison: +data.Maddison};
},

 function(rows) {
	   color.domain(d3.keys(rows[0]).filter(function(key) { return key !== "year"; }));

     var rowsClean = rows;
     //console.log(rowsClean);
           dat.push(rowsClean);
     
     rowsClean.forEach(function(d, i) {
	 allYears.push(d.year);
     });

     var values = color.domain().map(function(name) {
	   return {
	       name: name,
	       values: rowsClean.map(function(d) {
		   if (+d[name] == 0) {
		       return {year:d.year,population:null};}
		   else{
		   return {year: d.year, population: +d[name]};}
	       })}});
     values.forEach(function(d,i) { 
	 allValues.push(d);
     });

       var estimates = color.domain().map(function(name) {
	   return {
	       name: name,
	       values: rowsClean.map(function(d) {
		   return {year: d.year, population: +d[name]};}
				    )}});
     //console.log(estimates);

     estimates.forEach( function(d,i) {
	 dataSet.push(d);
     });

    return createVis();
});



createVis = function(){


    console.log(allValues);

    dataSet.map(function(m){
	m.values = m.values.filter(function(a){return  a.population >0;});
    }); 

    var popExtent = [];
    var yearExtent = [];
    var interpScales = [];
    var minYears = [];
    var maxYears = [];
    var interpVal = [];

    dataSet.forEach(function(d,i){
	    popExtent[i] = (d.values.map(function(a) {return a.population;}));
	    yearExtent[i] = (d.values.map(function(a) {return a.year;}));
	
    });
    console.log(popExtent[0]);
    
	console.log(yearExtent[0]);
 
    dataSet.forEach(function(d,i) {
	//console.log(yearExtent);
	minYears[i] = d3.min(yearExtent[i]);
	maxYears[i] = d3.max(yearExtent[i]);
    }); 

    interpScales[0] = d3.scale.pow().exponent(.5).range(popExtent[0]).domain(yearExtent[0]);
interpScales[1] = d3.scale.pow().exponent(.5).range(popExtent[1]).domain(yearExtent[1]);
interpScales[2] = d3.scale.pow().exponent(.5).range(popExtent[2]).domain(yearExtent[2]);
interpScales[3] = d3.scale.pow().exponent(.5).range(popExtent[3]).domain(yearExtent[3]);
interpScales[4] = d3.scale.pow().exponent(.5).range(popExtent[4]).domain(yearExtent[4]);
		
 
    
   allValues.forEach(function(data, i) {
	data.values.forEach(function(d, j) {
	    if ((d.population == null) &&  (d.year > minYears[i]) && (d.year < maxYears[i])){
		return data.values[j].population = interpScales[i](d.year);
		}
	})
    });




    console.log(interpScales[0](2045));
   
 
    

    var line = d3.svg.line()
        .interpolate("linear")
        .x(function(d) { return x(d.year); })
        .y(function(d) { return  y(d.population); });

    //console.log(dat.year);
    x.domain([0,2050]);

    //console.log(allValues);

    y.domain([
	d3.min(allValues, function(c) {
	    return d3.min(c.values,function(v){
		return v.population; }); }),
	d3.max(allValues, function(c) {return d3.max(c.values,function(v){
	    return v.population; }); })
    ]);
    
svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + bbVis.h + ")")
                .call(xAxis)
                .append("text")
                .attr("x", 350)
                .attr("dy","3em")
                .style("text-anchor","end")
                .text("Year");

svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Population");
                
var popEst = svg.selectAll(".popEst")
                .data(allValues)
                .enter().append("g")
                .attr("class", "popEst");
      
    popEst.append("path")
                .attr("class", "line")
                .attr("d", function(d) {
		    return line(d.values); })
                .style("stroke", function(d) {return color(d.name); });
     

  /*   popEst.append("text")
                .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.population) + ")"; })
                .attr("x", 3)
                .attr("dy", ".1em")
                .text(function(d) { return d.name; });
                */
                


};
