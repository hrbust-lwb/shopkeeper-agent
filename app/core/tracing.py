"""
Langfuse 全链路追踪配置

为每次 LangGraph 查询创建独立的 Langfuse 回调配置。LangGraph 会把同一个
回调沿执行链传给根图、所有节点以及节点内的 LangChain/LLM 调用，从而生成
完整的 trace -> node -> generation 层级。
"""

import os
import uuid
from pathlib import Path
from typing import Any

from dotenv import load_dotenv

# 当前模块也可能先于应用配置被导入，这里主动加载项目 .env 以保证 Langfuse
# 凭证在创建回调前已经进入环境变量。
project_root = Path(__file__).parents[2]
load_dotenv(project_root / ".env")

TRACE_NAME = "shopkeeper-agent-query"
TRACE_TAGS = ["shopkeeper-agent", "langgraph"]


def is_langfuse_enabled() -> bool:
    """仅在显式开启且凭证完整时启用 Langfuse，避免本地无凭证启动报错。"""

    tracing_enabled = os.getenv("LANGFUSE_TRACING_ENABLED", "true").lower()
    return (
        tracing_enabled not in {"false", "0", "no", "off"}
        and bool(os.getenv("LANGFUSE_PUBLIC_KEY"))
        and bool(os.getenv("LANGFUSE_SECRET_KEY"))
    )


def build_langfuse_config(request_id: str) -> dict[str, Any]:
    """构建一次图执行的 Langfuse RunnableConfig。"""

    metadata: dict[str, Any] = {
        "request_id": request_id,
    }
    if not is_langfuse_enabled():
        return {"metadata": metadata}

    # 延迟导入，确保 tracing_enabled=false 或无凭证时不会初始化 Langfuse 客户端。
    from langfuse.langchain import CallbackHandler

    trace_context = None
    try:
        # HTTP 中间件生成的 request_id 是 UUID，去掉连字符后可同时作为 Langfuse trace_id。
        trace_context = {"trace_id": uuid.UUID(request_id).hex}
    except (AttributeError, TypeError, ValueError):
        pass

    metadata.update(
        {
            "langfuse_trace_name": TRACE_NAME,
            "langfuse_tags": TRACE_TAGS,
        }
    )

    return {
        "callbacks": [CallbackHandler(trace_context=trace_context)],
        "metadata": metadata,
        "run_name": TRACE_NAME,
        "tags": TRACE_TAGS,
    }
