"""
Embedding 客户端管理器
"""
import asyncio
from typing import List, Optional
import httpx
from langchain_core.embeddings import Embeddings

from app.conf.app_config import EmbeddingConfig, app_config


class TEIEmbedding(Embeddings):
    """自定义TEI Embedding，直接调用原生/embed接口，不需要langchain-openai"""
    def __init__(self, endpoint: str):
        self.endpoint = endpoint

    async def aembed_query(self, text: str) -> List[float]:
        async with httpx.AsyncClient() as client:
            resp = await client.post(f"{self.endpoint}/embed", json={"inputs": text}, timeout=30)
            resp.raise_for_status()
            return resp.json()[0]

    async def aembed_documents(self, texts: List[str]) -> List[List[float]]:
        async with httpx.AsyncClient() as client:
            resp = await client.post(f"{self.endpoint}/embed", json={"inputs": texts}, timeout=30)
            resp.raise_for_status()
            return resp.json()

    def embed_query(self, text: str) -> List[float]:
        # 同步接口
        import httpx
        with httpx.Client() as client:
            resp = client.post(f"{self.endpoint}/embed", json={"inputs": text}, timeout=30)
            resp.raise_for_status()
            return resp.json()[0]

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        import httpx
        with httpx.Client() as client:
            resp = client.post(f"{self.endpoint}/embed", json={"inputs": texts}, timeout=30)
            resp.raise_for_status()
            return resp.json()


class EmbeddingClientManager:
    def __init__(self, config: EmbeddingConfig):
        self.client: Optional[Embeddings] = None
        self.config = config

    def _get_url(self) -> str:
        return f"http://{self.config.host}:{self.config.port}"

    def init(self):
        endpoint = self._get_url()
        self.client = TEIEmbedding(endpoint)


embedding_client_manager = EmbeddingClientManager(app_config.embedding)


if __name__ == "__main__":
    embedding_client_manager.init()
    client = embedding_client_manager.client

    async def test():
        text = "什么是深度学习？"
        query_result = await client.aembed_query(text)
        print(query_result[:3])

    asyncio.run(test())
