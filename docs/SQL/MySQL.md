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

   **where支持的运算符**

   `=（等于）、!=（不等于）、<>（不等于）、<（小于）、<=（小于等于）、>（大于）、>=（大于等于）；`

   ***IN(set)；固定的范围值***

   ***BETWEEN…AND；值在什么范围***

   ***IS NULL；（为空） IS NOT NULL（不为空）***

   ***AND；与***

   ***OR；或***

   ***NOT；非***

   **LIKE: 模糊查询**

3. 删除数据

   `delete from 表名 [where 条件];`

   **删除满足条件的数据**: `delete from stu where score > 60;`

   **删除所有数据:**`delete from stu;`