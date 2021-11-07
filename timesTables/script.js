/**
* @description : graphical representation of the time tables
*
* @author cxts  <couchaux.thomas@gmail.com>
* @github https://github.com/cxTs
* @date 05/02/2020
* @required setup.js, Vector.js
* @param {VOID} none
* @return {VOID} draw time tables on a circle
*
**/

let circle =  new Vector(width / 2, height /2);
let circleRadius = 280;
// speed limit inc
let count = 0;


// time tables to draw
let factor = 2;
// the modulo of the table. better if it's a multiple of 9
let modulo = 720;

// points around the circle  [0, modulo[
let points = [];

let angle = 0 + Math.PI / 2;
// value that will be used for angle incrementation
let angleInc = (Math.PI * 2) / modulo;
// permits us to see the final of the current table while if loop count 100 rounds to get a 0 value
let pauseTimer = -100;


/**
* @description : algorythm that place vector following modular arithmetic, on a
*                given circle and draw line between them.
*
* @param {VOID} none
* @return {VOID} :
*
**/
function createTablePoints() {
    // create all the vectors that define the table on the circle
    // and store them in an array
    for (let i = 0; i <= modulo; i++) {
        let v = new Vector(circle.x - circleRadius, height / 2);
        v.rotateAround(circle, angle);
        points[i] = v;
        angle += angleInc;
        points[i].display(ctx, 0);
    }
}



let speedLimit = 0;

let i = 0;
function draw() {
    if (count == speedLimit) {
        // if void, create the current table points around the circle
        if (points.length == 0) {
            createTablePoints();
        }
        if (i <= modulo) {
            // result of the times table, i.e i * factor, and get the modulus
            let result = (i * factor) % modulo;
            // drawing line from i to the result of i * factor
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[result].x, points[result].y );
            ctx.closePath();
            ctx.stroke();
            // end drawing
            i++;
        } else { // the current times table is finished, init vars for the next one
            factor++; // next times table
            i = 0; // points's loop index to 0
            points = []; // void points init
            clear(); // clearing canvas
        }
        count = (i > modulo) ? pauseTimer : 0;
    } else {
        count++;
    }
    if (!__paused) {
            window.requestAnimationFrame(draw);
    }
}
window.requestAnimationFrame(draw);
