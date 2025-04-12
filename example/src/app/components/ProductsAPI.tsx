"use client";

import { useState, useEffect } from "react";

interface ApiResponse {
  timestamp?: string;
  message?: string;
  error?: string;
  id?: number;
  name?: string;
  price?: number;
  description?: string;
}

export default function ProductsAPI() {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [endpoint, setEndpoint] = useState("/api/hello");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 拉取API数据
  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(endpoint);
      const data = await res.json();

      setResponse(data);
    } catch (err) {
      setError("获取API数据时出错");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return (
    <div>
      <div className="mb-4">
        <label
          htmlFor="endpoint"
          className="block text-text-primary font-medium mb-2"
        >
          选择API端点:
        </label>
        <select
          id="endpoint"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          className="block w-full border-secondary-dark rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="/api/hello">GET /api/hello</option>
          <option value="/api/products">GET /api/products</option>
          <option value="/api/products?id=1">GET /api/products?id=1</option>
          <option value="/api/products/1">GET /api/products/1</option>
          <option value="/api/products/2">GET /api/products/2</option>
        </select>
      </div>

      <div className="mt-8 bg-secondary border border-secondary-dark rounded p-4">
        <h3 className="text-lg font-semibold mb-2 text-text-primary">
          API 响应:
        </h3>
        <pre className="bg-white p-3 rounded border overflow-x-auto">
          {response ? JSON.stringify(response, null, 2) : "加载中..."}
        </pre>
      </div>

      <div className="flex justify-between mb-4">
        <button
          onClick={fetchData}
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "加载中..." : "刷新数据"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
    </div>
  );
}
