class Ball
{
    constructor(cx,cy,r,theta=0,vdir=1)
    {
        this.pos = new Vector(cx + r,cy);
        this.centre = new Vector(cx,cy);
        this.r = Math.abs(r)
        this.theta = theta;
        this.angularVel = 0.06 * vdir;
        if (theta < Math.PI / 2 || theta > 3 * Math.PI / 2)
        {
            this.halfCircle = 1;
        }
        else
        {
            this.halfCircle = -1
        }
        this.lastHalfPassed = 0;
        this.lastLinePassed = -1;
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
        var otherX = this.r * Math.cos(this.theta + Math.PI) + this.centre.x;
        var otherY = this.r * Math.sin(this.theta + Math.PI) + this.centre.y;
        var gradient = ctx.createLinearGradient(this.pos.x, this.pos.y, otherX, otherY);
        gradient.addColorStop("0", "white");
        gradient.addColorStop("1.0", "black");
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        if (this.angularVel > 0)
        {
            ctx.arc(this.centre.x,this.centre.y,this.r,this.theta-Math.PI,this.theta,false);
        }
        else{
            ctx.arc(this.centre.x,this.centre.y,this.r,this.theta+Math.PI,this.theta,true);

        }
        ctx.stroke();


        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y,5,0,Math.PI*2,true);
        ctx.fill();
    }
}