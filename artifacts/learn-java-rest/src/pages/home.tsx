import { Link } from "wouter";
import { motion } from "framer-motion";
import { Code, Database, Server, Terminal, ArrowRight, BookOpen, Layers, Zap } from "lucide-react";

export default function Home() {
  const tracks = [
    {
      title: "Java Fundamentals",
      description: "Master object-oriented programming, data structures, and Java 8+ features like Streams and Lambdas.",
      icon: Code,
      href: "/java",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      topics: ["OOP Concepts", "Collections", "Exception Handling", "Generics", "Java 8 Features"],
    },
    {
      title: "REST Services",
      description: "Design robust, scalable APIs. Learn HTTP verbs, status codes, authentication, and architectural constraints.",
      icon: Server,
      href: "/rest",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      topics: ["HTTP Methods", "Status Codes", "Authentication (JWT)", "API Design", "Versioning"],
    },
    {
      title: "MySQL & CRUD",
      description: "Design databases and write efficient queries. Understand JOINs, indexes, transactions, and JDBC integration.",
      icon: Database,
      href: "/mysql",
      color: "text-teal-500",
      bg: "bg-teal-500/10",
      topics: ["Database Design", "SQL Syntax", "Advanced JOINs", "Transactions", "JPA/Hibernate"],
    },
    {
      title: "Microservices",
      description: "Decompose monolithic applications. Learn service discovery, API gateways, and inter-service communication.",
      icon: Terminal,
      href: "/microservices",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      topics: ["Decomposition", "API Gateway", "Service Discovery", "Docker basics", "Spring Boot"],
    },
  ];

  return (
    <div className="flex-1 w-full bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 border-b border-border">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>The Developer's Reference Guide</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-foreground">
              Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Backend Stack</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              A deeply technical, no-nonsense learning hub. 
              Real code, robust architectural patterns, and precise explanations designed for serious engineers.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/java" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Start Learning <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#tracks" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors">
                Explore Tracks
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tracks Grid */}
      <section id="tracks" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-12">
            <Layers className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Learning Tracks</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {tracks.map((track, i) => {
              const Icon = track.icon;
              return (
                <motion.div
                  key={track.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link href={track.href} className="group block h-full">
                    <div className="h-full border border-border bg-card rounded-xl p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-[100px]" />
                      
                      <div className={`w-12 h-12 rounded-lg ${track.bg} ${track.color} flex items-center justify-center mb-6`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{track.title}</h3>
                      <p className="text-muted-foreground mb-6 line-clamp-2">{track.description}</p>
                      
                      <div className="space-y-2">
                        {track.topics.map(topic => (
                          <div key={topic} className="flex items-center gap-2 text-sm text-foreground/80">
                            <CheckIcon className="w-4 h-4 text-primary" />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
