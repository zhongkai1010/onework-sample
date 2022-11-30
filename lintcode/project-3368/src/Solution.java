import java.util.*;

class Solution {

    /**
     * 在 Solution 类中有一个 sortByLength 方法，它可以接收 Main 类输入流传输的字符串数组 strArr，通过调用该方法可以实现对字符串的排序，排序的条件是根据数组中每个字符串的长度进行从小到大排序，相同长度的字符串，根据对应的下标进行排序。
     * 请你使用 Lambda 表达式，尝试通过使用 Arrays 类的 sort 方法来实现排序，并在 sortByLength 方法中将结果进行输出。
     * he see a ball
     * a
     * he
     * see
     * ball
     *
     * @param strArr 参数
     * @return 排序结果
     */
    public void sortByLength(String[] strArr) {
        // write your code here

        Arrays.stream(strArr).sorted(Comparator.comparingInt(String::length)).forEach(System.out::println);
    }
}
