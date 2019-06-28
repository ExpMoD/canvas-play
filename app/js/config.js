class configClass {
    constructor() {
        this.circleBorderColor = '#000';
        this.circleBgColor = '#fff';

        this.bgColor = '#ebebf8';

        this.canvas = document.getElementById('main-canvas');
        this.ctx = this.canvas.getContext('2d')

        this.triangleColors = [
            '#CC33CC',
            '#3366FF',
            '#00CC66',
            '#FF9999',
            '#FFCC00',
        ]

        this.resizeCallbackFns = []

        this.triangleCount = 3

        this.ballSpeed = 1
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

        let options = {
            width: this.canvas.width,
            height: this.canvas.height
        }

        let $this = this

        this.resizeCallbackFns.forEach(function (fn) {
            fn($this)
        })
    }

    getTriangleCircleSize () {
        return this.circleSize() * 0.75
    }

    getTriangleSize () {
        return this.circleSize() * 0.15
    }

    getBallSize () {
        return this.circleSize() / 2 * 0.07
    }

    circleSize() {
        return Math.min(this.canvas.width, this.canvas.height) / 2 * 0.95;
    }
}

let cfg = new configClass();