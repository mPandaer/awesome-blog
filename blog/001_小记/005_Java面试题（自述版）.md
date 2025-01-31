# Java 热门面试题 200道
```tasks
not done
path includes Java面试题
```
## 第一天 
在10道面试题中，有两个面试题你没有任何思路，他们是：
- [ ] Java中ConcurrentHashMap1.7和1.8之间有哪些区别？
- [ ] JDK1.8对HashMap除了红黑树的改动还进行了哪些改动？
***
AI的评价：
![](images/Pasted%20image%2020250131134623.png)
### 说说Java中HashMap的原理
HashMap是对数据结构Hash表的实现，存储的元素是**键值对**的形式，大致的过程是这样的，当我们添加一个元素到HashMap中的时候，会先计算key的hashCode，然后利用hashCode找到对应的数组下标，如果这个下标上没有元素的话就直接存储，如果有就会利用链表法来解决Hash冲突。从HashMap中取出元素的过程大致相同。核心就是通过key的hashCode找到对应的数组下标。
> 更多内容：[说说 Java 中 HashMap 的原理？ - Java 热门面试题 200 道 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1860871861809897474/question/1834107117591187457#heading-5)
- [ ] 读一读HashMap的源码，先问问AIHashMap的重点有哪些，然后带着目标去读，去验证
### Java中ConcurrentHashMap1.7和1.8之间有哪些区别？
答：不知道
答案：[Java 中 ConcurrentHashMap 1.7 和 1.8 之间有哪些区别？ - Java 热门面试题 200 道 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1860871861809897474/question/1780933294813114369?screen=full#heading-0)
### 为什么JDK1.8对HashMap进行了红黑树的改动
我认为是优化极端情况下，HashMap的存取性能。
[为什么 JDK 1.8 对 HashMap 进行了红黑树的改动？ - Java 热门面试题 200 道 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1860871861809897474/question/1780933294771171329#heading-0)
### JDK1.8对HashMap除了红黑树的改动还进行了哪些改动？
答：不知道
答案：[JDK 1.8 对 HashMap 除了红黑树还进行了哪些改动？ - Java 热门面试题 200 道 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1860871861809897474/question/1780933294775365634#heading-1)
### Java中有哪些集合类？请简单介绍
Java中的集合类大致分为三类，一类是List，一类是Set，一类是Map。List可以存储重复的数据，而Set不能存储重复的数据，Map存储的是键值对类型的数据。
List中最常用的有ArrayList，LinkedList，并发安全的有CopyOnWriteArrayList
Set最常用的有HashSet，LinkedHashSet，TreeSet。
Map最常用的有HashMap，LinkedHashMap，TreeMap。并发安全的容器有ConcurrentHashMap
更多内容：[Java 中有哪些集合类？请简单介绍 - Java 热门面试题 200 道 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1860871861809897474/question/1780933294699868162#heading-1)
### MySQL索引的最左匹配原则是什么？
这个原则主要是用在复合索引上面的，比如我们有一个复合索引 (a,b) 当我们根据条件a查询的时候，因为字段a与复合索引(a,b)符合前缀匹配，所以这次的条件查询就可以使用这个复合索引进行快速查询。
更多内容：[MySQL 索引的最左前缀匹配原则是什么？ - Java 热门面试题 200 道 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1860871861809897474/question/1780933295450648578)
- [ ] 要理解为什么可以使用这个联合索引 提示：B+树的排序特性
### 数据库的脏读，不可重复读和幻读分别是什么？
脏读：有两个并发的事务，事务A修改了某条数据的内容，并没有完成提交，事务B就可以看见修改后的内容
不可重复读：在并发的事务中，事务B查看了某条数据的内容，事务A将这条数据进行更新并提交了，事务B再次执行同样的查询时，看见的是修改后的数据内容
幻读：在并发的事务中，事务B查询了某个范围内的数据，长度为10，事务A插入了一条数据在这个范围并提交。事务B再次执行相同的范围查询时，会得到这个新的数据。
更多内容：[数据库的脏读、不可重复读和幻读分别是什么？ - Java 热门面试题 200 道 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1860871861809897474/question/1780933295496785922#heading-0)
- [ ] 理解MySQL中不同隔离级别是如何实现的？
### MySQL的存储引擎有哪些？他们之间有什么区别？
我知道的有三个，一个是InnoDB,一个是MyISAM，一个是Memory。
InnoDB支持行锁，支持事务
MyISAM不支持行锁，不支持事务
Memory的数据存储在内存中
[MySQL 的存储引擎有哪些？它们之间有什么区别？ - Java 热门面试题 200 道 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1860871861809897474/question/1780933295433871361#heading-0)
### MySQL的覆盖索引是什么？
覆盖索引指的是，这一次查询的字段数据在索引上都有，比如要查询(name,age)这两列的数据，而恰好有一个索引 (name,age),在这个索引上就有这两列的内容了，就不需要额外的回表。
***
标准答案：MySQL的覆盖索引(Covering Index)是指二级索引中包含了查询所需的所有字段，从使查询可以仅通过访问二级索引l而不需要访问实际的表数据（主键索引）。
[MySQL 的覆盖索引是什么？ - Java 热门面试题 200 道 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1860871861809897474/question/1780933295454842881#heading-0)
- [ ] 看面试题的目的，有两个一个是了解整个后端领域的重点内容，一个是学会如何更加优雅的表达
### MySQL的索引类型有哪些？
- 索引性质
	1. 主键索引
	2. 普通索引
	3. 唯一索引
	4. 联合索引
- 数据结构
	1. B+树索引
	2. 哈希索引
	3. 倒排索引
	4. R-树索引
- 基于InnoDB B+树的索引角度看
	1. 聚簇索引
	2. 非聚簇索引
[MySQL 的索引类型有哪些？ - Java 热门面试题 200 道 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1860871861809897474/question/1780933295438065665#heading-0)


