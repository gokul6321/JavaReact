import { Sidebar } from "@/components/layout";
import { CodeBlock, Callout } from "@/components/code-block";
import { motion } from "framer-motion";

export default function MicroservicesPage() {
  const sections = [
    { id: "intro", title: "What are Microservices?" },
    { id: "decomposition", title: "Service Decomposition" },
    { id: "gateway", title: "API Gateway Pattern" },
    { id: "discovery", title: "Service Discovery" },
    { id: "communication", title: "Inter-Service Comm" },
    { id: "circuit", title: "Circuit Breaker" },
    { id: "spring", title: "Spring Boot Microservices" },
  ];

  return (
    <div className="flex-1 flex max-w-7xl mx-auto w-full">
      <div className="flex-1 p-8 md:p-12 lg:px-16 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">Microservices Architecture</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Design distributed systems that are independently deployable, scalable, and resilient.
          </p>

          <section id="intro" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">What are Microservices?</h2>
            <p>
              Microservices architecture structures an application as a collection of loosely coupled, independently deployable services. Unlike a monolithic architecture where all components are tightly integrated into a single codebase, microservices separate functionality into distinct domains.
            </p>
            <Callout title="Monolith vs Microservices" type="info">
              While monoliths are simpler to develop initially, microservices offer better scalability, fault isolation, and allow teams to work independently using different technology stacks.
            </Callout>
          </section>

          <section id="gateway" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">API Gateway Pattern</h2>
            <p>
              An API Gateway is a server that acts as an API front-end, receiving API requests, enforcing throttling and security policies, passing requests to the back-end service and then passing the response back to the requester.
            </p>
            <CodeBlock 
              language="yaml"
              title="Spring Cloud Gateway Configuration"
              code={`spring:
  cloud:
    gateway:
      routes:
        - id: user_service
          uri: lb://USER-SERVICE
          predicates:
            - Path=/api/users/**
          filters:
            - StripPrefix=1
        - id: order_service
          uri: lb://ORDER-SERVICE
          predicates:
            - Path=/api/orders/**
          filters:
            - StripPrefix=1`}
            />
          </section>

          <section id="communication" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">Inter-Service Communication</h2>
            <p>
              Services need to communicate. This can be synchronous (HTTP/REST, gRPC) or asynchronous (Message Queues like RabbitMQ, Kafka).
            </p>
            
            <Callout title="Synchronous vs Asynchronous" type="warning">
              Avoid long chains of synchronous calls. They create tight coupling and increase latency and failure probability. Prefer event-driven asynchronous communication where possible.
            </Callout>

            <CodeBlock 
              language="java"
              title="Feign Client (Synchronous)"
              code={`@FeignClient(name = "user-service")
public interface UserClient {
    
    @GetMapping("/users/{id}")
    UserDto getUserById(@PathVariable("id") Long id);
    
}`}
            />
          </section>

          <section id="circuit" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">Circuit Breaker Pattern</h2>
            <p>
              The Circuit Breaker pattern prevents an application from repeatedly trying to execute an operation that's likely to fail. If a service is down, the circuit opens and requests fail fast instead of hanging.
            </p>
            <CodeBlock 
              language="java"
              title="Resilience4j Circuit Breaker"
              code={`@Service
public class OrderService {

    @CircuitBreaker(name = "inventoryService", fallbackMethod = "fallbackInventory")
    public boolean checkInventory(String productId) {
        return inventoryClient.checkStock(productId);
    }
    
    // Fallback method called when circuit is open
    public boolean fallbackInventory(String productId, Exception e) {
        log.error("Inventory service is down. Falling back.");
        return false; // Default safe value
    }
}`}
            />
          </section>

          <section id="spring" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">Spring Boot Microservices</h2>
            <p>
              Spring Boot and Spring Cloud provide a comprehensive ecosystem for building microservices in Java, offering tools for configuration management, service discovery (Eureka), and API gateways.
            </p>
          </section>

        </motion.div>
      </div>
      <Sidebar sections={sections} />
    </div>
  );
}
