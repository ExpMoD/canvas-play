class config {
    constructor() {
        this.dir = {
            src: "app",
            build: "build"
        }

        this.jsLibs = [
            'node_modules/jquery/dist/jquery.js',
            '[src]/libs/html5shiv.js'
        ]

        this.cssLibs = [
            '[src]/libs/normalize.css'
        ]
    }

    getJsLibs() {
        return this.jsLibs.map((lib) => (
            lib.replace('[src]', this.dir.src)
        ))
    }

    getCssLibs() {
        return this.cssLibs.map((lib) => (
            lib.replace('[src]', this.dir.src)
        ))
    }
}

module.exports = new config();