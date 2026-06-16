import { Link, useLocation } from "wouter";
import { BookOpen, Code, Database, Server, Menu, X, Terminal, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./theme-provider";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const links = [
    { href: "/java", label: "Java Fundamentals", icon: Code },
    { href: "/rest", label: "REST Services", icon: Server },
    { href: "/mysql", label: "MySQL & CRUD", icon: Database },
    { href: "/microservices", label: "Microservices", icon: Terminal },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">DevLearn</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-muted-foreground hover:bg-muted"
              title="Toggle theme"
            >
              <div className="w-5 h-5 flex items-center justify-center font-bold">
                {theme === "dark" ? "D" : "L"}
              </div>
            </button>
            <button
              className="md:hidden p-2 text-muted-foreground hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col relative">
        {children}
      </main>
    </div>
  );
}

export function Sidebar({ sections }: { sections: { id: string; title: string }[] }) {
  return (
    <aside className="hidden lg:block w-64 shrink-0 border-l border-border bg-card/50 p-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <h4 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">On this page</h4>
      <nav className="flex flex-col gap-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
          >
            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-4" />
            {section.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}
