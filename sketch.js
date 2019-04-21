var WIDTH = 256;
var HEIGHT = 256;
var nipper;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    nipper = new Nipper();
}

function draw() {
    background(255);
    nipper.move();
    nipper.drawAll();
}

class Nipper {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.t = 0;
    }

    drawAll() {
        for (var i = -1; i <= 1; i++) {
            this.drawAt(this.x % WIDTH, this.y % HEIGHT);
            this.drawAt(this.x % WIDTH + WIDTH, this.y % HEIGHT);
            this.drawAt(this.x % WIDTH + WIDTH, this.y % HEIGHT);
        }
    }

    drawAt(x, y) {
        // Head
        fill(255);
        const r = 32;
        arc(x, y - r/2, r, r, -QUARTER_PI, PI+QUARTER_PI, PIE);
        // Shaft
        fill(0, 255, 0);
        const w = 8;
        const h = 16;
        const c = 8;
        rect(x - w/2, y, w, h);
        // Leaves
        triangle(x - w/2, y + h, x - w/2, y + h - c, x - 3*w/2, y + h - 2*c);
        triangle(x + w/2, y + h, x + w/2, y + h - c, x + 3*w/2, y + h - 2*c);
        // Eye
        fill(0);
        const s = 2;
        const t = 4;
        ellipse(x - r/4, y - r/2, s, t);
    }

    move() {
        this.t += map(mouseY, 0, HEIGHT, 3/4, 2, true);
        this.x = this.t;
        const a = 32;
        const b = 8;
        const k = keyIsPressed ? 2 : 1;
        this.y = HEIGHT/2 - a * k * abs(sin(this.t / (b * k)));
    }
}
