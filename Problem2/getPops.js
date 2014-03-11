var request = require('request');
var url="https://en.wikipedia.org/wiki/World_population_estimates";
 request(url, function (error, response, body) {
   if (!error && response.statusCode == 200) {
     console.log(body);
   }
 })
 
function formatYear(d){
  return d['year']+","+ d['col1']+","+ d['col2']+","+ d['col3']+","+ d['col4']+","+ d['col5'];
}
var jsdom = require("jsdom");
//gets 1.11
jsdom.env(
  url,
  ["http://code.jquery.com/jquery.js"],
  
  function (errors, window) {
    var $=window.$;
    var $tds = $('body table.wikitable tr td');
    var years=[];
    //console.log($('html').html());
    console.log("Length",$tds.length);
    //just want column 0-4
    var k=0;
    var thisyear=null;
    for (var i=0;i<12*90; i++){
     //if (i > 120) { 
      if (i % 12 === 0) {
        //console.log("State", $($tds[i]).text());
        years[k]={};
        thisyear = years[k];
        thisyear['year'] = $($tds[i]).text();
      }
       	else if (i % 12 === 1){
        thisyear['col1'] = $($tds[i]).text().replace(/,/g,'');
      } else if (i % 12 === 2){
        thisyear['col2'] = $($tds[i]).text().replace(/,/g,'');
      }
      	else if (i % 12 === 3){
        thisyear['col3'] = $($tds[i]).text().replace(/,/g,'');
      }
      	else if (i % 12 === 4){
        thisyear['col4'] = $($tds[i]).text().replace(/,/g,'');
        k = k+1;
      }
    }
	//}
    for (var j=0;j<years.length;j++){
         console.log(formatYear(years[j]));
    }
  }
);
