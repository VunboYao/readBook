**查看MySQL的安装目录**：`show variables like "%char%";`

**查看MySQL数据库物理文件存放地址**：`show global variables like "%datadir%";`

## 链接 MySQL服务器

- `mysql -h127.0.0.1 -P3306 -uroot -proot`
  - `-h`：主机地址
  - `-P`: 端口号
  - `-u`: 用户名
  - `-p`: 用户密码

**如果MySQL服务器在本地，主机地址可以省略**

**如果服务器默认用3306端口，端口号可以省略**

最常用的方式：

**`mysql -h127.0.0.1 -uroot -p`**， 链接远程 MySQL 服务器，使用默认端口号3306

## 退出链接

- exit
- quit
- \q

## 显示数据库

`show databases;`

## 查看当前正在使用哪个库

`select database();`

## 数据库增删改查

1. 创建数据库

   **create database [if not exists] 数据库名称 [charset=字符集];**

   `create database [if not exists] person [charset='gbk'];`

- 查看数据库全局默认编码：`show variables like 'character_set_%';`

- 查看某个数据库的编码：`show create database person;`

- 特殊数据库名称处理：**create database if not exists \`create\` charset=utf8**;
  - *如果数据库的名称是SQL的关键字或者是一些特殊字符#~@\*&.., 这个时候就需要用反引号括起来*

2. 删除数据库

   `drop database [if exists] 数据库名称`

3. 修改数据库

   `alter database 数据库名称 charset=字符集`
   
   - 只能修改字符集：`alter database person  charset=utf8`
   
4. 查看数据库

   - `show databases;`

   - `show create database 数据库名称;`

## 表增删改查

对数据库的表进行操作的时候，都必须先告诉MySQL要操作哪一个数据库

- `use 数据库名称;`

1. 查看有哪些表

   `show tables;`

2. 查看表结构

   `desc 表名;`

3. 创建表

   ```mysql
   create table [if not exists] 表名(
     字段名称 数据类型,
     字段名称 数据类型,
     字段名称 数据类型,
     字段名称 数据类型
   );
   create table stu(
     id int,
     name text
   );
   ```

 4. 删除表

    `drop table [if exists] 表名;`

5. 修改表

   `rename table 原始名称 to 新的名称`

6. 添加字段

   - `alter table 表名 add 新增字段名称 新增字段数据类型 [位置];`
     - `alter table person add age int;`
     - *默认情况下会将新增字段放到原有字段的后面*
   - `alter table person add score float first;`
     - 通过指定`first`将新增的字段放到原有字段的前面

   -  `alter table person add phone int after name;`
     - 通过`after`指定新增字段放到哪个字段后面

7. 删除字段

   `alter table 表名 drop 字段名称;`

8. 修改字段的名称和数据类型

   - `alter table 表名 change 原始字段名称 新的字段名称 新的数据类型;`
     - `alter table student change age addr text;`

   

## 数据增删改查

1. 插入数据

   `insert into 表名 (字段名称1，字段名称2) values (值1，值2);`

   ```mysql
   create table if not exists stu(
   	id int,
   	name varchar(20)
   );
   
   insert into stu(id,name) values (1, 'yyb');
   # 在插入数据的时候指定的字段名称的顺序不用和表中的字段名称的顺序一致
   insert into stu(name,id) values('zs', 2);
   ```

   - 在插入数据的时候指定的取值顺序必须和指定的字段名称顺序一致
   - 如果插入数据时指定的取值顺序和表中的字段顺序是一致的，那么可以不指定字段名称
     - `insert into stu values(3, 'ls');`
   - 可通过`values`同时插入多条数据
     - `insert into stu values(4,'ww'),(5,'zl');`

2. 更新数据

   `update 表名 set 字段名称=值 [where 条件];`

   - 如果在更新数据的时候没有指定条件，那么就会更新整张表中的数据
     - `update stu set score=99;`
   - 如果在更新数据的时候指定了条件，那么只会更新满足条件的数据
     - `update stu set score=88 where name='ls';`
   - 在指定条件的时候, 我们可以通过AND来指定多个条件, AND===&&
     - `update stu set score=100 where name='yyb' && id=3;`

   - 在指定条件的时候, 我们可以通过OR来指定多个条件, OR===||
     - `update stu set score=66 where name='zs' || name='ww';`

   - 同时更新多个字段数据
     - `update stu set score=33,name='it666' where id=5;`

3. 查询数据

   `select 字段名称1，字段名称2 from 表名 [where 条件];`

   - *查询特定字段的数据*
     - `SELECT NAME FROM PERSON;`
   - 查询满足条件的数据
     - `SELECT id,name,score from person where score > 90;`
     - `SELECT id,name,score from person where score in (80,90,88);`

   **where支持的运算符**

   `=（等于）、!=（不等于）、<>（不等于）、<（小于）、<=（小于等于）、>（大于）、>=（大于等于）；`

   ***IN(set)；固定的范围值***

   ***BETWEEN…AND；值在什么范围***

   ***IS NULL；（为空） IS NOT NULL（不为空）***

   ***AND；与***

   ***OR；或***

   ***NOT；非***

   **LIKE: 模糊查询**

4. 删除数据

   `delete from 表名 [where 条件];`

   **删除满足条件的数据**: `delete from stu where score > 60;`

   **删除所有数据:**`delete from stu;`

## 数据类型

- 整形
- 浮点类型型
- 定点类型
- 字符类型
- 文本类型
- 枚举类型
- 集合类型
- 日期类型
- 布尔类型

### 整数类型

- TINYINT：1字节（-128， 127）（2，255） 小整数
- SMALLINT：2字节（-32 768，32 767）（0，65 535）大整数值
- MEDIUMINT: 3字节（-8 388 608， 8 388 607）（0，16 777 215）大整数值

- INT或INTEGER：4字节（-2 147 483 648，2 147 483 647）（0，4 294 967 295）大整数值
- BIGINT：8字节（-9 223 372 036 854 775 808，9 223 372 036 854 775 807）（0，18 446 744 073 709 551 615）极大整数值

**注意点**

- *MySQL中的整型和其它编程语言的整型一样, 也区分有符号和无符号*
  - *默认情况下整型就是有符号的*
  - *在数据类型的后面加上 unsigned 来将数据类型变成无符号的*

- *在设计数据库的时候一定要合理的使用数据类型*
  - *例如: 我们要保存一个人的年龄 (整数)*
  - *我们应该使用TINYINT类型, 因为人最多活到255岁已经上天了, 所以使用最小的整型即可*
  - *如果使用其它的整型, 就会造成资源浪费, 数据库体积变大, 效率变低...*
- *在保存数据的时候, 如果超出了当前数据类型的范围, 那么就会报错*
- *在设置整型的时候, 还可以设置整型数据将来显示的位宽*
  - *如果存储的数据没有指定的位宽宽, 那么就会自动**补空格或者0**, 如果大于或者等于了指定的位宽, 那么毛都不做*
  - *2020-2-3 -- 2020-02-03*

```mysql
create table person(
    id int,
    age tinyint
);
insert into person values (1, -128);
insert into person values (1, 127);
insert into person values (1, 128); #报错


create table person2(
    id int,
    age tinyint unsigned
);
insert into person values (1, -128); #报错
insert into person values (1, 127);
insert into person values (1, 128);


create table person3(
    id int,
    age tinyint(2) zerofill
);
insert into person values (1, 1);   #01
insert into person values (1, 12);  #12
insert into person values (1, 123); #123
```

### 浮点类型

- FLOAT(M, D)：4字节 单精度
- DOUBLE(M, D)：8字节 双精度
- m总位数， d小数位数

**float和double的区别**

- 占用存储空间大小不一样
- 默认保留的小数位数不同
- 保存数据的有效精度不同

**浮点类型特点**

- 和其编程语言中一样，浮点类型是不准确的
- *所以在企业开发中千万不要使用浮点数来保存用户的准确(珍贵)信息(RMB)*

```mysql
示例一: 默认保留的小数位数不同
create table person(
    id int,
    weight FLOAT,
    height DOUBLE
);
insert into person values (1, 1.12345678901234567890, 1.12345678901234567890);
weight: 1.12346
height: 1.1234567890123457

示例二: 手动指定小数的总位数和小数部分的位数
create table person2(
    id int,
    weight FLOAT(10, 6),
    height DOUBLE(10, 6)
);
insert into person2 values (1, 1.12345678901234567890, 1.12345678901234567890);
weight: 1.123457
height: 1.123457

示例三: 保存数据的有效精度也不同
create table person3(
    id int,
    weight FLOAT(20, 19),
    height DOUBLE(20, 19)
);
insert into person3 values (1, 1.12345678901234567890, 1.12345678901234567890);
weight: 1.123456-8357467651000
height: 1.123456789012345-7000
```

### 定点类型

用于存储小数，decimal(M, D)

- M总位数，D小数位数
- 定点类型的本质：是将数据分为两个部分来存储，每个部分都是整数。**所以定点类型不要滥用，非常消耗资源**

```mysql
create table person(
	id int,
	weight decimal(21, 12),
	height decimal(21, 12)
);

insert into person values(1,1.12345678901234567890, 1.12345678901234567890);

weight:1.123456789012
height:1.123456789012
```

### 字符类型

专门用于存储字符

- char(size): 0-255 字节 定长字符串
- varchar(size): 0-65535字节 变长字符串

**char和varchar区别**

- 能够保存数据的容量不一样

- char 不会回收多余的字符，要多少给多少

- varchar 会回收多余的字符，用多少给多少

  - 例如: 通过    char(2)存储存储数据'a', 存储的结果是' a';

  - 例如: 通过 varchar(2)存储存储数据'a', 存储的结果是'a';

```mysql
create table person(
    id int,
    name1 char(2),
    name2 varchar(2)
);
insert into person values (1, 'a', 'b');
insert into person values (1, '12', '34');
insert into person values (1, 'abc', 'def'); #只要超出申请的范围就会报错
```

**注意点**

- *由于是字符类型, 所以传递值建议用单引号''*
- *VARCHAR理论上可以存储65535个字符, 但是实际会随着当前数据库的字符集改变*

```mysql
create table person2(
    id int,
    name1 char(255),
    name2 varchar(255)
);
# 65535 / 3 = 21845, 由于utf8一个字符占用3个字节, 所以varchar在utf8的表中最多只能存储21845个字符
# 65535 / 2 = 32767, 由于gbk一个字符占用2个字节,所以varchar在gbk的表中最多只能存储32767个字符

create table person3(
    id int,
    name1 char(255),
    name2 varchar(65535)
)charset=gbk;
Column length too big for column 'name2' (max = 21845); use BLOB or TEXT instead
Column length too big for column 'name2' (max = 32767); use BLOB or TEXT instead
```

### 大文本类型

**MySQL中每一行存储的数据是有大小限制的, 每一行最多只能存储65534个字节**

```mysql
create table person(
    #name1 char(3),
    name2 varchar(21844) #在UTF8中相当于65535个字节
)charset=utf8;
# Row size too large. The maximum row size for the used table type, not counting BLOBs, is 65535. This includes storage overhead, check the manual. You have to change some columns to TEXT or BLOBs
```

- *TINYTEXT 0-255字节         短文本字符串*
- *TEXT     0-65535字节         长文本数据*
- *MEDIUMTEXT 0-16777215字节      中等长度文本数据*
- *LONGTEXT 0-4294967295字节    极大文本数据*

 ```MYSQL
 create table person2(
     name1 char(3),
     name2 TEXT #不会报错, 因为没有超出显示, 实际只占用10个字节
 )charset=utf8;
 ```

**大文本类型在表中并不会实际占用所能保存的字节数, 而是利用10个字节引用了实际保存数据的地址**

### 枚举类型

**和其他的编程语言一样，如果某个字段的取值只能是几个固定值中的一个，那么就可以使用枚举enum(val1,val2,...);**

```MYSQL
CREATE TABLE PERSON(
    id INT,
    gender enum('男', '女', '妖')
);
insert into person values (1, '火'); #会报错
insert into person values (1, '男'); #不会报错
insert into person values (2, '女'); #不会报错
insert into person values (3, '妖'); #不会报错
```

**注意点**

- MySQL中的枚举类型和其它的编程语言一样，底层都是使用整形来实现的

  - 和其他的编程语言不太一样的是，其他编程语言的枚举都是从0开始的，而MySQL的枚举是从1开始的

  `select gender+0 from person;`

- 由于MySQL的枚举底层是使用整形实现的，所以我们在赋值的时候除了可以赋值固定的几个值，还可以赋值对应的整数

  ```mysql
  insert into person values(4,1); # not error
  insert into person values(4,4); # error
  ```

### 集合类型

和编程开发中一样，如果某个字段的取值只能是几个固定值中的几个，那么就可以使用集合类型set(val1, val2, ...)

```mysql
create table person(
    id int,
    hobby set('basketball', 'soccer', 'football', 'golf')
);

insert into person values(1, 'soccer,football,golf'); // not error
insert into person values(2, 'baseball'); // error

insert into person values(1, 'soccer,football,golf'); # 14
insert into person values(2, 'basketball'); # 1
insert into person values(3,'soccer'); # 2
insert into person values(5, 'football'); # 4
```

**注意点**

- MySQL的集合类型也是使用整型来实现的
  - `select hobby + 0 from person;`

- MySQL的集合类型是按照2（n）的方式来实现的
  - 2（0）= 1
  - 2（1）= 2
  - 2（2）= 4
  - 2（3）= 8

### 布尔类型

用于保存真假

```mysql
create table person(
    id int,
    flag boolean
);
insert into person values (1, '男'); #会报错
insert into person values (1, true); #不会报错
insert into person values (2, false); #不会报错
```

**注意点**

- MySQL中的布尔类型也是使用整形来实现的，**0 表示假， 1 表示真**
  - 底层的本质是因为MySQL是使用C/C++来实现的，所以就是“非零即真”

```mysql
insert into person values (3, 1); #不会报错
insert into person values (4, 0); #不会报错
insert into person values (5, 2); #不会报错
```

### 日期类型

用于保存时间

- DATE    *3字节 YYYY-MM-DD  日期值*
- *TIME     3字节 HH:MM:SS  时间值或持续时间*
- *DATETIME 8字节 YYYY-MM-DD HH:MM:SS 混合日期和时间值*

**注意点：在存储时间的时候，需要用单引号将时间括起来**

```mysql
create table person(
    id int,
    filed1 DATE,
    filed2 TIME,
    filed3 DATETIME
);
insert into person values (1, '2020-02-02', '14:18:23', '2020-02-02 14:18:23');
```

## 数据库完整性

### 主键

1. 什么是数据库完整性？

    *保证保存到数据库中的数据都是正确的。*

2. 如何保证数据完整性？
   - 数据的完整性可以分为三类：实体完整性、域完整性、参照完整性
   - 无论是哪一种完整性都是在创建表时给表添加约束即可

3. 实体完整性

   1. 什么是实体？

      表中的一行数据就是一个实体（entity)

   2. 如何保存实体完整性？

      保证实体完整性就是保证每一行数据的唯一性

4. 实体完整性的约束类型
   - 主键约束（primary key)
   - 唯一约束(unique)
   - 自动增长列(auto_increment)

5. 主键约束（primary key)

   主键用于唯一标识表中的每一条数据，和现实生活中的身份证很像

   ```mysql
   CREATE table IF NOT EXISTS person(
   	id int PRIMARY key,
   	name varchar(20)
   );
   
   insert into person values(2,'yyb');
   insert into person values(3, 'yyb');
   ```

   **主键的特征**

   - 如果将某一个字段设置成了主键，那么这个字段的取值就**不能重复**了
   - 如果将某一个字段设置成了主键，那么这个字段的取值就不能是**null**

   - 一张表只能有一个主键，不能出现多个主键

     ```mysql
     CREATE table IF NOT EXISTS person2(
     	id int PRIMARY key,
     	name varchar(20) PRIMARY KEY # Multiple primary key defined
     );
     ```

   - 除了可以在字段数据类型后面添加 primary key ,将这个字段变成主键以外，还可以通过在最后写上 primary key（字段名称）的方式来指定主键

     ```mysql
     CREATE table IF NOT EXISTS person3(
       	id int,
         name varchar(20),
     	PRIMARY key(id) # 定义主键
     );
     
     insert into person3 values(1,'yyb');
     insert into person3 values(1,'yyb'); # Duplicate entry '1' for key 'person3.PRIMARY'
     ```

### 联合主键

1. 什么是联合主键？

   通过将表中的某个永远不重复的字段设置为主键，从而达到保证每一行数据的唯一性（实体完整性）。但是在企业中有时候我们可能找不到不重复的字段，此时可以通过**联合主键的方式**来保证每一行数据的唯一性

   **联合主键就是同时将多个字段作为一个主键来使用**

   ```mysql
   create table if not exists person (
   	name varchar(20),
   	age int,
   	primary key(name, age) # 联合主键
   );
   
   insert into person values('yyb',28);
   insert into person values('yyb',28); # Duplicate entry 'yyb-28' for key 'person.PRIMARY'
   ```

**注意点**

- 联合主键并不是添加多个主键，而是将多个字段的值作为主键来使用
- 也就是过去指定 id 为主键，那么 id 的取值不能重复
- 现在如果我们指定 name 和 age 为主键，那么 name + age 的值不能重复

### 唯一约束（unique）

唯一约束用于保证某个字段的值永远不重复

```mysql
create table if not exists person(
	id int unique,
	name varchar(20)
);
insert into person values(1, 'yyb');
insert into person values(1, 'yyb');
```

**主键和唯一键异同**：

- 唯一约束和主键约束一样，被约束的字段的取值都不能重复
- 主键在一张表中只能有一个，而唯一约束在一张表中可以有多个

```mysql
create table if not exists person(
	id int unique,
	name varchar(20) unique
);
insert into person values(2, 'yyb');
insert into person values(3, 'yyb'); # Duplicate entry 'yyb' for key 'person.name'
```

- 主键的取值不能为null，而唯一约束的取值可以是**Null**

### 自动增长约束（auto_increment）

自动增长约束的作用是让某个字段的取值从1开始递增，从而保证实体完整性

```mysql
CREATE TABLE IF NOT EXISTS PERSON(
	id int auto_increment,
	name varchar(20)
);
# Incorrect table definition; there can be only one auto column and it must be defined as a key
```

**注意点**

如果某个字段是自动增长的，那么这个字段必须是主键才可以

```mysql
CREATE TABLE IF NOT EXISTS PERSON(
	id int PRIMARY KEY auto_increment,
	name varchar(20)
);

insert into person values(null, 'yyb');
insert into person values(null, 'yyb');
insert into person values(null, 'yyb');
```

***如果仅仅是主键, 那么取值不能是null, 但是如果主键还是自动增长的, 那么取值就可以是null或者default***

在企业开发中应该如何选择主键：

- 最少性：能用一个字段作为主键，就不要使用多个字段
- 稳定性：能用不被操作(修改)的字段作为主键，就不要使用会被操作的字段作为主键
- 一般情况下会定义一个名称叫做id的字段，并且这个字段是整形的，并且这个字段是自动增长的来作为主键

### 修改约束

1. 如果修改约束

   1. 如何修改主键约束

      `alter table 表名 add primary key(字段);`

      ```mysql
      create table person(
      	id int,
      	name varchar(20)
      );
      
      alter table person add PRIMARY key(id);
      insert into person values(1,'yyb');
      ```

   2. 如何修改唯一约束

      `alter table 表名 add unique(字段);`

      ```mysql
      create table if not exists person2(
      	id int,
      	name varchar(20)
      );
      
      alter table person2 add unique(name);
      insert into person2 values(1,'yyb');
      ```

   3. 如何修改自动增长约束

      `alter table 表名 modify 字段名称 数据类型 auto_increment;`

      ```MYSQL
      create table if not exists person(
      	id int,
      	name varchar(20)
      );
      
      alter table person add PRIMARY key(id);
      alter table person modify id int auto_increment;
      insert into person values(null,'yyb');
      ```

### 域完整性

1. 什么是域？

   一行数据中的每个单元格都是一个域

2. 如何保证域的完整性？

   保证域的完整性就是保证每个单元格数据的正确性

   - 使用正确的数据类型
     - *人的年龄不可能超过255岁, 而且不能是负数, 所以我们就可以使用 TINYINT UNSIGNED*
     - *人的性别只能是男/女或者妖, 所以我们就可以使用枚举类型*
     - *要存储比较多的文字, 为了保证不超出每一行最大的存储限制, 我们就可以使用大文本类型*

   - 使用非空约束（not null)
   - 使用默认值约束（default）

   ```mysql
   create table if not exists person(
   	id int,
   	name varchar(20) not null
   );
   
   insert into person values(1, null); #  Column 'name' cannot be null
   
   
   create table if not exists person(
   	id int,
   	name varchar(20) default 'yyb'
   );
   insert into person values(1, null); # 显示为 null
   insert into person values(1, default); # 显示为 default
   ```

   **注意点：哪怕设置了默认值，传入null之后也不会使用默认值**

### 参照完整性

参照完整性又称引用完整性，主要用于保证多表之间引用关系的正确性

1. 为什么要创建多张表？

   *示例: 定义一张表保存2个学生3门课程的成绩*

   *| id | name | gender | km | score |*

   *| 1  | 张三 |   男   |语文|  100  |*

   *| 2  | 张三 |   男   |数学|   99  |*

   *| 3  | 张三 |   男   |英语|   98  |*

   *| 4  | 李四 |   女   |语文|   60  |*

   *| 5  | 李四 |   女   |数学|   59  |*

   *| 6  | 李四 |   女   |英语|   58  |*

   如果将所有的数据都放到一张表中, 会出现大量冗余数据

   所以为了降低数据库的体积, 提升数据库的效率, 我们需要根据自身需求对表进行拆分

   ```mysql
   |--------------------|      |-----------------------|
   | id | name | gender |      | id | km | score | uid |
   | 1  | 张三 |   男   |       |  1 |语文|  100  |  1  |
   | 2  | 李四 |   女   |       |  2 |数学|   99  |  1  |
   |--------------------|      |  3 |英语|   98  |  1  |
                               |  4 |语文|   60  |  2  |
                               |  5 |数学|   59  |  2  |
                               |  6 |英语|   58  |  2  |
                               |-----------------------|
   ```

2. 什么时候会出现冗余数据？

   表与表之间的关系可以分为三种：一对一、一对多、多对多

   1. 一对一（一般不需要拆分）：一夫一妻制

      ```mysql
      |-----------------------------|
      | id | name | gender | mateId |
      | 1  | 张三 |   男   |    2   |
      | 2  | 李四 |   女   |    1   |
      | 3  | 王五 |   男   |    4   |
      | 4  | 赵六 |   女   |    2   |
      |-----------------------------|
      ```

   2. 一对多（一般需要拆分）

      - 一个人有多个汽车
      - 一个班有多个学生
      - 一个人有多门成绩

      ```mysql
      |---------------------------------|
      | id | name | gender | km | score |
      | 1  | 张三 |   男   |语文|  100  |
      | 2  | 张三 |   男   |数学|   99  |
      | 3  | 张三 |   男   |英语|   98  |
      | 4  | 李四 |   女   |语文|   60  |
      | 5  | 李四 |   女   |数学|   59  |
      | 6  | 李四 |   女   |英语|   58  |
      |---------------------------------|
      
      |--------------------|      |-----------------------|
      | id | name | gender |      | id | km | score | uid |
      | 1  | 张三 |   男   |       |  1 |语文|  100  |  1  |
      | 4  | 李四 |   女   |       |  2 |数学|   99  |  1  |
      |--------------------|      |  3 |英语|   98  |  1  |
                                  |  4 |语文|   60  |  2  |
                                  |  5 |数学|   59  |  2  |
                                  |  6 |英语|   58  |  2  |
                                  |-----------------------|
      ```

   3. 多对多(一般需要拆分)

      - 一个学生有多个老师，一个老师有多个学生

      ```mysql
      |--------------------------------------------|
      | id | stuName | gender | teacherName | 性别 |
      | 1  |   张三  |   男   |     王五    |  男  |
      | 2  |   张三  |   男   |     赵六    |  女  |
      | 3  |   张三  |   男   |     周七    |  男  |
      | 4  |   李四  |   女   |     王五    |  男  |
      | 5  |   李四  |   女   |     赵六    |  女  |
      | 6  |   李四  |   女   |     周七    |  男  |
      |--------------------------------------------|
      
      |-----------------------|  |---------------------|   |-----------------------|
      | id | stuName | gender |  | stuId  | teacherId  |   | id | stuName | gender |
      | 1  |   张三  |   男   |   |    1   |     1      |   | 1  |   王五  |   男   |
      | 2  |   李四  |   女   |   |    1   |     2      |   | 2  |   赵六  |   女   |
      |-----------------------|  |    1   |     3      |   | 3  |   周七  |   男   |
                                 |    2   |     1      |   |-----------------------|
                                 |    2   |     2      |
                                 |    2   |     3      |
                                 |---------------------|
      ```

### 如何保证参照完整性

默认情况下表与表之间是独立存在的，不会相互影响。也正是因为如此，默认情况下也不会检查表与表之间的依赖关系。**所以为了保证表与表之间参照完整性，我们可以通过“外键”来保证参照完整性**

```mysql
create table if not exists stu(
	id int auto_increment primary key,
	name varchar(20),
	gender enum('male','female','demon')
);

create table if not exists grade(
	id int auto_increment primary key,
	km varchar(20),
	score double,
	uid int
);

insert into stu values(null, 'zs', 'male');
insert into stu values(null, 'ls', 'female');

insert into grade values(null, 'chinese', 100, 1);
insert into grade values(null, 'math', 99, 1);
insert into grade values(null, 'english', 98, 1);
insert into grade values(null, 'chinese', 100, 3);
insert into grade values(null, 'math', 99, 3);
insert into grade values(null, 'english', 98, 3);
```

1. 什么是外键?

   如果一张表中有一个字段指向了另一张表中的主键，就将该字段叫做外键

   例如：成绩表中的uid引用了学生表中的id，那么成绩表中的uid我们就称之为外键

```mysql
|--------------------|      |-----------------------|
| id | name | gender |      | id | km | score | uid |
| 1  | 张三 |   男   |       |  1 |语文|  100  |  1  |
| 2  | 李四 |   女   |       |  2 |数学|   99  |  1  |
|--------------------|      |  3 |英语|   98  |  1  |
                            |  4 |语文|   60  |  2  |
                            |  5 |数学|   59  |  2  |
                            |  6 |英语|   58  |  2  |
                            |-----------------------|
```

```mysql
create table if not exists grade(
	id int auto_increment primary key,
	km varchar(20),
	score double,
	uid int,
	foreign key(uid) references stu(id) # 外键的引用
);

insert into grade values(null, 'chinese', 91, 1);
insert into grade values(null, 'math', 91, 1);
insert into grade values(null, 'english', 91, 1); 
insert into grade values(null, 'chinese', 100, 3); # error
insert into grade values(null, 'math', 100, 3); # error
```

2. 外键注意点：
   - 只有InnoDB的存储引擎才支持外键约束
   - 外键的数据类型必须和指向的主键一样
   - 在一对多的关系中，外键一般定义在多的一方（一个学生多门成绩，那么外键定义在成绩表中）
   - **定义外键的表我们称之为从表，被外键引用的表我们称之为主表**

3. 创建表时定义外键

   **foreign key（外键字段名称） references 主表名称（主表主键名称）**

### 动态添加外键

`alter table 从表名称 add foreign key（外键字段名称）references 主表名称(主表主键名称);`

```mysql
create table grade(
	id int auto_increment primary key,
	km varchar(20),
	score double,
	uid int
);
insert into grade values (null, '语文', 100, 3);
alter table grade add foreign key(uid) references stu(id);
insert into grade values(null, 'chinese', 100, 3); # error
```

### 查看外键

`show create table 从表名称;`

**show create table grade;**

```mysql
CREATE TABLE `grade` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`km` VARCHAR ( 20 ) DEFAULT NULL,
	`score` DOUBLE DEFAULT NULL,
	`uid` INT DEFAULT NULL,
	PRIMARY KEY ( `id` ),
	KEY `uid` ( `uid` ),
CONSTRAINT `grade_ibfk_1` FOREIGN KEY ( `uid` ) REFERENCES `stu` ( `id` ) 
) ENGINE = INNODB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

#注意点：
CONSTRAINT `grade_ibfk_1` FOREIGN KEY ( `uid` ) REFERENCES `stu` ( `id` )
	# 将uid变成外键，外键的名称是grade_ibfk_1
	# uid的取值引用的是 stu 这张表中的id字段值
```

### 删除外键

`alter table 从表名称 drop foreign key 外键名称;`

```mysql
alter table grade drop foreign key grade_ibfk_1;
insert into grade values (null, '语文', 100, 3);
```

### 外键的操作

1. 严格操作：（前面的操作都是严格操作）
   - 主表不存在对应数据，从表不允许添加
     - `insert into grade values(null, 'chinese', 100, 3);`
   - 从表引用着数据，主表不允许删除
     - `delete from stu from where id=1;`
   - 从表引用着数据，主表不允许修改
     - `update stu set id=3 where id=1;`

2. 置空操作（null）

   - 在企业开发中，我们必须要删除主表中的数据，但是如果主表被删除了从表就不完整
   - 所以在企业开发中，可以通过置空操作，在删除主表的同时删除从表关联的数据

   ```mysql
   create table grade2 (
   	id int auto_increment primary key,
   	km varchar(20),
   	score double,
   	uid int,
   	foreign key(uid) references stu(id) on delete set null
   );
   
   insert into grade2 values(null, 'chinese', 100,1);
   delete from stu where id = 1;
   ```

3. 级联操作（cascade):

   - 在企业开发中，我们可能必须要修改主表中的数据，但是如果主表被修改了从表就不完整了
   - 所以在企业开发中，我们可以通过 “级联操作”，在修改主表数据的同时修改从表关联的数据

   ```mysql
   create table grade3(
       id int auto_increment primary key,
       km varchar(20),
       score double,
       uid int,
       foreign key(uid) references stu(id) on update cascade
   );
   insert into grade3 values (null, '语文', 100, 1);
   update stu set id=1 where id=3;
   ```

### 多对多外键

```mysql
        学生表                     关系表                     教师表
|-----------------------|  |---------------------|   |-----------------------|
| id | stuName | gender |  | stuId  | teacherId  |   | id | stuName | gender |
| 1  |   张三  |   男   |   |    1   |     1      |   | 1  |   王五  |   男   |
| 2  |   李四  |   女   |   |    1   |     2      |   | 2  |   赵六  |   女   |
|-----------------------|  |    1   |     3      |   | 3  |   周七  |   男   |
                           |    2   |     1      |   |-----------------------|
                           |    2   |     2      |
                           |    2   |     3      | 
```

```mysql
create table if not exists stu(
	id int auto_increment primary key,
	name varchar(20),
	gender enum('male', 'female', 'demon')
);

insert into stu values(null, 'zs', 'male');
insert into stu values(null, 'ls', 'female');

create table if not exists teacher(
	id int auto_increment primary key,
	name varchar(20),
	gender enum('male', 'female', 'demon')
);

insert into teacher values(null, 'ww', 'male');
insert into teacher values(null, 'zl', 'female');
insert into teacher values(null, 'zq', 'male');

create table rel(
	stuId int,
	teacherId int
);

insert into rel values(1,1);
insert into rel values(1,2);
insert into rel values(1,3);
insert into rel values(2, 1);
insert into rel values(2, 2);
insert into rel values(2, 3);


alter table rel add foreign key(stuId) REFERENCES stu(id);
alter table rel add foreign key(teacherId) REFERENCES teacher(id);

insert into rel values(3, 1); # error
insert into rel values(1, 4); # error
```

## 单表查询

- `select * from 表明;` 查询表中所有数据
- `select 字段1，字段2 from 表名;` 查询表中指定字段数据
- `select [* || 字段] from 表名 [where 条件];` 查询表中满足条件的数据

1. 结果集

   - 通过查询语句查询出来的结果，称为结果集	

   - 结果集以表的形式将查询的结果返回给我们

2. 注意点：

   - 结果集返回的表和查询的表不是同一张表

   - 被查询的表是真实存在的，是存储在磁盘上的

   - 而结果集不是真实存在的，是存储到内存中的

3. 如何给结果集的字段别名？

   - 查询指定字段数据时，可以通过as给指定的字段取别名

   - `select name as myName, age as myAge from stu;`

4. 什么是字段表达式？

   查询数据的时候，除了可以查询指定字段的数据以外，还可以查询表达式的结果

   `select 6+6;`

5. 什么是伪表？
   - 字段表达式虽然能够查询出表达式的结果，但是不符合MySQL的规范
   - 可通过伪表（dual）的方式让字段表达式符合MySQL的规范
   - `select 6+6 from dual;`

### 模糊查询

格式：`select 字段 from 表名 where 字段 like '条件';`

- `_`通配符：表示任意一个字符
- `%`通配符：表示任意`0~n`个字符

```
a_c: abc/adc
abc,adc,abbc,ac

_a_c:1abc/3adc
1abc,abc1,2abbc,3adc

a%c: abc/adc/abbc/ac
abc,adc,abbc,ac

%a%c:1abc/2abbc/3adc
1abc,abc1,2abbc,3adc

select * from stu where name like 'z_';
select * from stu where name like 'z__';
select * from stu where name like 'z_%';
```

### 排序 order by

- `select 字段 from 表名 order by 字段 [asc | desc];`
- `select * from stu order by age;` 默认按照升序进行排序
- `select * from stu order by asc;` 升序排序
- `select * from stu order by age desc;` 降序排序

- **`select * from stu order by age desc, score asc;`** 如果年龄相同，那么还可以继续按照其它字段来排序

### 聚合函数

1. `count()` 统计
   - `select count(*) from stru`;
   - `select count(*) from stu where score >= 60;`
2. `sum()`求和
   - `select sum(id) from stu;`

3. `avg()`求平均值
   - `select avg(id) from stu;`
   - `select avg(score) from stu;`

4. `max()`获取最大值
   - `select max(score) from stu;`

5. `min()` 获取最小值
   - `select min(score) from stu;`

**数值类**

1. `rand()` 生成随机数
   - `select rand() from dual;`
   - `select * from stu order by rand();`

2. `round()`四舍五入
   - `select round(3.1) from dual;`
   - `select round(3.5) from dual;`

3. `ceil()` 向上取整
   - `select ceil(3.1) from dual;`

4. `floor()`向下取整
   - `select floor(3.9) from dual;`

5. `truncate()`截取小数位
   - `select truncate(3.123457, 2) from dual;`

**字符串类**

1. `ucase()`转换为大写
   - `select ucase('hello world') from dual;`

2. `lcase()`转换为小写
   - `select lcase('HELLO WORLD') from dual;`

3. `left()`从左边开始截取到指定的位置
   - `select left('1234567890', 3) from dual;`

4. `right()`从右边开始截取到指定的位置
   - `select right('1234567890', 3) from dual;`

5. `substring()`从指定位置开始截取指定字符
   - `select substring('1234567890', 3, 5) from dual;`

### 数据分组 group by

`select 分组字段 || 聚合函数 from 表名 group by 分组字段;`

- 需求：需求统计表中一共有多少个城市

  - `select city from student;` 查询所有的

  - `select city from student group by address;` 去重

- 需求：要求统计每个城市有多少个
  - `select city, count(*) from stu group by city;`

- **注意点**
  - 在对数据进行分组的时候，`select `后面**必须是分组字段或者聚合函数，否则就只会返回第一条数据**
  - `select address from student group by address;`
  - `select address, GROUP_CONCAT(name) from student group by address;`

### 条件查询having

- having 和 where 很像，都是用来做条件查询的
- where是去数据库中查询符合条件的数据，而 having 是去结果集中查询符合条件的数据

```mysql
select * from student where address="北京";
select * from student having address="北京";

select name, age from student where address="北京";
select name, age from student having address="北京"; #Unknown column 'address' in 'having clause'

需求：select address from student group by address;
需求：select address, avg(age) as average from student group by address
需求：select address, avg(age) as average from student group by address having average >= 20;
```

### 分页limit

`select 字段 from 表 limit 索引，个数;`

### 查询选项

`select [查询选项] 字段名称 from 表名;`

- all: 显示所有查询出来的数据【模式】
- distinct: 去除结果集中重复的数据之后再显示

```mysql
select name from student;
select all name from student;
select distinct name from student;
```

**注意点**

- 如果是通过distinct来对结果集中重复的数据进行去重，那么只有所有列的数据都相同才会去重

- `select name, age from student;`
- `select distinct name, age from student;`

### 完整的查询语句

`select [查询选项] 字段名称 [from 表名] [where 条件] [order by 排序] [group by 分组] [having 条件] [limit 分页];`

