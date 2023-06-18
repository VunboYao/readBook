// importm
import 'package:flutter/material.dart';
import 'package:flutter_project/asset.dart';

void main() {
  runApp(
    // 根组件
    MaterialApp(
      title: 'Flutter Travel',
      theme: ThemeData(primarySwatch: Colors.brown),
      // 脚手架
      home: Scaffold(
        // 导航
        appBar: AppBar(
          title: Text(
            'Hello World',
            style: TextStyle(color: Colors.amber[300]),
          ),
        ),
        body: const BuildButton(),
      ),
    ),
  );
}

// statelessW
class MyHome extends StatelessWidget {
  const MyHome({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        'Hello Flutter',
        textDirection: TextDirection.ltr,
        style: TextStyle(
          fontSize: 38,
          color: Colors.amber,
        ),
      ),
    );
  }
}

// div
class MyContainer extends StatelessWidget {
  const MyContainer({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100,
      height: 100,
      // 子元素的位置
      alignment: Alignment.bottomRight,
      decoration: BoxDecoration(
        // 背景色
        color: Colors.red,
        // 边框
        border: Border.all(
          color: Colors.black,
          width: 2,
        ),
        // 圆角
        borderRadius: BorderRadius.circular(10),
        boxShadow: const [
          BoxShadow(
            color: Colors.yellow,
            blurRadius: 10.0,
          ),
        ],
        // 抽象类，看子类实现
        gradient: const LinearGradient(colors: [
          Colors.red,
          Colors.green,
        ]),
      ),
      child: Text(
        'No',
        style: TextStyle(color: Colors.green[100]),
      ),
    );
  }
}

// image
class MyImage extends StatelessWidget {
  const MyImage({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      padding: const EdgeInsets.all(8.0),
      decoration: const BoxDecoration(
        color: Color.fromARGB(255, 11, 51, 195),
      ),
      child: Column(
        children: [
          // 远程图片
          Image.network(
            'https://img1.baidu.com/it/u=3578602466,4075824732&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            scale: 1,
            width: 150,
            fit: BoxFit.cover,
            repeat: ImageRepeat.noRepeat,
          ),
          const SizedBox(
            height: 20,
          ),
          // 背景图片
          Container(
            width: 150,
            height: 150,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(18.0),
              color: Colors.green,
              image: const DecorationImage(
                  image: NetworkImage(
                      'https://img1.baidu.com/it/u=3578602466,4075824732&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'),
                  fit: BoxFit.contain),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          // 圆形图片
          ClipOval(
            child: Image.network(
              'https://img2.baidu.com/it/u=1537181016,1087784084&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
              width: 150,
              height: 150,
              fit: BoxFit.fill,
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          // 本地图片
          // SizedBox(
          //   height: 150,
          //   width: 150,
          //   child: Image.asset('images/car.jpg'),
          // ),
          const CircleAvatar(
            radius: 76,
            backgroundColor: Colors.lightBlue,
            child: CircleAvatar(
              radius: 70,
              // backgroundImage: NetworkImage("https://www.itying.com/images/flutter/3.png"),
              backgroundImage: AssetImage('images/car.jpg'),
            ),
          ),
        ],
      ),
    );
  }
}

// icon的使用
class MyIcon extends StatelessWidget {
  const MyIcon({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width,
      child: Column(
        children: [
          const Icon(
            Icons.safety_check_rounded,
            color: Colors.blueAccent,
          ),
          const Icon(Icons.person),
          const Icon(Icons.home),
          const Icon(
            Icons.category,
            size: 50,
          ),
          const Icon(Icons.supervised_user_circle_outlined),
          Icon(
            AweSomeIcon.Ali,
            color: Colors.amber[900],
          ),
          const Icon(
            AweSomeIcon.WeChat,
            color: Colors.green,
          ),
        ],
      ),
    );
  }
}

// 自定义图标
class AweSomeIcon {
  static const IconData Ali = IconData(
    0xe666,
    fontFamily: 'myIcon',
    matchTextDirection: true,
  );

  static const IconData WeChat = IconData(
    0xe8bb,
    fontFamily: 'myIcon',
    matchTextDirection: true,
  );
}

// listView
class MyListView extends StatelessWidget {
  const MyListView({super.key});

  @override
  Widget build(BuildContext context) {
    const url = 'https://img2.baidu.com/it/u=1537181016,1087784084&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500';
    return ListView(
      // padding: EdgeInsets.only(left: 20),
      children: <Widget>[
        const ListTile(
          leading: Icon(Icons.school),
          title: Text('Hello List'),
        ),
        const Divider(),
        const ListTile(
          leading: Icon(
            Icons.assignment,
            color: Colors.yellow,
          ),
          title: Text('All order'),
        ),
        const Divider(),
        const ListTile(
          leading: Icon(
            Icons.payment,
            color: Colors.red,
          ),
          title: Text('waiting'),
          trailing: Icon(Icons.turn_right_outlined),
        ),
        const Divider(),
        const ListTile(
          leading: CircleAvatar(
            radius: 50,
            backgroundImage: NetworkImage(
                'https://img2.baidu.com/it/u=1537181016,1087784084&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500'),
          ),
          title: Text('I like flutter, it\'s good'),
          subtitle: Text('Second title, you can add some other word...'),
        ),
        const Divider(),
        ListTile(
          trailing: Image.network(url),
          title: const Text(
              'I like flutter, it\'s good,I like flutter, it\'s good,I like flutter, it\'s good,I like flutter, it\'s good'),
        ),
        Image.network(url),
        Container(
          padding: const EdgeInsets.only(top: 30),
          child: const Text(
            'Hello Boy',
            textAlign: TextAlign.center,
          ),
        ),
        Image.asset(
          'images/car.jpg',
          width: MediaQuery.of(context).size.width,
        ),
      ],
    );
  }
}

// ListView横轴
class MyListViewMain extends StatelessWidget {
  const MyListViewMain({super.key});

  @override
  Widget build(BuildContext context) {
    const url = 'https://img2.baidu.com/it/u=1537181016,1087784084&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500';
    return SizedBox(
      height: 120,
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.only(left: 20, right: 20),
        children: [
          Container(
            height: 120, // 外层是listview, 如果是横向，则高度自适应
            width: 120, // listView中宽度自适应，无效
            decoration: const BoxDecoration(
              color: Colors.red,
            ),
            child: Column(children: [
              SizedBox(
                height: 100,
                child: Image.network(
                  url,
                  fit: BoxFit.cover,
                ),
              ),
              const Text(
                'World',
                style: TextStyle(color: Colors.white),
              ),
            ]),
          ),
          Container(
            height: 120,
            width: 120,
            decoration: const BoxDecoration(
              color: Color.fromARGB(255, 36, 193, 25),
            ),
          ),
          Container(
            height: 120,
            width: 120,
            decoration: const BoxDecoration(
              color: Color.fromARGB(255, 8, 122, 183),
            ),
          ),
          Container(
            height: 120,
            width: 120,
            decoration: const BoxDecoration(
              color: Color.fromARGB(255, 76, 2, 116),
            ),
          ),
          Container(
            height: 120,
            width: 120,
            decoration: const BoxDecoration(
              color: Color.fromARGB(255, 172, 186, 11),
            ),
          ),
          Container(
            height: 120,
            width: 120,
            decoration: const BoxDecoration(
              color: Colors.red,
            ),
          ),
        ],
      ),
    );
  }
}

// 动态数据渲染
List<Map<String, String>> listData = [
  {
    "title": "Baidu",
    "icon": "https://img2.baidu.com/it/u=2045218492,1693722965&fm=253&fmt=auto&app=120&f=JPEG?w=1354&h=800",
    "author": "Mr.Li",
  },
  {
    "title": "ALi",
    "icon": "https://img0.baidu.com/it/u=2723467528,3895454668&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=719",
    "author": "JackMa",
  },
  {
    "title": "Tencent",
    "icon": "https://img2.baidu.com/it/u=3606917007,551039400&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500",
    "author": "JackMa",
  },
];

class MyActiveListView extends StatelessWidget {
  const MyActiveListView({super.key});

  List<Widget> _initListData() {
    List<Widget> list = [];

    // for循环
    /* for (var i = 0; i < listData.length; i++) {
      list.add(ListTile(
        title: Text('${listData[i]['title']}'),
        leading: Image.network('${listData[i]['icon']}'),
        subtitle: Text('${listData[i]['author']}'),
      ));
      list.add(const Divider());
    } */

    // map 循环
    var tempList = listData.map((e) {
      return ListTile(
        title: Text('${e['title']}'),
        leading: Image.network('${e['icon']}'),
        subtitle: Text('${e['author']}'),
      );
    });

    return tempList.toList();
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: _initListData(),
    );
  }
}

// ListView.Builder 构建数据
class MyListViewBuilder extends StatelessWidget {
  const MyListViewBuilder({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      // 数量
      itemCount: listData.length,
      // 构建器
      itemBuilder: (context, index) {
        return ListTile(
          title: Text('${listData[index]['title']}'),
          trailing: Image.network(listData[index]['icon']!),
          subtitle: Text('${listData[index]['author']}'),
        );
      },
    );
  }
}

// GridView网格布局
class MyGridView extends StatelessWidget {
  const MyGridView({super.key});

  @override
  Widget build(BuildContext context) {
    // return const GridViewCount();
    return const GridViewExtent();
  }
}

// 指定count的方式
class GridViewCount extends StatelessWidget {
  const GridViewCount({super.key});

  // 动态生成模拟数据
  List<Widget> _initGridViewData() {
    List<Widget> tempList = [];
    for (var i = 0; i < 12; i++) {
      tempList.add(
        Container(
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: Colors.blue[200],
          ),
          child: Text(
            'i am element---$i',
            style: const TextStyle(fontSize: 18),
          ),
        ),
      );
    }
    return tempList;
  }

  @override
  Widget build(BuildContext context) {
    /* return GridView.count(
      // 横轴上展示的数量
      crossAxisCount: 3,
      children: const [
        Icon(
          Icons.padding,
          color: Colors.red,
          shadows: [
            Shadow(color: Colors.black, offset: Offset(20, 20), blurRadius: 20),
          ],
        ),
        Icon(Icons.abc_sharp),
        Icon(Icons.access_alarm),
        Icon(Icons.search),
        Icon(Icons.padding),
        Icon(Icons.abc_sharp),
        Icon(Icons.access_alarm),
        Icon(Icons.search),
        Icon(Icons.padding),
        Icon(Icons.abc_sharp),
        Icon(Icons.access_alarm),
        Icon(Icons.search),
      ],
    ); */

    return GridView.count(
      padding: const EdgeInsets.all(10),
      // 一行的数量
      crossAxisCount: 2,
      // 垂直方向
      mainAxisSpacing: 10,
      // 水平方向
      crossAxisSpacing: 10,
      // 子元素的宽高比
      childAspectRatio: 1,
      children: _initGridViewData(),
    );
  }
}

// 指定宽度的extent
class GridViewExtent extends StatelessWidget {
  const GridViewExtent({super.key});

  // 动态生成模拟数据
  List<Widget> _initGridViewData() {
    List<Widget> tempList = [];
    for (var i = 0; i < 13; i++) {
      tempList.add(
        Container(
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: Colors.blue[200],
          ),
          child: Text(
            'i am element---$i',
            style: const TextStyle(fontSize: 18),
          ),
        ),
      );
    }
    return tempList;
  }

  List<Widget> _initGridViewDemo() {
    var tempData = listData.map(
      (e) {
        return Container(
          decoration: BoxDecoration(
            border: Border.all(color: Colors.black),
          ),
          child: Column(
            children: [
              Image.network(e["icon"]!),
              Text(e['title']!),
            ],
          ),
        );
      },
    );
    return tempData.toList();
  }

  @override
  Widget build(BuildContext context) {
    /* return GridView.extent(
      // 横轴上元素的最大长度
      maxCrossAxisExtent: 140,
      children: const [
        Icon(Icons.padding),
        Icon(Icons.abc_sharp),
        Icon(Icons.access_alarm),
        Icon(Icons.search),
        Icon(Icons.padding),
        Icon(Icons.abc_sharp),
        Icon(Icons.access_alarm),
        Icon(Icons.search),
        Icon(Icons.padding),
        Icon(Icons.abc_sharp),
        Icon(Icons.access_alarm),
        Icon(Icons.search),
      ],
    ); */
    return GridView.extent(
      // 横轴子元素的固定宽度
      maxCrossAxisExtent: 220,
      padding: const EdgeInsets.all(10),
      // 水平距离
      crossAxisSpacing: 10,
      // 纵向距离
      mainAxisSpacing: 10,
      // 子元素宽高比
      childAspectRatio: 1,
      children: _initGridViewDemo(),
    );
  }
}

// GridView.builder
class GridViewBuilderDemo extends StatelessWidget {
  const GridViewBuilderDemo({super.key});

  Widget _initGridViewData(BuildContext context, int index) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: Colors.green,
        ),
      ),
      child: Column(
        children: [
          Image.network(listData[index]['icon']!),
          Text(listData[index]['title']!),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    /*
    // gridView count模式
    return GridView.builder(
      itemCount: listData.length,
      // 定义count模式下相关数据
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisSpacing: 10,
        crossAxisCount: 2,
        mainAxisSpacing: 20,
      ),
      itemBuilder: _initGridViewData,
    ); */

    // gridView的extent模式
    return GridView.builder(
      itemCount: listData.length,
      gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 220,
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
      ),
      itemBuilder: _initGridViewData,
    );
  }
}

// row column expand
class IconContainer extends StatelessWidget {
  final Color color;
  final IconData icon;

  const IconContainer(
    this.icon, {
    super.key,
    this.color = Colors.white,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100,
      height: 100,
      color: Colors.red,
      child: Icon(
        icon,
        color: color,
        size: 28,
      ),
    );
  }
}

class RowColumnExpanded extends StatelessWidget {
  const RowColumnExpanded({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      shrinkWrap: true,
      children: [
        _buildDemo1(),
        _buildDemo2(),
      ],
    );
  }

  Widget _buildDemo1() {
    return Column(
      children: [
        Container(
          height: 200,
          color: Colors.black,
        ),
        Row(
          children: [
            SizedBox(
              height: 180,
              child: Expanded(
                flex: 2,
                child: Image.network(YYB.url),
              ),
            ),
            Expanded(
              flex: 1,
              child: SizedBox(
                height: 180,
                child: Column(
                  children: [
                    Expanded(
                      flex: 1,
                      child: SizedBox(
                        width: double.infinity,
                        child: Image.asset(
                          'images/car.jpg',
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    const SizedBox(
                      height: 5,
                    ),
                    Expanded(
                      flex: 1,
                      child: SizedBox(
                        width: double.infinity,
                        child: Image.asset(
                          'images/2.0x/car.jpg',
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildDemo2() {
    return Container(
      height: 200,
      color: Colors.green,
      child: const Row(
        children: [
          IconContainer(Icons.school, color: Colors.white),
          Expanded(
            child: IconContainer(
              Icons.abc,
              color: Colors.yellow,
            ),
          ),
        ],
      ),
    );
  }
}

class StackAlignPosition extends StatelessWidget {
  const StackAlignPosition({super.key});

  @override
  Widget build(BuildContext context) {
    // 媒体查询页面宽度
    final size = MediaQuery.of(context).size;
    print(size);

    return buildDemoNavBar();
  }

  buildDemo1() {
    return Center(
      child: Stack(
        alignment: Alignment.topRight,
        children: [
          Container(
            height: 400,
            width: 300,
            color: Colors.red,
          ),
          const Text(
            'some text',
            style: TextStyle(
              fontSize: 40,
              color: Colors.white,
            ),
          )
        ],
      ),
    );
  }

  buildAlign() {
    return Container(
      height: 120,
      width: 120,
      color: Colors.blue.shade100,
      child: const Align(
        // 以矩形的中心点为坐标原点
        // (Alignment.x*childWidth/2+childWidth/2, Alignment.y*childHeight/2+childHeight/2)
        alignment: Alignment(2, 0.0),
        child: FlutterLogo(
          size: 60,
        ),
      ),
    );
  }

  // Stack中可以使用 align来实现定位
  buildStackAlign() {
    return Center(
      child: Container(
        height: 300,
        width: 300,
        color: Colors.red,
        child: const Stack(
          children: [
            Align(
              alignment: Alignment(1, -0.2),
              child: Icon(Icons.home, size: 40, color: Colors.white),
            ),
            Align(
              alignment: Alignment.center,
              child: Icon(
                Icons.search,
                size: 30,
                color: Colors.white,
              ),
            ),
            Align(
              alignment: Alignment.bottomRight,
              child: Icon(
                Icons.settings_applications,
                size: 30,
                color: Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }

  buildStackPositioned() {
    return Center(
      child: Container(
        height: 400,
        width: 300,
        color: Colors.red,
        child: Stack(
          children: [
            const Positioned(
              left: 20,
              child: Icon(
                Icons.home,
                size: 40,
                color: Colors.white,
              ),
            ),
            const Positioned(
              left: 100,
              bottom: 0,
              child: Icon(
                Icons.search,
                size: 30,
                color: Colors.white,
              ),
            ),
            Positioned(
              right: 0,
              child: Icon(
                Icons.settings_applications,
                size: 30,
                color: Colors.amber.shade300,
              ),
            ),
          ],
        ),
      ),
    );
  }

  buildDemoNavBar() {
    return Column(
      children: [
        Container(
          height: 44,
          color: Colors.amber,
          child: const Center(
            child: Text('Hello Flutter'),
          ),
        ),
        Expanded(
          child: ListView.builder(
            itemBuilder: (context, index) {
              return Align(
                heightFactor: 2,
                alignment: const Alignment(-.7, 0),
                child: Text(
                  '${index + 1}. some text of history',
                  style: const TextStyle(fontSize: 32),
                ),
              );
            },
            itemCount: 20,
          ),
        ),
      ],
    );
  }
}

// 根据比例设置子元素的宽高比
class BuildAspectRatio extends StatelessWidget {
  const BuildAspectRatio({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      // width: 200,
      color: Colors.yellow,
      child: AspectRatio(
        aspectRatio: 3 / 1,
        child: Container(
          color: Colors.red,
        ),
      ),
    );
  }
}

class BuildCardDemo extends StatelessWidget {
  const BuildCardDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Card(
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(10)),
          ),
          elevation: 10,
          color: Colors.amber[500],
          margin: const EdgeInsets.all(10),
          shadowColor: Colors.red,
          child: const Column(
            children: [
              ListTile(
                title: Text(
                  'Mi',
                  style: TextStyle(fontSize: 28),
                ),
                subtitle: Text('High level Engine'),
              ),
              ListTile(
                title: Text('tel: 18712341234'),
              ),
              ListTile(
                title: Text('address: china'),
              )
            ],
          ),
        ),
        Card(
          elevation: 20,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          margin: const EdgeInsets.all(10),
          child: Column(
            children: [
              AspectRatio(
                aspectRatio: 20 / 9,
                child: Image.network(
                  "https://www.itying.com/images/flutter/2.png",
                  fit: BoxFit.cover,
                ),
              ),
              ListTile(
                leading: ClipOval(
                  child: Image.network(
                    "https://www.itying.com/images/flutter/2.png",
                    fit: BoxFit.cover,
                    height: 60,
                    width: 60,
                  ),
                ),
                title: const Text('Hello'),
                subtitle: const Text('World'),
              )
            ],
          ),
        ),
      ],
    );
  }
}

class BuildButton extends StatelessWidget {
  const BuildButton({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          ElevatedButton(
            onPressed: () {},
            child: const Text('normal button'),
          ),
          TextButton(onPressed: () {}, child: const Text('text button')),
          OutlinedButton(onPressed: () {}, child: const Text('border button')),
          IconButton(
            icon: const Icon(Icons.thumb_up),
            onPressed: () {},
          ),
          ElevatedButton.icon(
            icon: const Icon(Icons.send),
            label: const Text("发送"),
            onPressed: () {},
          ),
          OutlinedButton.icon(
            icon: const Icon(Icons.add),
            label: const Text("添加"),
            onPressed: () {},
          ),
          TextButton.icon(
            icon: const Icon(Icons.info),
            label: const Text("详情"),
            onPressed: () {},
          ),
          // 修改按钮的高度
          SizedBox(
            height: 80,
            width: 200,
            child: ElevatedButton(
              style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all(Colors.red),
                  foregroundColor: MaterialStateProperty.all(Colors.blue)),
              onPressed: () {},
              child: const Text('WidthHeight'),
            ),
          ),
          // 自适应按钮
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Expanded(
                child: Container(
                  height: 60,
                  margin: const EdgeInsets.all(10),
                  child: ElevatedButton(
                    child: const Text('auto button'),
                    onPressed: () {},
                  ),
                ),
              ),
            ],
          ),
          // 圆角按钮
          ElevatedButton(
            onPressed: () {},
            child: const Text('circle'),
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all(Colors.blue),
              foregroundColor: MaterialStateProperty.all(Colors.white),
              elevation: MaterialStateProperty.all(20),
              shape: MaterialStateProperty.all(RoundedRectangleBorder(borderRadius: BorderRadius.circular(20))),
            ),
          ),
          // 圆形按钮
          ElevatedButton(
            onPressed: () {},
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all(Colors.blue),
              foregroundColor: MaterialStateProperty.all(Colors.white),
              elevation: MaterialStateProperty.all(20),
              shape: MaterialStateProperty.all(
                const CircleBorder(
                  side: BorderSide(color: Colors.white),
                ),
              ),
            ),
            child: const Text('圆角'),
          ),
          // 修改outlineButton的边框
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Expanded(
                child: Container(
                  margin: const EdgeInsets.all(20),
                  height: 50,
                  child: OutlinedButton(
                      onPressed: () {},
                      style: ButtonStyle(
                        foregroundColor: MaterialStateProperty.all(Colors.black),
                        side: MaterialStateProperty.all(
                          const BorderSide(width: 1, color: Colors.red),
                        ),
                        shape: MaterialStateProperty.all(
                          RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                        ),
                      ),
                      child: const Text('register')),
                ),
              )
            ],
          ),
        ],
      ),
    );
  }
}
