
class Particle {

    constructor(x, y) {

        this.damp = 10;
        this.max_speed = 5;
        this.pos = new Vector2(x, y);
        this.vel = new Vector2(0,0);
        this.accel = this.rand_accel();
        this.radius = randint(1,5);
        this.wind_speed = 10;
        this.wind = new Vector2(-this.wind_speed, this.wind_speed/2);
        this.off_screen_margin = 50;
        this.num_in_cluster = 0;
        

        this.turn_interval = 10;
        this.turn_timer = 0;

        this.color = "rgb(61, 61, 61)";


    }

    off_screen() {
        return (this.pos.x < -this.off_screen_margin || this.pos.y > H + this.off_screen_margin || this.pos.y < -150);
    }

    rand_accel() {
        let a = new Vector2((Math.random() - 0.5)/this.damp, (Math.random() - 0.5)/this.damp); 
        return a.add(this.vel.mult(-0.01));
    }

    update() {

        

        if (this.turn_timer >= this.turn_interval) {

            this.turn_timer = 0;
            this.accel = this.rand_accel();

        }

        this.pos = this.pos.add(this.vel);
        this.wind = this.wind.clamp(this.max_speed);
        this.pos = this.pos.add(this.wind);
        this.vel = this.vel.add(this.accel);
        this.vel = this.vel.clamp(this.max_speed);

        this.turn_timer++;
    }
    draw() {
        ctx.fillStyle = this.color;
        circle(this.pos.x, this.pos.y, this.radius);
    }
}