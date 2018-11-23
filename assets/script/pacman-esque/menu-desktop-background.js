/*
 * Group:........ That Helvetica Group
 * Members:...... Scott McKay, Kendyl Freeny, William Cook
 * Institution:.. University of Montana
 * Class:........ Advanced Web-design & Programming
 * Date:......... Friday, October 12th, 2018
 *
 * Purpose of 'main-menu-background.js':
 *  JavaScript code that draws animated circles in background.
 * Dependencies:
 *  jQuery 1.11.3
 */

function Banner()
{
  var canvas;
  var context;

  var bgContext;
  var denseness;

  if (document.getElementById("html").offsetWidth > 1300)
  {
    denseness = 25;
  }
  else
  {
    denseness = 20;
  }

  //Each particle/icon
  var parts = [];

  var mouse = {x: -100, y: -100};
  var mouseOnScreen = false;

  var itercount = 0;
  var itertot = 40;

  this.initialize = function(canvas_id)
  {
    canvas = document.getElementById(canvas_id);
    context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener('mousemove', MouseMove, false);
    canvas.addEventListener('mouseout', MouseOut, false);

    getCoords();
  }

  var getCoords = function()
  {
      // quickly iterate over all pixels - leaving density gaps
      for(height = 0; height < canvas.height; height += denseness) //Iterate over x-axis
      {
            for(width = 0; width < canvas.width; width += denseness) //Iterate over y-axis
            {
              drawCircle(width, height);
            }
      }
      setInterval( update, 40 );
  }

  var drawCircle = function(x, y)
  {

    var startx = (Math.random() * canvas.width);
    var starty = (Math.random() * canvas.height);

    var velx = (x - startx) / itertot;
    var vely = (y - starty) / itertot;

    parts.push
    (
      {
        c: '#' + (Math.random() * 0x949494 + 0xaaaaaa | 0).toString(16),
        x: x, //goal position
        y: y,
        x2: x, //start position
        y2: y,
        r: false, //Released (to fly free!)
        v:{x:velx , y: vely}
      }
    )

  }

  var update = function()
  {
    var i, dx, dy, sqrDist, scale;
    itercount++;
    clear();
    for (i = 0; i < parts.length; i++)
    {

      //If the dot has been released
      if (parts[i].r == true)
      {
        //Fly into infinity!!
        parts[i].x2 += parts[i].v.x;
            parts[i].y2 += parts[i].v.y;
      //Perhaps I should check if they are out of screen... and kill them?
      }
      if (itercount == itertot)
      {
        parts[i].v = {x:(Math.random() * 6) * 2 - 6 , y:(Math.random() * 6) * 2 - 6};
        parts[i].r = false;
      }


      //Look into using svg, so there is no mouse tracking.
      //Find distance from mouse/draw!
      dx = parts[i].x - mouse.x;
          dy = parts[i].y - mouse.y;
          sqrDist =  Math.sqrt(dx*dx + dy*dy);

      if (sqrDist < 20)
      {
        parts[i].r = true;
      }

      //Draw the circle
      context.fillStyle = parts[i].c;
      context.beginPath();
      context.arc(parts[i].x2, parts[i].y2, 4 ,0 , Math.PI*2, true);
      context.closePath();
      context.fill();
    }
  }

  var MouseMove = function(e)
  {
      if (e.layerX || e.layerY == 0)
      {
        //Reset particle positions
        mouseOnScreen = true;

        mouse.x = e.layerX - canvas.offsetLeft;
        mouse.y = e.layerY - canvas.offsetTop;
      }
  }

  var MouseOut = function(e)
  {
    mouseOnScreen = false;
    mouse.x = -100;
    mouse.y = -100;
  }

  //Clear the on screen canvas
  var clear = function()
  {
    context.fillStyle = '#f1f1f1';
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.closePath();
    context.fill();
  }

  //Reset Canvas
  this.clear = function()
  {
    // Removes drawn circles
    context.globalCompositeOperation = 'destination-out';
    // Removes position-data associated with circles
    parts = [];
  }
}
var banner = new Banner();
banner.initialize("canvas");


/* Dynamically Resizeable Canvas */
(
function()
{
  initialize();

  function initialize()
  {
    //Register an event listener to call the resizeCanvas() function each timeout
    //the window is resized.
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
  }

  //Dyanamically resize canvas & re-align all draggable elements to their designated locations if they were ever moved.
  function resizeCanvas()
  {
    banner.clear();
    banner.initialize("canvas");

    //Removes any inline styles (as set by the draggableElement function) and reverts to external cascading style sheet.
    document.getElementById("menuContainer").style = null;
  }
}
)();
/* /Dynamically Resizeable Canvas/ */
