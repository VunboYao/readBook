const info = {
    name: 'yyb',
    eating() {
        console.log(this) // todo: TS自动推导
        console.log(this.name, '....')
    }
}
info.eating()

{
    function eating() {
        console.log(this) // todo: TS自动推导
        console.log(this.name, '....')
    }
    const info = {
        name: 'yyb',
        eating: eating
    }
    info.eating()
}
