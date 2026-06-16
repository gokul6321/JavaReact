import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CodeBlock({ code, language, title }: { code: string; language: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-[#1e1e1e] my-6 font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/40">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">{language}</span>
          {title && <span className="text-xs text-white/80">{title}</span>}
        </div>
        <button
          onClick={handleCopy}
          className="text-white/50 hover:text-white transition-colors p-1 rounded"
          title="Copy code"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-gray-300">
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
}

export function Callout({ title, children, type = "info" }: { title: string; children: React.ReactNode; type?: "info" | "warning" | "success" }) {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/20 text-blue-200",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-200",
    success: "bg-green-500/10 border-green-500/20 text-green-200",
  };
  
  const headerStyles = {
    info: "text-blue-400",
    warning: "text-amber-400",
    success: "text-green-400",
  };

  return (
    <div className={`border rounded-lg p-5 my-6 ${styles[type]}`}>
      <h4 className={`font-semibold mb-2 flex items-center gap-2 ${headerStyles[type]}`}>
        {title}
      </h4>
      <div className="text-sm opacity-90 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
