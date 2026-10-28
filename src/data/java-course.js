export const lessons = [
  {slug: 'basics', title: '01 · 从 JavaScript 到 Java', topic: '类型、变量、字符串', exerciseIds: ['price', 'strings']},
  {slug: 'control-flow', title: '02 · 条件、循环与方法', topic: '分支、累加、参数与返回值', exerciseIds: ['sum', 'shipping']},
  {slug: 'objects', title: '03 · 类、对象与接口', topic: '封装、构造器、接口契约', exerciseIds: ['wallet', 'interface']},
  {slug: 'collections', title: '04 · 集合与泛型', topic: 'List、Set、Map', exerciseIds: ['dedupe', 'count']},
  {slug: 'streams', title: '05 · Lambda 与 Stream', topic: '筛选、映射、聚合', exerciseIds: ['filter', 'total']},
  {slug: 'exceptions', title: '06 · 异常与业务边界', topic: '校验、异常、Optional', exerciseIds: ['validation', 'optional']},
  {slug: 'spring-boot', title: '07 · 第一个 Spring Boot API', topic: 'HTTP、Controller、Service、参数校验', exerciseIds: []},
  {slug: 'database-testing', title: '08 · 数据库与自动化测试', topic: 'JDBC、SQL、事务、接口测试', exerciseIds: []},
];

export const exercises = [
  {
    id: 'price', title: '计算折后价格', lesson: 'basics',
    task: '一件商品原价 12900 分，打八折后购买 2 件。用整数计算总价（单位：分），输出 20640。避免用浮点数表示本题的金额。',
    hints: ['先算单件折后价格，再乘数量。', '整数相除会截断小数；本题选择能整除的输入。实际支付需要明确舍入规则。'],
    expected: '20640',
    starter: `public class Main {
    public static void main(String[] args) {
        int priceInCents = 12900;
        int quantity = 2;
        int total = 0; // TODO: 打八折后的总价
        System.out.println(total);
    }
}`,
    solution: `public class Main {
    public static void main(String[] args) {
        int priceInCents = 12900;
        int quantity = 2;
        int total = priceInCents * 80 / 100 * quantity;
        System.out.println(total);
    }
}`,
  },
  {
    id: 'strings', title: '比较字符串内容', lesson: 'basics',
    task: '两个对象都保存 Java。修正比较方式，让程序判断内容是否相同并输出 true。保留两个 new String，观察引用比较与内容比较的区别。',
    hints: ['== 比较引用是否指向同一个对象。', 'String 的 equals 方法比较字符内容。'],
    expected: 'true',
    starter: `public class Main {
    public static void main(String[] args) {
        String first = new String("Java");
        String second = new String("Java");
        System.out.println(first == second); // TODO
    }
}`,
    solution: `public class Main {
    public static void main(String[] args) {
        String first = new String("Java");
        String second = new String("Java");
        System.out.println(first.equals(second));
    }
}`,
  },
  {
    id: 'sum', title: '封装一个累加方法', lesson: 'control-flow',
    task: '实现 sumTo(n)，返回 1 到 n 的整数之和。sumTo(5) 输出 15。再自行尝试 n=0 和 n=1。',
    hints: ['方法需要声明 int 返回类型。', 'for 循环从 1 开始，条件包含 n，最后返回累计值。'],
    expected: '15',
    starter: `public class Main {
    static int sumTo(int n) {
        int sum = 0;
        // TODO: 使用循环累加
        return sum;
    }
    public static void main(String[] args) {
        System.out.println(sumTo(5));
    }
}`,
    solution: `public class Main {
    static int sumTo(int n) {
        int sum = 0;
        for (int i = 1; i <= n; i++) sum += i;
        return sum;
    }
    public static void main(String[] args) {
        System.out.println(sumTo(5));
    }
}`,
  },
  {
    id: 'shipping', title: '实现免运费规则', lesson: 'control-flow',
    task: '订单满 9900 分免运费，否则运费 1000 分。实现 shipping，并分别输出 9800、9900 两个边界输入的运费，每行一个。',
    hints: ['比较符应包含 9900。', '方法应返回运费，不是订单总金额。'],
    expected: '1000\n0',
    starter: `public class Main {
    static int shipping(int amount) {
        return 0; // TODO
    }
    public static void main(String[] args) {
        System.out.println(shipping(9800));
        System.out.println(shipping(9900));
    }
}`,
    solution: `public class Main {
    static int shipping(int amount) {
        return amount >= 9900 ? 0 : 1000;
    }
    public static void main(String[] args) {
        System.out.println(shipping(9800));
        System.out.println(shipping(9900));
    }
}`,
  },
  {
    id: 'wallet', title: '给钱包添加业务约束', lesson: 'objects',
    task: '钱包初始余额为 100 分，存入 50 分后输出 150。实现 deposit：只有正数才能存入；零和负数应抛出 IllegalArgumentException。',
    hints: ['余额保持 private，只通过方法修改。', '先校验参数，再更新字段。可以自行调用 deposit(-1) 验证异常。'],
    expected: '150',
    starter: `public class Main {
    static class Wallet {
        private int balance = 100;
        void deposit(int amount) {
            // TODO
        }
        int balance() { return balance; }
    }
    public static void main(String[] args) {
        Wallet wallet = new Wallet();
        wallet.deposit(50);
        System.out.println(wallet.balance());
    }
}`,
    solution: `public class Main {
    static class Wallet {
        private int balance = 100;
        void deposit(int amount) {
            if (amount <= 0) throw new IllegalArgumentException("amount must be positive");
            balance += amount;
        }
        int balance() { return balance; }
    }
    public static void main(String[] args) {
        Wallet wallet = new Wallet();
        wallet.deposit(50);
        System.out.println(wallet.balance());
    }
}`,
  },
  {
    id: 'interface', title: '按接口替换实现', lesson: 'objects',
    task: '实现 Notifier 接口，让 ConsoleNotifier 的 message 方法返回 Hello, Java，再通过接口类型调用并输出。',
    hints: ['implements 表示实现接口。', '接口方法的实现需要是 public。'],
    expected: 'Hello, Java',
    starter: `public class Main {
    interface Notifier { String message(String name); }
    static class ConsoleNotifier implements Notifier {
        public String message(String name) {
            return "TODO";
        }
    }
    public static void main(String[] args) {
        Notifier notifier = new ConsoleNotifier();
        System.out.println(notifier.message("Java"));
    }
}`,
    solution: `public class Main {
    interface Notifier { String message(String name); }
    static class ConsoleNotifier implements Notifier {
        public String message(String name) { return "Hello, " + name; }
    }
    public static void main(String[] args) {
        Notifier notifier = new ConsoleNotifier();
        System.out.println(notifier.message("Java"));
    }
}`,
  },
  {
    id: 'dedupe', title: '去重并保留顺序', lesson: 'collections',
    task: '将 [Java, SQL, Java, HTTP] 去重，保留第一次出现的顺序，输出 [Java, SQL, HTTP]。',
    hints: ['普通 HashSet 不保证迭代顺序。', 'LinkedHashSet 记录插入顺序，可以用集合构造它。'],
    expected: '[Java, SQL, HTTP]',
    starter: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        List<String> skills = List.of("Java", "SQL", "Java", "HTTP");
        System.out.println(skills); // TODO
    }
}`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        List<String> skills = List.of("Java", "SQL", "Java", "HTTP");
        Set<String> unique = new LinkedHashSet<>(skills);
        System.out.println(unique);
    }
}`,
  },
  {
    id: 'count', title: '统计每个单词的次数', lesson: 'collections',
    task: '用 Map 统计 java、sql、java，按首次出现的顺序输出 {java=2, sql=1}。',
    hints: ['使用 LinkedHashMap 保留顺序。', 'getOrDefault(word, 0) 可以处理第一次出现的单词。'],
    expected: '{java=2, sql=1}',
    starter: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Map<String, Integer> counts = new LinkedHashMap<>();
        for (String word : List.of("java", "sql", "java")) {
            // TODO
        }
        System.out.println(counts);
    }
}`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Map<String, Integer> counts = new LinkedHashMap<>();
        for (String word : List.of("java", "sql", "java")) {
            counts.put(word, counts.getOrDefault(word, 0) + 1);
        }
        System.out.println(counts);
    }
}`,
  },
  {
    id: 'filter', title: '筛选并转换数据', lesson: 'streams',
    task: '将 [1,2,3,4,5,6] 中的偶数筛出后乘 10，输出 [20, 40, 60]。',
    hints: ['filter 接收返回 boolean 的条件。', 'map 做转换，toList 触发收集结果。'],
    expected: '[20, 40, 60]',
    starter: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        var result = List.of(1, 2, 3, 4, 5, 6).stream()
            // TODO: filter 和 map
            .toList();
        System.out.println(result);
    }
}`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        var result = List.of(1, 2, 3, 4, 5, 6).stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * 10)
            .toList();
        System.out.println(result);
    }
}`,
  },
  {
    id: 'total', title: '汇总已支付订单', lesson: 'streams',
    task: '订单金额单位为分。仅汇总 paid=true 的订单，输出 700。理解 record 生成的访问方法。',
    hints: ['filter(Order::paid) 先排除未支付订单。', 'mapToInt(Order::cents).sum() 可以得到整数总和。'],
    expected: '700',
    starter: `import java.util.*;
public class Main {
    record Order(int cents, boolean paid) {}
    public static void main(String[] args) {
        var orders = List.of(new Order(200, true), new Order(900, false), new Order(500, true));
        int total = 0; // TODO
        System.out.println(total);
    }
}`,
    solution: `import java.util.*;
public class Main {
    record Order(int cents, boolean paid) {}
    public static void main(String[] args) {
        var orders = List.of(new Order(200, true), new Order(900, false), new Order(500, true));
        int total = orders.stream().filter(Order::paid).mapToInt(Order::cents).sum();
        System.out.println(total);
    }
}`,
  },
  {
    id: 'validation', title: '把非法输入变成明确的异常', lesson: 'exceptions',
    task: '实现 requirePositive：对于非正数抛出 IllegalArgumentException，消息为 amount must be positive。main 中的 catch 应输出这条消息。',
    hints: ['throw 创建并抛出异常；throws 用在方法声明。', '不要在校验方法里吞掉异常，让调用方决定如何响应。'],
    expected: 'amount must be positive',
    starter: `public class Main {
    static void requirePositive(int amount) {
        // TODO
    }
    public static void main(String[] args) {
        try {
            requirePositive(-1);
            System.out.println("accepted");
        } catch (IllegalArgumentException error) {
            System.out.println(error.getMessage());
        }
    }
}`,
    solution: `public class Main {
    static void requirePositive(int amount) {
        if (amount <= 0) throw new IllegalArgumentException("amount must be positive");
    }
    public static void main(String[] args) {
        try {
            requirePositive(-1);
            System.out.println("accepted");
        } catch (IllegalArgumentException error) {
            System.out.println(error.getMessage());
        }
    }
}`,
  },
  {
    id: 'optional', title: '处理可能不存在的结果', lesson: 'exceptions',
    task: '返回列表中第一个以 J 开头的技能；不存在时返回 Not found。分别传入 Java/SQL 和 SQL/HTTP，输出 Java 与 Not found。',
    hints: ['findFirst 返回 Optional。', 'orElse 设置没有结果时的默认值，避免直接 get。'],
    expected: 'Java\nNot found',
    starter: `import java.util.*;
public class Main {
    static String firstJavaSkill(List<String> skills) {
        return "TODO";
    }
    public static void main(String[] args) {
        System.out.println(firstJavaSkill(List.of("Java", "SQL")));
        System.out.println(firstJavaSkill(List.of("SQL", "HTTP")));
    }
}`,
    solution: `import java.util.*;
public class Main {
    static String firstJavaSkill(List<String> skills) {
        return skills.stream().filter(s -> s.startsWith("J")).findFirst().orElse("Not found");
    }
    public static void main(String[] args) {
        System.out.println(firstJavaSkill(List.of("Java", "SQL")));
        System.out.println(firstJavaSkill(List.of("SQL", "HTTP")));
    }
}`,
  },
];

export const exerciseById = Object.fromEntries(exercises.map(exercise => [exercise.id, exercise]));
