class Map {
    constructor(param = {}) {
        // 基础样式
        this.width = param.width || 1000
        this.height = param.height || 800
        this.bgColor = param.bgColor || '#1e4152'

        /*
        * 1.设置地图基础样式
        * 2.设置为相对定位, food 与 snake 构建时基于 map 定位
        * 3.添加地图至 dom 结构中, 并返回该 Map
        * */
        let oMap = document.createElement('div')
        oMap.className = 'map'
        oMap.style.position = 'relative'
        oMap.style.width = parseInt(this.width) + 'px'
        oMap.style.height = parseInt(this.height) + 'px'
        oMap.style.background = this.bgColor
        document.body.appendChild(oMap)
        this.map = oMap

        /*
        * 2. 行与列
        * */
        this.col = parseInt(this.width) / 50
        this.row = parseInt(this.height) / 50

    }
}

class Snake extends Map {
    constructor(param) {
        super(param)
        /* 1. 初始化 snake */
        this.bodies = [
            {x: 3, y: 1, type: 1},
            {x: 2, y: 1, type: 0},
            {x: 1, y: 1, type: 0}
        ]
        document.body.addEventListener('keyup', ev => {
            switch (ev.key) {
                case 'ArrowUp':
                    if (this.currentDirection === 'ArrowDown') {
                        return;
                    } else {
                        this.key = 'ArrowUp'
                    }
                    break
                case 'ArrowRight':
                    if (this.currentDirection === 'ArrowLeft') {
                        return;
                    } else {
                        this.key = 'ArrowRight'
                    }
                    break
                case 'ArrowDown':
                    if (this.currentDirection === 'ArrowUp') {
                        return;
                    } else {
                        this.key = 'ArrowDown'
                    }
                    break
                case 'ArrowLeft':
                    if (this.currentDirection === 'ArrowRight') {
                        return;
                    } else {
                        this.key = 'ArrowLeft'
                    }
                    break
                default:
                    this.key = 'ArrowRight'
            }
        })

        this.renderFood()
        this.renderSnake()
        this.going();
    }

    // 1. 生成食物随机坐标
    generatePlace() {
        // 0. 创建数组网格地图
        this.mapArr = []
        for (let i = 0; i < this.col; i++) {
            for (let j = 0; j < this.row; j++) {
                this.mapArr.push({x: i, y: j})
            }
        }
        // 1. 查询 snake 在当前数组网格地图中的位置, 根据索引将 snake 在数组网格地图中删除
        this.bodies.forEach(item => {
            let snake = {x: item.x, y: item.y}
            let index = this.mapArr.findIndex(value => {
                return snake.x === value.x && snake.y === value.y
            })
            this.mapArr.splice(index, 1)
        })
        // 2. 随机获取数组网格中任一索引
        let randomIndex = Math.floor(Math.random() * this.mapArr.length)
        // 3. 解构获取坐标值返回
        let {x, y} = this.mapArr[randomIndex]
        return {x, y}
    }

    // 2. 根据随机坐标渲染食物
    renderFood() {
        /*
        * 1. 默认食物大小为50 * 50
        * 2. 根据坐标设置 food 在 map 中的位置
        * 3. 将 food 添加到 map 中
        * */
        // 1. 创建食物基本样式
        let oFood = document.createElement('span')
        oFood.style.width = '50px'
        oFood.style.height = '50px'
        oFood.style.position = 'absolute'
        oFood.style.background = 'green'

        // 2. 获取坐标
        this.foodCoordinate = this.generatePlace()

        // 3. 设置食物位置
        oFood.style.left = this.foodCoordinate.x * 50 + 'px'
        oFood.style.top = this.foodCoordinate.y * 50 + 'px'

        // 4. 添加到 map 中
        this.map.appendChild(oFood)

        // 5. 暴露实例属性
        this.food = oFood
    }

    // 3. render Snake
    renderSnake() {
        let aSnake = document.querySelectorAll('.snake')
        aSnake.forEach(item => {
            item.parentNode.removeChild(item)
        })
        /*
       * 1. 根据 this.bodies 中 (x, y) 坐标值,绘制 snake
       * 2. type === 1 的是 snake head
       * 3. 添加至 map 中
       * */
        this.bodies.forEach(item => {
            let oSpan = document.createElement('span')
            oSpan.className = 'snake'
            oSpan.style.position = 'absolute'
            oSpan.style.width = '50px'
            oSpan.style.height = '50px'
            oSpan.style.top = 50 * item.y + 'px'
            oSpan.style.left = 50 * item.x + 'px'
            if (item.type === 1) {
                oSpan.style.background = '#7e242f'
            } else {
                oSpan.style.background = '#c5c5c5'
            }
            this.map.appendChild(oSpan)
        })
    }

    // 4. snake 移动
    move() {
        /*
       * 1. 移动之前获取当前 snake 的最后一个节点
       * 2. 当 snake 吃到食物时, 添加该节点至 snake 最后
       * 3. 蛇节每个节点等于上一个节点的位置.
       * 4. 蛇头通过方向控制 (x, y)
       * */
        this.originPosition = {
            x: this.bodies[this.bodies.length - 1].x,
            y: this.bodies[this.bodies.length - 1].y,
            type: 0
        }
        // body 移动
        for (let i = this.bodies.length - 1; i > 0; i--) {
            this.bodies[i].x = this.bodies[i - 1].x
            this.bodies[i].y = this.bodies[i - 1].y
        }
        // head 移动
        let oHead = this.bodies[0]
        switch (this.key) {
            case 'ArrowUp':
                oHead.y -= 1
                this.currentDirection = 'ArrowUp'
                break
            case 'ArrowRight':
                oHead.x += 1
                this.currentDirection = 'ArrowRight'
                break
            case 'ArrowDown':
                oHead.y += 1
                this.currentDirection = 'ArrowDown'
                break
            case 'ArrowLeft':
                oHead.x -= 1
                this.currentDirection = 'ArrowLeft'
                break
            default:
                oHead.x += 1
                break
        }
    }

    // 5. 判断
    inspection() {
        let oHead = this.bodies[0];
        // 撞墙
        if (oHead.x >= this.col || oHead.y >= this.row || oHead.x < 0 || oHead.y < 0) {
            alert('苦海无涯, 回头是岸~')
            clearInterval(this.timer)
            return false
        }

        // 自杀
        for (let i = 4; i < this.bodies.length; i++) {
            if (oHead.x === this.bodies[i].x && oHead.y === this.bodies[i].y) {
                alert('本是同根生,相煎何太急~')
                clearInterval(this.timer)
                return false
            }
        }

        // 吃食物
        if (oHead.x === this.foodCoordinate.x && oHead.y === this.foodCoordinate.y) {
            this.food.parentNode.removeChild(this.food);
            this.renderFood()
            this.bodies.push(this.originPosition);
        }
        return true;
    }

    // 6. going
    going() {
        this.timer = setInterval(() => {
            this.move();
            let flag = this.inspection()
            if (!flag) {
                return
            }
            this.renderSnake();
        },300)
    }
}

new Snake()
