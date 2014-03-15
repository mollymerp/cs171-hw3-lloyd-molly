1. Look at the data given in the Wiki table. Describe the data types. What is different from the datasets you've used before?


The Data includes various estimates of world population across time. This data differs from other data sets in that most of the figures are estimates and/or projections, so there is an additional variable of uncertainty embedded within the data. 

2. Take a look at the DOM tree for the Wikipedia table. Formulate in jQuery selector syntax the selection that would give you the DOM element for the second row in the Wikipedia table. Write down in selection syntax how you would get all table rows that are not the header row.

 var content = root.find("#content"); // find all the nodes that have ID "content"
 var h2s = content.find("table.wikitable tbody tr td"); // search for all table cell values
 
 $("h2s:first")
 
 
 $("table.wikitable tbody tr td")