class WindNode {
    constructor(x, y, radius) {
        this.damp = 10;
        this.radius = radius;
        this.pos = new Vector2(x, y);
        this.vel = new Vector2(0,0);
        this.accel = this.rand_accel();
        this.preference_dir = new Vector2(-5,0);

        this.turn_interval = 100;
        this.turn_timer = 0;
        
    }

    off_screen() {
        return (this.pos.x < -100 || this.pos.x > W + 300 || this.pos.y > H + 100 || this.pos.y < -100);
    }


    rand_accel() {
        return new Vector2((Math.random() - 0.5)/this.damp, (Math.random() - 0.5)/this.damp); 
    }


    update() {

        if (this.turn_timer >= this.turn_interval) {

            this.turn_timer = 0;
            this.accel = this.rand_accel();

        }

        this.pos = this.pos.add(this.preference_dir)
        this.pos = this.pos.add(this.vel);
        this.vel = this.vel.add(this.accel);

        this.turn_timer++;
    }

    draw() {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}