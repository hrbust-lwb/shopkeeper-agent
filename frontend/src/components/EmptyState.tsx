/**
 * 首页空状态组件
 * 展示产品入口信息和可点击的示例问数问题
 */
import { ArrowUpRight, BarChart3, Sparkles } from "lucide-react";

type EmptyStateProps = {
  examples: string[];
  onUseExample: (example: string) => void;
};

export function EmptyState({ examples, onUseExample }: EmptyStateProps) {
  return (
    <div className="mx-auto flex min-h-full max-w-5xl flex-col justify-center px-4 py-12 lg:py-16">
      <div className="mb-9 flex items-start gap-4 sm:items-center sm:gap-5">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-ink text-white shadow-panel">
          <BarChart3 className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brandLight px-3 py-1.5 text-xs font-semibold text-brand">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Shopkeeper Agent
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-[0.01em] text-ink sm:text-5xl">
            电商问数
          </h1>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
        快捷提问
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {examples.map((example, index) => (
          <button
            key={example}
            type="button"
            onClick={() => onUseExample(example)}
            className="group flex min-h-20 items-start gap-3 rounded-lg border border-line bg-surface px-4 py-4 text-left text-[15px] leading-6 text-ink shadow-line transition hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-brand/10"
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-canvas font-mono text-[11px] font-semibold text-muted transition group-hover:bg-brandLight group-hover:text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1">{example}</span>
            <ArrowUpRight
              className="mt-1 h-4 w-4 shrink-0 text-muted/35 transition group-hover:text-brand"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
