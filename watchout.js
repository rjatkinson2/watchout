// start slingin' some d3 here.
var Enemy = function(xAxis, yAxis, size){
  this.xAxis = xAxis;
  this.yAxis = yAxis;
  this.size = size;
};

var createEnemies = function(numEnemies, size, xBoardSize, yBoardSize){
  var xAxis;
  var yAxis;

  var enemies = [];
  for(var i = 0; i < numEnemies; i++){
    xAxis = Math.floor(Math.random()*(xBoardSize-size*2))+size;
    yAxis = Math.floor(Math.random()*(yBoardSize-size*2))+size;
    enemies.push(new Enemy(xAxis,yAxis,size));
  }
  return enemies;
};

var enemies = createEnemies(50,10,700,700);

// Board layout
d3.select("svg").selectAll("circle").data(enemies).enter()
  .append("circle").attr("cx",function(d){return d.xAxis;})
  .attr("cy",function(d){return d.yAxis;})
  .attr("r",function(d){return d.size;})
  .attr("fill","#4D997C");

var update = function(data) {
  d3.selectAll("circle").data(data).transition().duration(1000).attr("cx",function(d){return d.xAxis;})
    .attr("cy",function(d){return d.yAxis;})
    .attr("r",function(d){return d.size;});
};

setInterval(function() {
  enemies = createEnemies(50,10,700,700);
  return update(enemies);
}, 1000);
