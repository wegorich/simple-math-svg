/**
 * Created by wegorelax on 07.02.16.
 */
Mathematic = {
    getParallelogramCoord: function(pos){
        if(!pos.length) return;

        var x = pos[0][0] - pos[1][0] + pos[2][0];
        var y = pos[0][1] - pos[1][1] + pos[2][1];
        pos[3] = [x, y];
        return pos;
    },
    getParallelogramCentroid: function(parallelogramCoord){
        return [
            parallelogramCoord.reduce(function(sum, coord){ return sum + coord[0]}, 0) / 4, //X
            parallelogramCoord.reduce(function(sum, coord){ return sum + coord[1]}, 0) / 4  //Y
        ];
    },
    getCircleRadius: function(circleArea){
        return Math.sqrt(circleArea / Math.PI);
    },
    getPolygonArea: function(polygonCoord){
        if(polygonCoord.length < 3) return 0;
        var area = 0
        for (var i = 0; i < polygonCoord.length; i++) {
            var x1 = polygonCoord[i][0];
            var y1 = polygonCoord[i][1];
            var pl = polygonCoord[i + 1] || polygonCoord[0];
            var x2 = pl[0];
            var y2 = pl[1];
            area += x1 * y2 - y1 * x2;
        }
        return Math.abs(area) / 2;
    },

    getParallelogramArea: function(parallelogramCoord){ return this.getPolygonArea(parallelogramCoord);}
};