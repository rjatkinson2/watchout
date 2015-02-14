// start slingin' some d3 here.
var Piece = function(xAxis, yAxis, size){
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
    enemies.push(new Piece(xAxis,yAxis,size));
  }
  return enemies;
};

var enemies = createEnemies(50,10,700,700);

// Board layout
// Enemy layout
d3.select("svg").selectAll("circle").data(enemies).enter()
  .append("circle").attr("class","enemies").attr("cx",function(d){return d.xAxis;})
  .attr("cy",function(d){return d.yAxis;})
  .attr("r",function(d){return d.size;})
  .attr("fill","#4D997C");


var dragmove = function() {
  d3.select(this).attr("cx", d3.event.x).attr("cy", d3.event.y);
  this.xAxis = d3.event.x;
  this.yAxis = d3.event.y;
};

var drag = d3.behavior.drag()
    .on("drag", dragmove);

// Player layout
var player = new Piece(350,350,10);
var playerData = [player];
var playerPiece = d3.select("svg").selectAll("circle.player").data(playerData).enter().append("circle").attr("class","player").attr("cx",function(d){return d.xAxis;})
  .attr("cy",function(d){return d.yAxis;})
  .attr("r",function(d){return d.size;})
  .attr("fill","orange");

  playerPiece.on("click", function() {
    if (d3.event.defaultPrevented) return; // click suppressed
    console.log("clicked!");
  });
  playerPiece.call(drag);

// Enemy update
var update = function(data) {
  d3.selectAll("circle.enemies").data(data).transition().duration(1000).attr("cx",function(d){return d.xAxis;})
    .attr("cy",function(d){return d.yAxis;})
    .attr("r",function(d){return d.size;});
};

// Trigger enemy update
setInterval(function() {
  enemies = createEnemies(50,10,700,700);
  return update(enemies);
}, 1000);

var collision = function(player, enemy){
  var distance = Math.sqrt(Math.pow((enemy.xAxis - player.xAxis),2) + Math.pow((enemy.yAxis - player.yAxis),2));
  var counter = 0;
  if(distance < player.size + enemy.size){
    counter++;
  }
  return counter;
};

var detectCollisions = function(enemies){
  var collisions = 0;
  for(var i = 0; i < enemies.length; i++){
    collisions += collision(player, enemies[i]);
  }
  return collisions;
};

setInterval(function(){
  var enemies = d3.selectAll("circle.enemies").data();
  console.log(detectCollisions(enemies));
},1);

