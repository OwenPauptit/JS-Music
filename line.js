class Line{
    constructor(x1,y1,frequency,islast=false)
    {
        this.centre = new Vector(x1,y1);
        this.frequency = frequency;
        this.oscillation = 0;
        this.Amplitude = 0
        this.oscillationDir = 0
        this.damping = 0.9;
        this.isLast = islast;
        this.nextFrequency = -1;
    }

    Oscillate()
    {
        this.oscillation = 5;
        this.Amplitude = 5;
        this.oscillationDir = -1;
    }

    ChangeFrequency(f)
    {
        this.nextFrequency = f;
        /*if (this.nextFrequency = Infinity)
        {
            this.frequency = this.nextFrequency;
        }
        else if (this.frequency == Infinity)
        {
            this.frequency = this.nextFrequency * 2;
        }*/
    }

    Draw(ctx)
    {
        //console.log(this.frequency == Infinity);
        //if (this.frequency != Infinity)
        {
            ctx.strokeStyle = "white";
            var length = 1600000*2/*0*/ / (this.frequency * this.frequency);
            var x1 = this.centre.x - length / 2;
            var x2 = this.centre.x + length / 2;
            var y = this.centre.y;
            var h = Math.abs(this.oscillation);
            var l = length;
            var r = 4 * h * h + l * l
            r /= 8 * h;
            var d = Vector.Distance(new Vector(x2,y),new Vector(this.centre.x+r,y+r-h));
            var angle1 = 2 * Math.asin(d / (2*r)) + Math.PI;
            var angle2 = angle1 + 2 * Math.asin(l / (2*r))
            if (this.oscillation == 0)
            {
                ctx.beginPath();
                ctx.moveTo(x1,y);
                ctx.lineTo(x2,y);
                ctx.stroke();
            }
            else if (this.oscillation > 0)
            {
                ctx.beginPath();
                ctx.arc(this.centre.x,this.centre.y+r-h,r,angle1,angle2,false)
                ctx.stroke();
    
            }
            else
            {
                ctx.beginPath();
                ctx.arc(this.centre.x,this.centre.y-r+h,r,Math.PI+angle1,Math.PI+angle2,false)
                ctx.stroke();
            }
            this.oscillation += this.oscillationDir;
            if (Math.abs(this.oscillation) >= this.Amplitude)
            {
                this.oscillationDir *= -1;
            }
            else
            {
                this.Amplitude *= this.damping;
            }
            if (this.Amplitude < 0.3)
            {
                this.Amplitude = 0;
                this.oscillation = 0;
                this.oscillationDir = 0;  
            }
            if (this.nextFrequency != -1)
            {
                this.frequency += (this.nextFrequency - this.frequency) / 5;
                if (this.frequency < this.nextFrequency + 10 && this.frequency > this.nextFrequency - 10 )
                {
                    this.frequency = this.nextFrequency;
                    this.nextFrequency = -1;
                }
            }

        }
    }
}