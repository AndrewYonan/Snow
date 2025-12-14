
class Particle {

    constructor(x, y) {

        this.damp = 5;
        this.max_speed = 20;
        this.max_wind_speed = 4;
        this.pos = new Vector2(x, y);
        this.vel = new Vector2(0,0);
        this.accel = this.rand_accel();
        this.radius = randint(1,3);
        this.wind_speed = 5;
        this.wind = this.rand_wind_vec();
        this.off_screen_margin = 50;

        this.wind_speed_timer = 0;
        this.wind_speed_change_interval = this.get_wind_speed_change_interval();
        
        this.turn_interval = 10;
        this.turn_timer = 0;

        this.color = "rgb(228, 228, 228)";


    }

    get_wind_speed_change_interval() {
        return randint(100, 240);
    }

    off_screen() {
        return (this.pos.x < -this.off_screen_margin || this.pos.y > H + this.off_screen_margin || this.pos.y < -150);
    }

    rand_accel() {
        let a = new Vector2((Math.random() - 0.5)/this.damp, (Math.random())/this.damp); 
        return a.add(this.vel.mult(-0.01));
    }

    rand_wind_vec() {
        return new Vector2((Math.random() - 0.5) * this.max_wind_speed, (Math.random() - 0.2) * this.max_wind_speed);
    }

    update() {

        if (this.wind_speed_timer >= this.wind_speed_change_interval) {
            this.wind_speed_change_interval = this.get_wind_speed_change_interval();
            this.wind_speed_timer = 0;
            this.wind = this.rand_wind_vec();
        }
        

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
        this.wind_speed_timer++;
    }
    draw() {
        ctx.fillStyle = this.color;
        circle(this.pos.x, this.pos.y, this.radius);
    }
}