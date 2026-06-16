import { Sidebar } from "@/components/layout";
import { CodeBlock, Callout } from "@/components/code-block";
import { motion } from "framer-motion";

export default function RestPage() {
  const sections = [
    { id: "principles", title: "REST Principles" },
    { id: "methods", title: "HTTP Methods" },
    { id: "status", title: "Status Codes" },
    { id: "auth", title: "Authentication (JWT)" },
    { id: "versioning", title: "API Versioning" },
  ];

  return (
    <div className="flex-1 flex max-w-7xl mx-auto w-full">
      <div className="flex-1 p-8 md:p-12 lg:px-16 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">REST Services</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Design and build robust, scalable APIs following Representational State Transfer constraints.
          </p>

          <section id="principles" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">REST Principles</h2>
            <p>
              REST (Representational State Transfer) is an architectural style for distributed hypermedia systems.
            </p>
            <Callout title="Core Constraints" type="info">
              <ul className="mt-2 space-y-1">
                <li><strong>Stateless:</strong> Each request from client to server must contain all info needed to understand the request.</li>
                <li><strong>Client-Server:</strong> Separation of concerns between UI and data storage.</li>
                <li><strong>Cacheable:</strong> Responses must define themselves as cacheable or not.</li>
                <li><strong>Uniform Interface:</strong> Standardized way of identifying and manipulating resources (URIs, JSON).</li>
              </ul>
            </Callout>
          </section>

          <section id="methods" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">HTTP Methods</h2>
            <p>
              REST maps CRUD (Create, Read, Update, Delete) operations to HTTP verbs.
            </p>
            <CodeBlock 
              language="http"
              title="HTTP Request Examples"
              code={`// Create a new resource
POST /api/users HTTP/1.1
Content-Type: application/json

{ "name": "Alice", "role": "admin" }

// Read a resource
GET /api/users/123 HTTP/1.1

// Full update
PUT /api/users/123 HTTP/1.1
Content-Type: application/json

{ "name": "Alice Smith", "role": "admin" }

// Partial update
PATCH /api/users/123 HTTP/1.1
Content-Type: application/json

{ "name": "Alice Smith" }

// Delete
DELETE /api/users/123 HTTP/1.1`}
            />
          </section>

          <section id="auth" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2 mb-6">Authentication (JWT)</h2>
            <p>
              JSON Web Tokens (JWT) are an open standard for securely transmitting information between parties as a JSON object. They are commonly used for stateless REST authentication.
            </p>
            
            <Callout title="Authorization Header" type="success">
              Always send the JWT in the HTTP headers, not the body or URL parameters.
              <br/><br/>
              <code>Authorization: Bearer &lt;token&gt;</code>
            </Callout>

            <CodeBlock
              language="java"
              title="Spring Boot JWT Filter Example"
              code={`@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) {
                                  
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            String username = jwtService.extractUsername(jwt);
            
            if (jwtService.isTokenValid(jwt, userDetails)) {
                // Set authentication in security context
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        filterChain.doFilter(request, response);
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
