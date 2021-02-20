/*
* 枚举类型是TS为JS扩展的一种类型，在原生的JS中是没有枚举类型的
* 枚举类型表示固定的几个取值
* 例如：一年四季，人的性别
* */
{
    enum Gender { // 定义了一个名称叫做Gender的枚举类型，这个枚举类型的取值有两个，分别是Male和Female
        Male,
        Female
    }

    let val: Gender // 定义了一个名称叫做val的变量， 这个变量中只能保存male或female
    val = Gender.Female
    val = Gender.Male
// val = 'nan' // error
// val = 'false' // error

// TODO：TS中的枚举底层实现的本质其实就是数值类型， 所以赋值一个数值不会报错
    val = 123 // 不会报错
    console.log(Gender.Male); // 0
    console.log(Gender.Female); // 1
}


/*
* TODO: TS中的枚举类型的取值，默认是从上至下，从0开始递增的.
*       虽然默认是从0开始递增的，但是我们也可以手动的指定枚举的取值的值
* TODO: 注意点： 如果手动指定了前面枚举值的取值，后面的枚举值的取值会根据前面的值来递增
* */

{
    enum Size {
        small = 2,
        medium = 5
    }

    // console.log(Size.small); // 6
    // console.log(Size.medium); // 7

    // TODO: 如果手动指定了后面枚举值的取值，那么前面枚举值的取值不会受到影响
    // console.log(Size.small); // 0
    // console.log(Size.medium); // 5

    // TODO: 同时修改了多个枚举值的取值，那么修改的是什么最后就是什么
    console.log(Size.small); // 2
    console.log(Size.medium); // 5

}

// 探究底层原理
{
    enum Size {
        small = 2,
        medium = 5
    }

    // TODO: 可以通过枚举值拿到对应的数字
    console.log(Size.small);
    // TODO： 可以通过对应的数据拿到它的枚举值
    console.log(Size[2]);

    /*
    "use strict";
    var Size;
    (function (Size) {
        Size[Size["small"] = 2] = "small";
        Size[Size["medium"] = 5] = "medium";
    })(Size || (Size = {}));

    let Size = {}
    Size['small'] = 2
    Size[0] = 'small'
    Size['medium'] = 5
    Size[5] = 'medium'
    * */
}
