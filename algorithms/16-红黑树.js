/*
二叉树：
  - 平衡树
  - 非平衡树
  - 树的平衡：红黑树。 难难难

红黑树：
  1 节点是红色或黑色
  2 根节点是黑色
  3 每个叶子节点都是黑色的空节点(NIL节点）
  4 每个红色节点的两个字节点都是黑色的。（从每个叶子到根的所有路径上不能有两个连续的红色节点）
  5 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点

  - 相对平衡
    - 从根到叶子的最长可能路径，不会超过最短可能路径的两倍
    - 特性4:决定了路径不能有两个相连的红色节点
    - 最短的可能路径都是黑色节点
    - 最长的可能路径是红色和黑色交替
    - 特性5:所有路径都有相同数目的黑色节点
    - 表明了没有路径能多余任何其他路径的两倍长

  - 变色
    - 新插入的节点，一般是红色的。
    - 如果插入黑色节点，必然会导致一条路径上多了黑色节点。很难调整
    - 红色节点可能导致出现红红相连的情况，这种情况可以通过颜色调换和旋转来调整
  - 左旋转
  - 右旋转
*/

