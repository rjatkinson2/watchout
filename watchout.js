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
var enemyDisplay = d3.select("svg").selectAll("circle").data(enemies).enter()
  .append("circle").attr("class","enemies").attr("cx",function(d){return d.xAxis;})
  .attr("cy",function(d){return d.yAxis;})
  .attr("r",function(d){return d.size;})
  .attr("fill","#4D997C");


var dragmove = function() {
  if (d3.event.x < 680 && d3.event.y < 680 && d3.event.x > 20 && d3.event.y > 20) {
    d3.select(this).attr("cx", d3.event.x).attr("cy", d3.event.y);
  }
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
var update = function() {
  d3.selectAll("circle.enemies").transition().duration(2000)
    .attr("cx",function(){return Math.floor(Math.random()*(700-20))+20;})
    .attr("cy",function(){return Math.floor(Math.random()*(700-20))+20;});
};

// Boss Mode
// d3.selectAll("circle.enemies").transition().duration(1000)
//   .attr("cx", Math.floor(Math.random()*(700-90))+90)
//   .attr("cy", Math.floor(Math.random()*(700-90))+90).attr("r","90");

// Trigger enemy update
setInterval(function() {
  return update();
}, 2000);

var collision = function(player, enemy){
  var distance = Math.sqrt(
    Math.pow(Number(enemy.attributes.cx.value) - Number(player.attributes.cx.value),2)
      + Math.pow(Number(enemy.attributes.cy.value) - Number(player.attributes.cy.value),2)
        );
  var counter = 0;
  if(distance < Number(player.attributes.r.value) + Number(enemy.attributes.r.value)){
    counter++;
  }
  return counter;
};



var detectCollisions = function(enemies){
  var collisions = 0;
  for(var i = 0; i < enemies.length; i++){
    collisions += collision(playerPiece[0][0], enemies[i]);
  }
  return collisions;
};

var totalCollisions = 0;

var startTime = +new Date();
var currentScore = 0;
var highScore = 0;

setInterval(function(){
  var enemies = d3.selectAll("circle.enemies");
  if(detectCollisions(enemies[0])){
    if(currentScore > highScore){
      highScore = currentScore;
      d3.select(".high").text("High score: "+ highScore);
    }
    d3.select(".current").text("Current score: 0");
    startTime = +new Date();
  }
  console.log(detectCollisions(enemies[0]));
},1);

setInterval(function() {
  var currentTime = +new Date();
  currentScore = Math.floor((currentTime - startTime)/100);
  d3.select(".current").text("Current score: " + currentScore);
},100);

