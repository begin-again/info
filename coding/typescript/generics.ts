// Simple Generic
function echo(data: any) {
    return data;
}

console.log(echo("Max"));
console.log(echo(27));
console.log(echo({name: "Max", age: 27}));

// Better Generic
function betterEcho<T>(data: T) {
    return data;
}
console.log(betterEcho("Max").length);
console.log(betterEcho<number>(27));
console.log(betterEcho({name: "Max", age: 27}));

// Built-in Generics
const testResults: Array<number> = [1.94, 2.33];
testResults.push(-2.99);
console.log(testResults);

// Arrays
function printAll<T>(args: T[]) {
    args.forEach((element) => console.log(element));
}
printAll<string>(["Apple", "Banana"]);

// Generic Types
const echo2: <T>(data: T) => T = betterEcho;

console.log(echo2<string>("Something"));

// Generic Class
class SimpleMath<T extends number | string, U extends number | string> {
    baseValue: T;
    multiplyValue: U;
    calculate(): number {
        return +this.baseValue * +this.multiplyValue;
    }
}

const simpleMath = new SimpleMath<string, number>();
simpleMath.baseValue = "10";
simpleMath.multiplyValue = 20;
console.log(simpleMath.calculate());

// a gernic map class
class MMap<T> {
    private map: {[key: string]: T} = {};

    setItem(key: string, item: T) {
        this.map[key]=item;
    }

    getItem(key: string){
        return this.map[key]
    }

    clear(){
        this.map = {}
    }

    print(){
        for(let key in this.map){
            console.log(key, this.map[key])
        }
    }
}


// number map
const numberMap = new MMap<number>();
numberMap.setItem("apples", 10)
numberMap.setItem("orange", 2)
console.log(numberMap.getItem("apples"))
numberMap.print();
numberMap.clear();
console.log('after clear')
numberMap.print();

// string map
const stringMap = new MMap<string>();
stringMap.setItem("apples", "10")
stringMap.setItem("orange", "2")
console.log(stringMap.getItem("apples"))
stringMap.print();
stringMap.clear();
console.log('after clear')
stringMap.print();
