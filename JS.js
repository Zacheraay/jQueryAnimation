$(document).ready(function() {
    createLayer()
});

var number = 4;
var layer = 0;
var right;
var stop = false;
var move;
var speed = 400;

$(document).keydown(function (event) {
    if(event.key == " ") {
        clearInterval(move);
        stop = true;
    }
})

 function createLayer() {
     var rPos = Math.floor(Math.random() * 5) * 50;
     var rDir = Math.floor(Math.random() * 2);
     for(var i = 0; i < number; i++) {
         var unit = $("<unit></unit>");
         unit.addClass("unit");
         unit.addClass("layer"+layer);
         unit.css("left", i * 50 + rPos);
         unit.css("bottom", layer * 50);
         $("#window").append(unit);
     }
     if(rDir == 0) {
         right = true;
     } else {
         right = false;
     }
     move = setInterval(shift, speed);

}

$(document).keyup(function (event) {
    if(event.key == " ") {
        if(stop) {
            removeUnit();
            layer++;
            speed -= 40;
            if(speed < 60) {
                speed = 60;
            }
            if(number > 0 && layer < 16) {
                createLayer();
            }
        }
    }
})



function shift() {
    if($(".layer"+layer)[number-1].style.left === "350px") {
        right = false;
    } else if($(".layer"+layer)[0].style.left === "0px") {
        right = true;
    }

    if(right) {
        $(".layer"+layer).animate({ left: "+=50px" }, 10);
    } else if(!right) {
        $(".layer"+layer).animate({ left: "-=50px" }, 10);
    }
}



function removeUnit() {
    if(layer > 0) {
        var remove;
        var removeCount = 0;
        for(var i = number-1; i >= 0; i--) {
            remove = true;
            var cell = $(".layer"+layer)[i];
            for(var j = 0; j < number; j++) {
                if(cell.style.left === $(".layer"+(layer-1))[j].style.left) {
                    remove = false;
                }
            }
            if(remove) {
                cell.parentNode.removeChild(cell);
                removeCount++;
            }
        }
        number -= removeCount;
    }
}
