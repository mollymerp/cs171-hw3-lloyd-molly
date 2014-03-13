 var convertToInt;
  var formatYears = function(data){
		return data['year'] + "," + data['col1'] + "," + data['col2'] +"," + data['col3'] + "," + data['col4'] + "," + data['col5'];}		
    $.ajax({
        url: "http://en.wikipedia.org/wiki/World_population_estimates",
        type: 'GET',
        cache: false,
        success: function(data) {
            var root,allData, body, table;
            root = $("<div></div>")
            root.html(data.responseText)

            var content = root.find("#content"); // find all the nodes that have ID "content"
            var h2s = content.find("table.wikitable tbody tr td"); // search for all table cell values
	    //console.log(h2s);


	    var years=[]; //create array of lines
	    var k = 0;
	    var thisYear = null;

           $.each(h2s, function(index, value) {
             // console.log($(value).text()); // print text
	     	 
	       
	       if ( index % 12 ===  0) {
		       years[k] = {};
		       thisYear = years[k];
		       thisYear['year'] = $(value).text().trim();
	               thisYear['year'] = convertToInt(thisYear['year']);}
	          else { for (i = 1; i < 6; i++) {
		      if ( index % 12 === i){ 
			  thisYear["col" + i] = $(value).text().trim();
			  thisYear["col" + i] = convertToInt(thisYear["col" + i]) ||"";
		      }}
		       k = k+1;}
	    
	        })
	     
	    
	      
	      years = $.grep(years,function(n){ return(n) });
	      years = years.filter( function(d) {
	          return !isNaN(d['year']);}); 
	      console.log(years)
	    

	    var yearsStr=[];

		for (var j=0;j<years.length;j++){
		  yearsStr.push(formatYears(years[j]));}

	    yearsStr.unshift("year,USCensus,PopulationBureau,UN,HYDE,Maddison");
		   
	  //  console.log(yearsStr);
	    
		saveToFile(yearsStr,"worldPop.csv")

        },	   
	   
        error: function() {
            return console.log("error");
        }
	 
	});
   
convertToInt = function(s) {
		return parseInt(s.replace(/,/g, ""), 10);
	    };

    /* takes an array of strings
       and writes them line by line into a file given by filename
     */
    var saveToFile = function(arrayOfLines, fileName) {
       /* adds linebreaks at the end*/
       var blob, blobText;
       blobText = arrayOfLines.map(function(d) {
         if (d.endsWith("\n")) {
           return d;
         } else {
           return d + "\n";
         }
       });
       blob = new Blob(blobText, {
         type: "text/plain;charset=utf-8"
       });
       return saveAs(blob, fileName);
     };

     String.prototype.endsWith = function(suffix) {
       return this.indexOf(suffix, this.length - suffix.length) !== -1;
     };
	


