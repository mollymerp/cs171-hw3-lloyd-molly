/**
 * Created by hen on 2/20/14.
 */
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

    dataSet = [];

    svg = d3.select("#vis").append("svg").attr({
        width: width + margin.left + margin.right,
        height: height + margin.top + margin.bottom
    }).append("g").attr({
            transform: "translate(" + margin.left + "," + margin.top + ")"
        });


   d3.csv("worldPop.csv", function(d) {
            return {
                year:+d.year,
                usCensus: +d.USCensus,
                popRefBur: +d.PopulationBureau,
                un: +d.UN,
                hyde: +d.HYDE,
                maddison: +d.Maddison};
				},
			function(error,rows){
				rowsClean = rows || ""
				dataSet.push(rowsClean);
				//console.log(dataSet);
				return createVis();
				
			});
			
		

    createVis = function() {
    	//console.log(dataSet);
    	
    	dataSet.forEach(function(data) {
	    	console.log(data[0]);
	    	data.forEach(function(d,i){
		    	console.log(d.year);
	    	})
    	})
         var xAxis, xScale, yAxis,  yScale;
         xScale = d3.scale.linear().domain([0,100]).range([0, bbVis.w]);  // define the right domain generically

		  // example that translates to the bottom left of our vis space:
		  var visFrame = svg.append("g").attr({
		      "transform": "translate(" + bbVis.x + "," + (bbVis.y + bbVis.h) + ")",
		  	  //....
			  
		  });
		  
		  visFrame.append("rect");
		  //....
		  
//        yScale = .. // define the right y domain and range -- use bbVis

//        xAxis = ..
//        yAxis = ..
//        // add y axis to svg !


    };
