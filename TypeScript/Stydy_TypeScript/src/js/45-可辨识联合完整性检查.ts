/*
* 什么是可辨识联合？
* todo: 具有共同的可辨识特征。
*   一个类型别名，包含了具有共同的可辨识特征的类型的联合
* */

{
    interface Square {
        kind: "square"; // 可辨识的特征
        size: number;
    }

    interface Rectangle {
        kind: "rectangle"; // 可辨识的特征
        width: number;
        height: number;
    }

    interface Circle {
        kind: "circle"; // 可辨识的特征
        radius: number;
    }

    /*
    * todo: Shape就是一个可辨识联合
    *   1.取值是一个联合
    *   2.这个联合的每一个取值都有一个共同的可辨识特征
    * */

    type Shape = Square | Rectangle | Circle;


    /*
    * 在企业开发中如果相对可辨识联合的完整性进行检查，可以使用：
    * 方式一：给函数添加返回值 + 开启 strictNullChecks
    * 方式二： 添加default + never
    * */
    function MyNever(x: never): never {
        throw new Error('可辨识联合处理不完整' + x)
    }

    function area1(s: Shape): number {
        switch (s.kind) {
            case "square":
                return s.size * s.size;
            case "rectangle":
                return s.height * s.width;
            case "circle":
                return Math.PI * s.radius ** 2;
            default:
                return MyNever(s)
        }
    }
}
