

class Player
{
    static play(frequency, context)
    {
        const oscillator = context.createOscillator();
        const envelope = context.createGain();
        const decayRate = 1.5; // seconds

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        envelope.gain.value = 1;

        oscillator.connect(envelope);
        envelope.connect(context.destination);  

        oscillator.start(context.currentTime);

        //envelope.gain.exponentialRampToValueAtTime(0.001, context.currentTime + decayRate);

        setTimeout(function(){oscillator.frequency.value=frequency+=50}, decayRate * 300);

    }

    static getFrequency(note) {
        var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
            octave,
            keyNumber;
    
        if (note.length === 3) {
            octave = note.charAt(2);
        } else {
            octave = note.charAt(1);
        }
    
        keyNumber = notes.indexOf(note.slice(0, -1));
    
        if (keyNumber < 3) {
            keyNumber = keyNumber + 12 + ((octave - 1) * 12) + 1; 
        } else {
            keyNumber = keyNumber + ((octave - 1) * 12) + 1; 
        }
        return 440 * Math.pow(2, (keyNumber- 49) / 12);
    };
}