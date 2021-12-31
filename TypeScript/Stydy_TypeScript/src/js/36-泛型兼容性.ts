{
    // todo:泛型只影响使用的部分，不会影响声明的部分
    /*
    interface TestInterFace<T> {
    }

    let t1: TestInterFace<number>
    let t2: TestInterFace<string>
    t1 = t2
    t2 = t1
    */
    interface TestInterFace<T> {
        age: T
    }

    let t1: TestInterFace<number> // age: number
    let t2: TestInterFace<string> // age: string
    // t1 = t2 // error
    // t2 = t1 // error
}
