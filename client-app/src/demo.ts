let age: number | string;
age = "35";

interface ICar {
    color: string,
    model: string,
    topSpeed?: number//opcional
}


const car1: ICar = {
    color: "blue",
    model: "ford"
}

const car2: ICar = {
    color: "red",
    model: "BMW",
    topSpeed: 100
}

const multiply = (x:number, y:number) : string=> {
    return `x: ${x} y: ${y}`;
}

export const cars = [car1, car2];
