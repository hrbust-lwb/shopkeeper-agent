/**
 * 聊天消息气泡组件
 * 组合展示用户问题、智能体回复、执行流程和结果表格
 */
import { Bot, Copy, UserRound } from "lucide-react";
import { ResultTable } from "./ResultTable";
import { StepRail } from "./StepRail";
import { cn, formatTime, toClipboardText } from "../lib/format";
import type { ChatMessage } from "../types/agent";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  const copy = async () => {
    const text = message.result ? toClipboardText(message.result) : message.content;
    await navigator.clipboard.writeText(text);
  };

  return (
    <article className={cn("group flex gap-3 sm:gap-4", isUser && "justify-end")}>
      {!isUser && (
        <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand text-white shadow-line">
          <Bot className="h-4 w-4" aria-hidden="true" />
        </div>
      )}

      <div
        className={cn(
          "min-w-0 max-w-[920px] flex-1",
          isUser && "flex max-w-[760px] justify-end",
        )}
      >
        <div className={cn("min-w-0", isUser && "w-full")}>
          <div
            className={cn(
              "mb-2 flex items-center gap-2 px-1 text-xs text-muted",
              isUser && "justify-end",
            )}
          >
            <span className="font-semibold text-ink/80">{isUser ? "你" : "数据分析师"}</span>
            <span className="h-1 w-1 rounded-full bg-line" aria-hidden="true" />
            <span>{formatTime(message.createdAt)}</span>
            {!isUser && message.status !== "streaming" && (
              <button
                type="button"
                onClick={copy}
                className="ml-1 grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted opacity-0 outline-none transition hover:bg-canvas hover:text-ink focus:opacity-100 focus:ring-4 focus:ring-brand/10 group-hover:opacity-100"
                title="复制"
                aria-label="复制"
              >
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div
            className={cn(
              isUser
                ? "rounded-lg border border-brand/15 bg-brandLight px-5 py-4 text-black shadow-line"
                : "px-1 text-[15px] leading-7 text-ink",
            )}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>

          {message.error && (
            <div className="mt-3 rounded-lg border border-coral/20 bg-coral/5 px-3.5 py-3 text-sm text-coral">
              {message.error}
            </div>
          )}

          {!isUser && <StepRail steps={message.steps} />}
          {!isUser && message.result !== undefined && (
            <ResultTable data={message.result} />
          )}
        </div>
      </div>

      {isUser && (
        <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink text-white shadow-line">
          <UserRound className="h-4 w-4" aria-hidden="true" />
        </div>
      )}
    </article>
  );
}
