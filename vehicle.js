class Vehicle
{
    constructor(x,y,vy)
    {
        this.position = new Vector(x,y);
        this.acceleration = new Vector(0,0);
        this.r = 6; // size
        this.maxForce = 0.2;
        this.maxSpeed = 8.0;
        this.velocity = new Vector(0,vy*5);
        
    }

    Update()
    {
        this.velocity = Vector.Add(this.velocity,this.acceleration);
        this.velocity = Vector.Limit(this.velocity,this.maxSpeed);
        this.position = Vector.Add(this.position,this.velocity);
        this.acceleration = new Vector(0,0);
    }

    ApplyForce(force)
    {
        // Assume mass to be 1
        this.acceleration = Vector.Add(this.acceleration,force);
    }

    Seek(target)
    {
        let desired = Vector.Subtract(target,this.position);
        desired = Vector.SetLength(desired,this.maxSpeed);
        let d = Vector.DistanceSquared(this.position,target);
        /*if (d < 10000)
        {
            d = Math.sqrt(d);
            d /= 100;
            desired = Vector.Scale(desired,d);
        }*/
        let steer = Vector.Subtract(desired,this.velocity);
        steer = Vector.Limit(steer,this.maxForce);
        this.ApplyForce(steer);
    }

    Repel(target)
    {
        let d = Vector.DistanceSquared(this.position,target);
        if (d < 1000)
        {
            let desired = Vector.Subtract(this.position,target);
            desired = Vector.SetLength(desired,this.maxForce*5);
            this.ApplyForce(desired);
        }
    }

    Draw(ctx)
    {
        var theta = Vector.GetAngle(this.velocity);

        let point1 = new Vector(this.r*2,0);
        let point2 = new Vector(-this.r*2,-this.r);
        let point3 = new Vector(-this.r*2,this.r);

        point1 = Vector.Rotate(point1,theta);
        point2 = Vector.Rotate(point2,theta);
        point3 = Vector.Rotate(point3,theta);

        point1 = Vector.Add(point1,this.position);
        point2 = Vector.Add(point2,this.position);
        point3 = Vector.Add(point3,this.position);

        ctx.fillStyle = "white";
        ctx.beginPath();
        /*ctx.moveTo(point1.x,point1.y);
        ctx.lineTo(point2.x,point2.y);
        ctx.lineTo(point3.x,point3.y);
        ctx.lineTo(point1.x,point1.y);*/
        ctx.arc(this.position.x,this.position.y,8,0,Math.PI*2,true);
        ctx.fill();
    }


}