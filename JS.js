$(document).ready(function () {
    $("#win").hide();
    $("#lose").hide();
    createLayer()
});

var number = 4; //number of squares per layer
var layer = 0; //layer number we are on: bottom layer = 0
var right; //boolean determines direction the squares shift each interval
var move; //universal interval variable so that it can be cleared and declared in separate functions
var speed = 400; //# of milliseconds between each interval
var released = true; //boolean to make sure the space bar needs to be released before it registers again

$(document).keydown(function (event) {
    if (event.key == " " && released) {
        clearInterval(move); // when space bar is pressed, the interval is stopped
    }
})

//reset
$(document).keydown(function (event) {
    if (event.key == "r") {
        $(".unit").remove();
        $('#window').css("background-color", "white");
        $("#win").hide();
        $("#lose").hide();
        number = 4;
        layer = 0;
        right;
        move;
        speed = 400;
        createLayer();
    }
})

function createLayer() {
    var rPos = Math.floor(Math.random() * 5) * 50; //random number to set a random starting position for the blocks
    var rDir = Math.floor(Math.random() * 2); //random number 0 or 1 to set a random direction, left or right
    for (var i = 0; i < number; i++) { //for loop looping the number of squares wanted from var number
        var unit = $("<unit></unit>");
        unit.addClass("unit");
        unit.addClass("layer" + layer); //specifies the blocks layer, ends up looking like class="layer0"
        unit.css("left", i * 50 + rPos); // sets position
        unit.css("bottom", layer * 50); //sets height
        $("#window").append(unit);
    }
    if (rDir == 0) {
        right = true; //decides which direction from the random number
    } else {
        right = false;
    }
    move = setInterval(shift, speed); //starts the interval or movement after the layer is created, function called shift
}

$(document).keydown(function (event) { //2nd keydown function, the first is before the interval so it stops before it runs again, second is after so it can track values after interval is completely finished
    if (event.key == " " && released) {
        removeUnit(); //function to check if a block is below each one
        layer++; //adds 1 to the layer value
        speed -= 40; //increases speed by lowering time between each interval
        if (speed < 60) {
            speed = 60; //caps the speed
        }
        //win and lose conditions
        if (layer == 15) {
            $('#window').css("background-color", "#39FF14");
            $("#win").show();
        } else if (number == 0) {
            $('#window').css("background-color", "red");
            $("#lose").show();
        } else if (number > 0 && layer < 16) {
            createLayer(); //creates a new layer if there is less than 16 layers and at least 1 block still left
        }
        released = false;
    }
})





function shift() {
    if ($(".layer" + layer)[number - 1].style.left === "350px") { //changes direction if the most right block hits the edge
        right = false;
    } else if ($(".layer" + layer)[0].style.left === "0px") { //changes direction if the most left block hits the edge
        right = true;
    }

    if (right) {
        $(".layer" + layer).animate({
            left: "+=50px"
        }, 0); //adds 50px to all of the block's css left value
    } else if (!right) {
        $(".layer" + layer).animate({
            left: "-=50px"
        }, 0); //subtracts 50px from all of the block's css left value
    }
}



function removeUnit() {
    if (layer > 0) { //if statements makes sure no blocks are removed on the first layer
        var remove; //boolean to decide each block's fate
        var removeCount = 0; //counts each time a block is removed
        for (var i = number - 1; i >= 0; i--) { //loops backwards so it won't check the 4th position after one has been removed and they shift down a position
            remove = true; //assumes nothing is under it, only one of the lower blocks must be under the block to allow it to stay
            var cell = $(".layer" + layer)[i]; //variable for each block
            for (var j = 0; j < number; j++) { //for loop,checking var cell with all of the other, lower blocks
                if (cell.style.left === $(".layer" + (layer - 1))[j].style.left) { //if they have the same css left value, the block is not removed
                    remove = false;
                }
            }
            if (remove) { //if none of the lower blocks share this block's left value, it is removed
                cell.parentNode.removeChild(cell);
                removeCount++;
            }
        }
        number -= removeCount; //for each block removed, the number of blocks created in the next layer is decreased
    }
}

$(document).keyup(function (event) { //makes sure the key is released so the layers aren't spammed when holding space bar
    released = true;
})
