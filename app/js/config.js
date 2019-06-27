class configClass {
    constructor() {
        this.circleBorderColor = '#000';
        this.circleBgColor = '#fff';

        this.bgColor = '#ebebf8';

        this.canvas = document.getElementById('main-canvas');
        this.ctx = this.canvas.getContext('2d')
    }

    canvasResize() {
        this.canvas.width = $('body').width();
        this.canvas.height = $('body').height();
    }

    circleSize() {
        return Math.min(this.canvas.width, this.canvas.height) / 2 - 20;
    }

    triangleSize() {
        let cicleSize = this.circleSize();

        return cicleSize / 5;
    }
}

let cfg = new configClass();