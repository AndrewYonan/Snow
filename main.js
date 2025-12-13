const canvas = document.getElementById("canvas");
const BG_MAIN_COLOR = "rgb(233, 233, 233)";
const W = 1400;
const H = 800;
const ctx = build_canvas(canvas, adaptive_res=true);
const PI = 3.1415;
const root3 = Math.sqrt(3);
const FRAME_RATE = 60;
const iterator = setInterval(frame, Math.floor(1000 / FRAME_RATE));
let start_time = Date.now();

let FRAME = 0;
let particles = [];
let wind_nodes = [];
let particle_spawn_rate = 2;
let wind_node_spawn_rate = 10;
let cur_time = 0;


function randint(a, b) {
    return a + Math.floor(Math.random() * (b - a + 1));
}


function spawn_particles(n) {
    for (let i = 0; i < n; ++i) {
        particles.push(new Particle(randint(0, W*2), randint(0, -100)));
    }
}


function spawn_wind_node() {
    wind_nodes.push(new WindNode(randint(W, W + 100), randint(0, H), randint(75, 300)));
}


function frame() {

    ctx.clearRect(0, 0, W, H);

    draw_stats();
    draw_particles();
    // draw_wind_nodes();

    update_particles();
    update_wind_nodes();


    if (FRAME % particle_spawn_rate == 0) {
        spawn_particles(30);
    }


    if (FRAME % wind_node_spawn_rate == 0) {
        spawn_wind_node();
    }

    FRAME++;
    cur_time = Date.now() - start_time;
}



function draw_particles() {
    for (let i = 0; i < particles.length; ++i) {
        particles[i].draw();
    }
}



function update_particles() {

    for (let i = 0; i < particles.length; ++i) {
        if (particles[i].off_screen()) {
            particles.splice(i, 1);
            i--;
        }
        else {

            particles[i].update();

            let wind_node = null;

            for (let j = 0; j < wind_nodes.length; ++j) {
                if (particle_in_wind_node(particles[i], wind_nodes[j])) {
                    wind_node = wind_nodes[j];
                }
            }

            if (wind_node) particles[i].accel = wind_node.vel.div(150);
        }
    }   
}


function draw_wind_nodes() {
    for (let i = 0; i < wind_nodes.length; ++i) {
        wind_nodes[i].draw();
    }
}


function update_wind_nodes() {

    for (let i = 0; i < wind_nodes.length; ++i) {
        if (wind_nodes[i].off_screen()) {
            wind_nodes.splice(i, 1);
            i--;
        }
        else {
            wind_nodes[i].update();
        }
    }
}



function draw_stats() {
    ctx.fillStyle = "black";
    ctx.font = "20px 'Times New Roman'";
    ctx.fillText(`Snow : ${particles.length}`, 100, 100);
    ctx.fillText(`Wind Nodes : ${wind_nodes.length}`, 100, 130);
    ctx.fillText(`FPS : ${Math.trunc(FRAME / cur_time * 1000)}`, 100, 160);
}


function particle_in_wind_node(particle, wind_node) {
    return (particle.pos.sub(wind_node.pos)).mag() <= wind_node.radius;
}


function dist(particle1, particle2) {
    return particle1.pos.sub(particle2.pos).mag();
}



function circle(x,y,r) {
    ctx.beginPath()
    ctx.arc(x,y,r,0,2*PI);
    ctx.fill();
        
}


function line_between(particle1, particle2) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 0.2;
    line(particle1.pos, particle2.pos);
}


function line(v1, v2) {
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.stroke();
}




function build_canvas(canvas, adaptive_res) {

    const dpr = window.devicePixelRatio || 1; 

    if (adaptive_res) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
    }
    else {
        canvas.width = W;
        canvas.height = H;
    }
    
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    
    canvas.style.position = "absolute";
    canvas.style.left = "50%";
    canvas.style.transform = "translateX(-50%)"
    canvas.style.backgroundColor = BG_MAIN_COLOR;;

    const ctx = canvas.getContext('2d');
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (adaptive_res) {
        ctx.scale(dpr, dpr);
    }

    return ctx;
}






// if (particles.length < 2) continue;

//             let N_cluster = 0;
//             let thresh_dist = 60;
//             let cluster_max = 1;

//             for (let j = 0; j < particles.length; ++j) {
//                 if (N_cluster > cluster_max) break;
//                 if (i != j) {
//                     if (dist(particles[i], particles[j]) < thresh_dist) {
//                         N_cluster++;                        
//                         // line_between(particles[i], particles[j]);
//                     }
//                 }
//             }