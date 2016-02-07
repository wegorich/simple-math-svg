/**
 * Created by wegorelax on 07.02.16.
 */

"use strict";
var $ = function(str){return document.querySelectorAll(str);};

//some const
var DOT_SIZE = 11;

function selectPoint(e){
    this.parentScope.selectedPoint = this;
};

function unselectPoint(e){
    this.selectedPoint = null;
}

function drawPoint(x, y, draw, scope){
    var group  = draw.group().move(x - DOT_SIZE/2, y - DOT_SIZE/2);
    var text = group.text(`x:${x}, y:${y}`);
    var _scope = {obj: group, text: text, pos: [x, y], parentScope: scope};

    group.circle(DOT_SIZE).stroke('red').fill('red')
        .on('mousedown', selectPoint, _scope);

    return _scope;
}

function drawParallelogram(posArr, draw){
    return {
        obj: draw.polygon('').plot(Mathematic.getParallelogramCoord(posArr))
            .fill('transparent')
            .stroke('blue').back(),
        pos: posArr,
        centroid: Mathematic.getParallelogramCentroid(posArr),
        area: Mathematic.getParallelogramArea(posArr)

    }
}

function drawCircle(pos, area, draw){
    var radius = Mathematic.getCircleRadius(area);
    var group  = draw.group().move(pos[0] - radius, pos[1] - radius).back();

    group.circle(radius * 2).fill('transparent').stroke('yellow');
    var text = group.text(`x:${pos[0]}, y:${pos[1]}`).move(radius/2, radius);
    return {
        obj: group,
        text: text,
        pos: pos
    }
}

function redraw(e){
    if (this.selectedPoint){
        var p = this.selectedPoint;
        var x = e.pageX;
        var y = e.pageY;
        //redraw point
        p.obj.move(x - DOT_SIZE/2, y - DOT_SIZE/2);
        p.text.plain(`x:${x}, y:${y}`);
        p.pos[0] = x;
        p.pos[1] = y;

        //just to simplify redrawing
        resetFigure.bind(this)();
    }
}

function resetFigure(){
    this.parallelogram.obj.remove();
    this.circle.obj.remove();
    this.circle = null;
    this.parallelogram = null;

    this.parallelogram = drawParallelogram(this.dotArr.map(function(i){return i.pos;}), this.draw);
    this.circle = drawCircle(this.parallelogram.centroid, this.parallelogram.area, this.draw);

}
function onClickFirst(e){
    if(this.dotArr.length < 3){
        var x = e.pageX;
        var y = e.pageY;

        this.dotArr.push(drawPoint(x, y, this.draw, this));
    }

    if(this.dotArr.length == 3 && !this.parallelogram){
        $('#reset')[0].style.display = '';
        this.parallelogram = drawParallelogram(this.dotArr.map(function(i){return i.pos;}), this.draw);
        this.circle = drawCircle(this.parallelogram.centroid, this.parallelogram.area, this.draw);
    }
}

function reset(){
    this.dotArr.forEach(function(i){
        i.obj.remove();
    });
    resetFigure.bind(this)();

    this.dotArr.length = 0;
    $('#reset')[0].style.display =
        $('.about')[0].style.display = 'none';
    $('#about')[0].style.display = '';
}

(function (){
    $('#canvas')[0].innetHtml = null;

    var scope = {
        draw: SVG('canvas').size('100%', '400px'),
        dotArr: []
    }

    scope.draw.on('click', onClickFirst, scope);
    scope.draw.on('mousemove', redraw, scope);
    scope.draw.on('mouseup', unselectPoint, scope);

    $('#reset')[0].addEventListener('click', reset.bind(scope));
    $('#about')[0].addEventListener('click', function(){
        $('.about')[0].style.display = '';
        $('#about')[0].style.display = 'none';
    });
})();
