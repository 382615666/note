class ProcessBar {
  constructor() {
    this.create()
  }
  create() {
    // this.canvas = document.createElement('canvas')
    this.canvas = document.querySelector('c1')
    this.ctx = this.canvas.getContext('2d')
    this.offCanvas = document.createElement('canvas')
    this.offCtx = this.offCanvas.getContext('2d')
  }

  draw(percent) {
    this.ctx.drawImage(this.offCanvas, 0, 0, this.offCanvas.width * percent / 100, this.offCanvas.height, 0, 0, this.offCanvas.width * percent / 100, this.offCanvas.height)
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}