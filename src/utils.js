export default {
    getRotateAngles(n) {
        const rotateAngles = this.getShandowAngles(n);
        rotateAngles.splice(rotateAngles.length - 1, 1);
        rotateAngles.splice(0,0,0);
        return rotateAngles;
    },
    getShandowAngles(n) {
        if (n <= 0) return []

        const angele = Math.floor(360 / n)
        let angeles = []
        for (let i = 0;i < n - 1;i++) {
            angeles[i] = angele;
        }
        angeles[n - 1] = 360 - angele * (n - 1)

        return angeles;
    }
}

export function defaultShandowRaduis(n) {
    const DEFAULT_RADUIS = [0.3, 0.5, 0.6, 0.4, 0.7, 0.8]

    console.log("n = ", n);

    let raduises = [];
    for (let i = 0; i < n; i++) {
        raduises[i] = DEFAULT_RADUIS[getRandomInt(0, DEFAULT_RADUIS.length)] 
    }

    return raduises;
}

export function getLables(n) {
    const lables = []
    for (let i = 0; i < n; i++) {
        lables[i] = `${i}`
    }

    return lables;
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
  
  