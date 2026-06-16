import { Sidebar } from "@/components/layout";
import { CodeBlock, Callout } from "@/components/code-block";
import { motion } from "framer-motion";

export default function MySQLPage() {
  const sections = [
    { id: "intro", title: "Introduction to MySQL" },
    { id: "design", title: "Database Design" },
    { id: "crud", title: "CRUD Operations" },
    { id: "joins", title: "Advanced JOINs" },
    { id: "indexes", title: "Indexes & Performance" },
    { id: "transactions", title: "Transactions (ACID)" },
    { id: "jdbc", title: "Java Integration (JDBC)" },
  ];

  return (
    <div className="flex-1 flex max-w-7xl mx-auto w-full">
      <div className="flex-1 p-8 md:p-12 lg:px-16 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">MySQL & CRUD</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Master relational database design, write efficient queries, and integrate MySQL with Java applications.
          </p>

          <section id="intro" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">Introduction to MySQL</h2>
            <p>
              MySQL is a popular open-source relational database management system (RDBMS) that uses Structured Query Language (SQL). Data is organized into tables containing rows and columns.
            </p>
          </section>

          <section id="design" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">Database Design</h2>
            <p>
              Good database design ensures data integrity, reduces redundancy, and improves query performance. Normalization is the process of organizing data to minimize duplication.
            </p>
            <CodeBlock 
              language="sql"
              title="Schema Definition"
              code={`-- Create a users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a related table with a foreign key
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`}
            />
          </section>

          <section id="crud" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">CRUD Operations</h2>
            <p>
              CRUD stands for Create, Read, Update, and Delete - the four basic functions of persistent storage.
            </p>
            
            <Callout title="Create & Read" type="info">
              Use INSERT to add new rows. Use SELECT to retrieve data.
            </Callout>

            <CodeBlock 
              language="sql"
              title="CRUD Examples"
              code={`-- CREATE
INSERT INTO users (username, email) 
VALUES ('johndoe', 'john@example.com');

-- READ
SELECT id, username, email FROM users 
WHERE created_at >= '2024-01-01'
ORDER BY created_at DESC
LIMIT 10;

-- UPDATE
UPDATE users 
SET email = 'johndoe_new@example.com' 
WHERE username = 'johndoe';

-- DELETE
DELETE FROM users WHERE id = 5;`}
            />
          </section>

          <section id="joins" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">Advanced JOINs</h2>
            <p>
              JOINs combine rows from two or more tables based on a related column between them.
            </p>
            <CodeBlock 
              language="sql"
              title="INNER vs LEFT JOIN"
              code={`-- INNER JOIN: Returns records that have matching values in both tables
SELECT users.username, posts.title 
FROM users
INNER JOIN posts ON users.id = posts.user_id;

-- LEFT JOIN: Returns all records from the left table, and matched records from the right
SELECT users.username, posts.title 
FROM users
LEFT JOIN posts ON users.id = posts.user_id;`}
            />
          </section>

          <section id="jdbc" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">Java Integration (JDBC)</h2>
            <p>
              Java Database Connectivity (JDBC) is the Java API that manages connecting to a database, issuing queries and commands, and handling result sets.
            </p>
            <CodeBlock 
              language="java"
              title="JDBC Example"
              code={`import java.sql.*;

public class DatabaseExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydb";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?")) {
             
            stmt.setInt(1, 1);
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                System.out.println("User: " + rs.getString("username"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
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
