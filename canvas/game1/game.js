class Game {
  constructor(name, el) {
    this.canvas = document.querySelector(el)
    this.ctx = this.canvas.getContext('2d')
    this.name = name
    this.sprites = []

    // time
    this.startTime = 0
    this.gameTime = 0
    this.lastTime = 0
    this.fps = 0
    this.startfps = 0

    this.paused = false
    this.pausedtimeout = 100

  }
  start() {
    this.startTime = Date.now()
    window.requestAnimationFrame(time => {
      this.animate(time)
    })
  }
  animate(time) {
    if (this.paused) {
      setTimeout(() => {
        window.requestAnimationFrame(t => {
          this.animate(t)
        })
      }, this.pausedtimeout);
    } else {
      this.tick(time)
      this.clearScreen()
      this.startAnimate(time)
      this.paintUnderSprites()

      this.updateSprites(time)
      this.paintSprites(time)

      this.paintOverSprites()
      this.endAnimate()

      this.lastTime = time
      window.requestAnimationFrame(t => {
        this.animate(t)
      })
    }
  }
  tick(time) {
    this.updateFrameRate(time)
    this.gameTime = Date.now() - this.startTime
  }
  updateFrameRate(time) {
    if (this.lastTime) {
      this.fps = 1000 / (time - this.lastTime)
    } else {
      this.fps = this.startfps
    }
  }
  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  updateSprites(time) {
    this.sprites.forEach(item => {
      item.update(this.ctx, time)
    })
  }
  paintSprites(time) {
    this.sprites.filter(item => item.visible).forEach(item => {
      item.paint(this.ctx)
    })
  }
  startAnimate() {}
  paintUnderSprites() {}
  paintOverSprites() {}
  endAnimate() {}
}