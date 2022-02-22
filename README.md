# 타입스크립트 정리

## 설정 & 명령어

- 파일은 `*.ts` 형식을 갖는다.
- `npm install typescript --save-dev` 를 통해 설치
- `tsconfig.json`에 설정을 정의한다. (`tsc --init` 명령어로 생성 가능)
  - `target`: 컴파일된 코드가 어떤 환경에서 실행될 지 정의합니다. 예를들어서 화살표 함수를 사용하고 target 을 es5 로 한다면 일반 function 키워드를 사용하는 함수로 변환을 해줍니다. 하지만 이를 es6 로 설정한다면 화살표 함수를 그대로 유지해줍니다.
  - `module`: 컴파일된 코드가 어던 모듈 시스템을 사용할지 정의합니다. 예를 들어서 이 값을 common 으로 하면 export default Sample 을 하게 됐을 때 컴파일 된 코드에서는 exports.default = helloWorld 로 변환해주지만 이 값을 es2015 로 하면 export default Sample 을 그대로 유지하게 됩니다.
  - `strict`: 모든 타입 체킹 옵션을 활성화한다는 것을 의미합니다.
  - `esModuleInterop`: commonjs 모듈 형태로 이루어진 파일을 es2015 모듈 형태로 불러올 수 있게 해줍니다.
    > 출처 : https://react.vlpt.us/using-typescript/01-practice.html
- `tsc` 명령어를 통해 `*.js` 파일로 컴파일할 수 있다. 컴파일시 문법을 체크하여 잘못된 문법이 있을경우 컴파일 에러를 발생시킨다.

## 문법

### 변수선언

- "변수명 : 타입" 의 형식으로 선언한다
  ```typescript
  const message: string = "hello world";
  ```
- 변수에 맞지 않는 타입을 넣을경우 에디터에서 오류를 발생한다

### 객체 유형 지정

- `interface` 를 사용하여 객체 유형을 지정할 수 있다.

  ```typescript
  interface User {
      name: string;
      id: number;
  }

  const user: User {
      name: "kim",
      id: 0,
      // test: "hello world" // 문법오류: '{ name: string; id: number; test: string; }' 형식은 'User' 형식에 할당할 수 없습니다.
  }
  ```

### 다형성

- `interface` 와 `class` 를 사용하여 객체지향의 다형성을 구현할수 있다.

  ```typescript
  interface User {
    name: string;
    id: number;
  }

  class UserAccount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
      this.name = name;
      this.id = id;
    }
  }

  const user2: User = new UserAccount("kim", 1); // 다형성
  ```

### 함수

- 함수의 의 매개변수 및 리턴타입에 타입을 지정할 수 있다

  ```typescript
  function getAdminUser(): User {
    return { name: "kim", id: 0 };
  }

  function deleteUser(user: User) {
    console.log(`${user.id} 번 ${user.name}을 삭제했습니다.`);
  }

  console.log(getAdminUser()); // { name: 'kim', id: 0 }
  deleteUser({ name: "kim", id: 0 }); // 0번 kim을 삭제했습니다.
  ```

### 타입생성

- `type` 명령어로 사용자 지정 타입생성 가능
- 유니온(`|`)과 제네릭(`<>`)을 이용한 2가지 방법

  - 유니온

    ```typescript
    /* 유니온 */
    type MyBool = true | false;
    type WindowStates = "open" | "closed" | "minimized";
    type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
    ```

  - 제네릭

    ```typescript
    // 제네릭을 활용하여 배열 내 원소타입을 강제할수 있다.
    type StringArray = Array<String>;
    type NumberArray = Array<Number>;
    type ObjectWithNameArray = Array<{ name: string }>;

    // 인터페이스와 제네릭을 활용하여 타입을 만들 수 있다.
    interface Backpack<Type> {
      add: (obj: Type) => void;
      get: () => Type;
    }

    declare const backpack: Backpack<string>;
    const object: backpack.get(); // string
    ```

### 구조형 시스템

- 유형검사가 값의 모양이 같을 경우 같은 타입으로 간주한다

  ```typescript
  interface Point {
    x: number;
    y: number;
  }

  function logPoint(p: Pointer) {
    console.log(`${p.x}, ${p.y}`);
  }

  logPoint({ x: 12, y: 34 }); // 12, 34
  const point = { x: 12, y: 34 };
  logPoint(point); // 12, 34
  const point2 = { x: 12, y: 34, z: 56 };
  logPoint(point2); // 12, 34 통과하지만 56을 출력되지 않는다.
  const color = { hex: "#123456" };
  logPoint(color); // 문법오류
  ```

> https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
