// https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

// 1. 추론유형
let helloWorld = "Hello World"; // string으로 추론한다.

// 2. 유형 정의
interface User {
    name: string;
    id: number;
} // 객체에 유형을정의하고 싶을때 interface를 사용한다.

const user: User = { // User interface 타입을 사용.
    name: "kim",
    id: 0,
    //test: "now defined" // 문법오류: '{ name: string; id: number; test: string; }' 형식은 'User' 형식에 할당할 수 없습니다.
}; 

// 3. 다형성
class UserAccount {
    name: string;
    id: number;

    constructor(name:string, id:number) {
        this.name = name;
        this.id = id;
    }
}

const user2: User = new UserAccount("kim", 1); // 다형성

function getAdminUser(): User {
    return { name:"kim", id: 0 }
}

function deleteUser(user: User) {
    console.log(`${user.id} 번 ${user.name}을 삭제했습니다.`)
}

console.log(getAdminUser());
deleteUser({ name:"kim", id: 0 });

// 4. 유형 지정
// 유니온방식
type MyBool = true | false;
type WindowStates = "open" | "closed" | "minimized";
type PositiveOddNumbersUnderTen = 1|3|5|7|9;

const a: MyBool = true;
//const a: MyBool = "true"; // 오류
const b: WindowStates = "open";
//const b: WindowStates = "broken"; // 오류
const c:PositiveOddNumbersUnderTen = 1;
//const c:PositiveOddNumbersUnderTen = 2; // 오류

function getLength(obj: string | string[]) {
    return obj.length;
}

console.log(getLength("test"));
console.log(getLength(["test1", "test2"]));

function wrapInArray(obj: string | string[]) {
    if(typeof obj === "string") {
        return [obj];
    }
    return obj;
}

console.log(wrapInArray("asdf")); // ['asdf']

// 제네릭
type StringArray = Array<String>;
type NumberArray = Array<Number>;
type ObjectWithNameArray = Array<{name: string}>;

const arr1: StringArray = ["kim", "lee"];
//const arr1: StringArray = [11234, "lee"]; // 오류
const arr2: NumberArray = [1,2,3,4];
//const arr2: NumberArray = ["1,2,3,4"]; // 오류
const arr3: ObjectWithNameArray = [{name:"kim" },{name: "test"}];
//const arr3: ObjectWithNameArray = [{name:1234 },{test: "test"}]; // 오류

interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}

// declare const backpack: Backpack<string>;
 
// const object = backpack.get();
// backpack.add('asdf');

interface Point {
    x: number;
    y: number;
}

function logPoint(p:Point) {
    console.log(`${p.x}, ${p.y}`);
}

logPoint({x:1234,y:5678});

const point = {x:12, y:26};
logPoint(point);

const point2 = {x:12, y:34, z:56};
logPoint(point2);

const color = {hex : "#123456"};
// logPoint(color);