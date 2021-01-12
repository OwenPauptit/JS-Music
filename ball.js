class Ball
{
    constructor(cx,cy,r,theta=0,vdir=1)
    {
        this.pos = new Vector(cx + r,cy);
        this.centre = new Vector(cx,cy);
        this.r = Math.abs(r)
        this.theta = theta;
        this.angularVel = 0.1 * vdir;
        if (theta < Math.PI / 2 || theta > 3 * Math.PI / 2)
        {
            this.halfCircle = 1;
        }
        else
        {
            this.halfCircle = -1
        }
        this.lastHalfPassed = 0;
    }

    Update()
    {
        this.theta += this.angularVel;
        if (this.theta > 2 * Math.PI)
        {
            this.theta -= 2 * Math.PI;
        }
        this.pos.x = this.r * Math.cos(this.theta) + this.centre.x;
        this.pos.y = this.r * Math.sin(this.theta) + this.centre.y;
        this.halfCircle = (this.pos.x - this.centre.x) / Math.abs(this.pos.x - this.centre.x);
    }

    Draw(ctx)
    {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y,5,0,Math.PI*2,true);
        ctx.fill();
    }
}