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

//from mbostock: dat == data, dataSet = cities


var allYears =[];
var dat = [];
var dataSet = [];
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

       function(rows)  {         
	   color.domain(d3.keys(rows[0]).filter(function(key) { return key !== "year"; }));

      var rowsClean = rows || 0;
           dat.push(rowsClean);

       var cities = color.domain().map(function(name) {
	   return {
	       name: name,
	       values: rowsClean.map(function(d) {
		   return {year: d.year, population: +d[name]};
	       })
	   };
       });

	cities.forEach( function(d,i) {
	    dataSet.push(d);
	    allYears.push(d);});

   // console.log(dataSet);

    return createVis();
});



createVis = function(){


    dataSet.map(function(m){
		m.values = m.values.filter(function(a){return a.population >0;});
    });
    
    /*
allYears.map(function(m){
	    m.values = m.values.
    });
*/

   // console.log(dataSet);

    var line = d3.svg.line()
        //.interpolate("linear")
        .x(function(d) {  return x(d.year); })
        .y(function(d) { return y(d.population); });

    //console.log(dat.year);
    x.domain([0,2050]);

    console.log(dataSet);

    y.domain([
	d3.min(dataSet, function(c) {
	    return d3.min(c.values,function(v){
			return v.population; }); }),
	d3.max(dataSet, function(c) {return d3.max(c.values,function(v){
	    return v.population; }); })
    ]);
    
    interp_scale = d3.scale.linear().domain(
    					[d3.min(dataSet, function(c) {
							   return d3.min(c.values,function(v){
								   return v.population; }); }),
						d3.max(dataSet, function(c) {
							return d3.max(c.values,function(v){
								return v.population; }); })])
				 .range([bbVis.h,0])
    
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
                .data(dataSet)
                .enter().append("g")
                .attr("class", "popEst");
      
    popEst.append("path")
                .attr("class", "line")
                .attr("d", function(d) { 
                		console.log(d.values);
						return line(d.values); })
                .style("stroke", function(d) {return color(d.name); });
     
     
     
     popEst.append("text")
                .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                .attr("transform", function(d) {  return "translate(" + x(d.value.year) + "," + y(d.value.population) + ")"; })
                .attr("x", 3)
                .attr("dy", ".1em")
                .text(function(d) { return d.name; });
                
                


};


