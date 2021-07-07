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

