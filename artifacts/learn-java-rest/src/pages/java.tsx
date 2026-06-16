import { Sidebar } from "@/components/layout";
import { CodeBlock, Callout } from "@/components/code-block";
import { motion } from "framer-motion";

export default function JavaPage() {
  const sections = [
    { id: "oop", title: "Object-Oriented Programming" },
    { id: "data-types", title: "Data Types & Variables" },
    { id: "control-flow", title: "Control Flow" },
    { id: "collections", title: "Collections Framework" },
    { id: "generics", title: "Generics" },
    { id: "exceptions", title: "Exception Handling" },
    { id: "java8", title: "Java 8+ Features" },
  ];

  return (
    <div className="flex-1 flex max-w-7xl mx-auto w-full">
      <div className="flex-1 p-8 md:p-12 lg:px-16 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">Java Fundamentals</h1>
          <p className="text-xl text-muted-foreground mb-12">
            A comprehensive reference to the core Java language, designed for professional engineers.
          </p>

          <section id="oop" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">Object-Oriented Programming</h2>
            <p>
              Java is fundamentally object-oriented. Every application consists of classes that define behavior and state. The four pillars of OOP in Java are Encapsulation, Inheritance, Polymorphism, and Abstraction.
            </p>
            
            <Callout title="Key Concept: Encapsulation" type="info">
              Encapsulation bundles data (variables) and code (methods) into a single unit, and restricts direct access to some of the object's components to prevent unintended interference.
            </Callout>

            <CodeBlock 
              language="java"
              title="BankAccount.java"
              code={`public class BankAccount {
    // Private fields (Encapsulation)
    private String accountNumber;
    private double balance;

    // Constructor
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    // Public getters and setters
    public double getBalance() {
        return this.balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }
}`}
            />
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Inheritance & Polymorphism</h3>
            <p>
              Inheritance allows a class to inherit properties and methods from another class. Polymorphism allows methods to do different things based on the object that it is acting upon.
            </p>
            <CodeBlock 
              language="java"
              title="CheckingAccount.java"
              code={`// Inheritance using 'extends'
public class CheckingAccount extends BankAccount {
    private double overdraftLimit;

    public CheckingAccount(String accountNumber, double balance, double overdraftLimit) {
        super(accountNumber, balance); // Call parent constructor
        this.overdraftLimit = overdraftLimit;
    }

    // Polymorphism: Overriding parent method
    @Override
    public void deposit(double amount) {
        super.deposit(amount);
        System.out.println("Checking account deposit processed.");
    }
}`}
            />
          </section>

          <section id="collections" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">Collections Framework</h2>
            <p>
              The Java Collections Framework provides a set of interfaces and classes to store and manipulate groups of objects.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>List:</strong> Ordered collection (e.g., ArrayList, LinkedList).</li>
              <li><strong>Set:</strong> Collection with no duplicates (e.g., HashSet, TreeSet).</li>
              <li><strong>Map:</strong> Key-value pairs (e.g., HashMap, TreeMap).</li>
            </ul>

            <CodeBlock
              language="java"
              title="CollectionsDemo.java"
              code={`import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {
        // List (ArrayList)
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        
        // Map (HashMap)
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 88);
        
        // Iterating over a Map
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`}
            />
          </section>

          <section id="java8" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">Java 8+ Features</h2>
            <p>
              Java 8 introduced functional programming concepts, significantly changing how we write Java. Streams and Lambdas allow for declarative processing of collections.
            </p>

            <Callout title="Streams API" type="success">
              A Stream represents a sequence of elements and supports different operations to perform computations upon those elements in a pipeline.
            </Callout>

            <CodeBlock
              language="java"
              title="StreamExample.java"
              code={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Eve");

        // Filter, map, and collect using Streams
        List<String> longNames = names.stream()
            .filter(name -> name.length() > 3)
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        System.out.println(longNames); // [ALICE, CHARLIE, DAVID]
    }
}`}
            />
          </section>

        </motion.div>
      </div>
      <Sidebar sections={sections} />
    </div>
  );
}
