class configClass {
    constructor() {
        this.areaBorderColor = '#000';
        this.areaBgColor = '#fff';
        this.areaBorderSize = 1;

        this.bgColor = '#ebebf8';

        this.canvas = document.getElementById('main-canvas');
        this.ctx = this.canvas.getContext('2d')

        this.polygonColors = [
            '#CC33CC',
            '#3366FF',
            '#00CC66',
            '#FF9999',
            '#FFCC00',
        ]

        this.resizeCallbackFns = []

        this.polygonCount = 5
        this.polygonNumberFaces = 3

        this.ballCount = 1
        this.ballBgColor = '#000'
        this.ballSpeed = 6

        //sizes
        this.areaSize = 0.95
        this.polygonCircleSize = 0.75
        this.polygonSize = 0.15
        this.ballSize = 0.03
    }

    addResizeCallbackFn (fn) {
        this.resizeCallbackFns.push(fn)
    }

    clearResizeCallbackFns () {
        this.resizeCallbackFns = []
    }

    canvasResize() {
        this.canvas.width = $('body').width();
        this.canvas.height = $('body').height();

        let $this = this

        this.resizeCallbackFns.forEach(function (fn) {
            fn($this)
        })
    }

    getPolygonCircleSize () {
        return this.getAreaSize() * this.polygonCircleSize
    }

    getPolygonSize () {
        return this.getAreaSize() * this.polygonSize
    }

    getBallSize () {
        return this.getAreaSize() / 2 * this.ballSize
    }

    getAreaSize() {
        return Math.min(this.canvas.width, this.canvas.height) / 2 * this.areaSize;
    }
}

let cfg = new configClass();