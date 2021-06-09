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

    this.images = {}
    this.imageUrls = []
    this.imagesLoaded = 0
    this.imageLoadFailed = 0

    this.cloudOffset = 0

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
  imageLoadedCallback() {
    this.imagesLoaded++
  }
  imageLoadFailedCallback() {
    this.imageLoadFailed++
  }
  loadImage(url) {
    const image = new Image()
    image.addEventListener('load', () => {
      this.imageLoadedCallback()
    })
    image.addEventListener('error', () => {
      this.imageLoadFailedCallback()
    })
    image.src = url
    this.images[url] = image
  }
  loadImages() {
    this.imageUrls.forEach(item => {
      this.loadImage(item)
    })
    return (this.imagesLoaded + this.imageLoadFailed) / this.imageUrls.length * 100
  }
  queueImage(url) {
    this.imageUrls.push(url)
  }
  startAnimate() {}
  paintUnderSprites() {
    this.paintBg()
    this.paintSun()
    this.paintFarCloud(20, 20)
    this.paintFarCloud(this.canvas.width + 20, 20);
  }
  paintBg() {
    this.ctx.save()
    this.ctx.fillStyle = 'rgba(120,168,249,0.7)'
    this.ctx.beginPath()
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fill()
    this.ctx.restore()
  }
  paintSun() {
    this.ctx.save()
    this.ctx.strokeStyle = 'orange'
    this.ctx.fillStyle = 'yellow'
    this.lineWidth = 1
    this.ctx.beginPath()
    this.ctx.arc(450, 110, 80, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.restore()
  }
  paintFarCloud(x, y) {
    this.ctx.save();
    this.cloudOffset = (this.cloudOffset + 0.025) % this.canvas.width
    this.ctx.translate(-this.cloudOffset, 0)
    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = 'rgba(100, 140, 230, 0, 0.8)';
    this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
    this.ctx.beginPath();

    this.ctx.moveTo(x + 102, y + 91);
    this.ctx.quadraticCurveTo(x + 180, y + 110, x + 250, y + 90);
    this.ctx.quadraticCurveTo(x + 312, y + 87, x + 279, y + 60);
    this.ctx.quadraticCurveTo(x + 321, y + 20, x + 265, y + 20);
    this.ctx.quadraticCurveTo(x + 219, y + 4, x + 171, y + 23);
    this.ctx.quadraticCurveTo(x + 137, y + 5, x + 104, y + 18);
    this.ctx.quadraticCurveTo(x + 57, y + 23, x + 79, y + 48);
    this.ctx.quadraticCurveTo(x + 57, y + 74, x + 104, y + 92);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
  }
  paintOverSprites() {
    this.paintNearCloud(120, 20)
    this.paintNearCloud(this.canvas.width + 120, 20)
  }
  paintNearCloud(x, y) {
    this.ctx.save();
    this.cloudOffset = (this.cloudOffset + 0.025) % this.canvas.width
    this.ctx.translate(-this.cloudOffset, 0)
    this.cloudOffset = (this.cloudOffset + 0.025) % this.canvas.width
    this.ctx.translate(-this.cloudOffset, 0)
    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = 'rgba(100, 140, 230, 0, 0.8)';
    this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
    this.ctx.beginPath();

    this.ctx.fillStyle = 'rgba(255,255,255,0.7)';

    this.ctx.moveTo(x + 364, y + 37);
    this.ctx.quadraticCurveTo(x + 426, y + 28, x + 418, y + 72);
    this.ctx.quadraticCurveTo(x + 450, y + 123, x + 388, y + 114);
    this.ctx.quadraticCurveTo(x + 357, y + 144, x + 303, y + 115);
    this.ctx.quadraticCurveTo(x + 251, y + 118, x + 278, y + 83);
    this.ctx.quadraticCurveTo(x + 254, y + 46, x + 320, y + 46);
    this.ctx.quadraticCurveTo(x + 326, y + 12, x + 362, y + 37);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();

  }
  endAnimate() {}
}