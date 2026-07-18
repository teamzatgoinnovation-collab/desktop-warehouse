"use client";

import { useEffect, useState } from "react";
import { ZatGoApi } from "@zatgo/erpnext";
import { callZatGoApi } from "@/lib/call-zatgo-api";

const PRODUCT = ZatGoApi.warehouse.ping;
const LIST = ZatGoApi.warehouse.stockList;
const TITLE = "Warehouse";

export function HomePage() {
  const [status, setStatus] = useState<string>("Loading…");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        await callZatGoApi(PRODUCT);
        const env = await callZatGoApi<unknown[]>(LIST, { page: 1, page_size: 20 });
        if (cancelled) return;
        const rows = Array.isArray(env.data) ? env.data.length : 0;
        setCount(typeof env.meta?.total === "number" ? Number(env.meta.total) : rows);
        setStatus(env.meta?.stub ? "Connected (API stub — no DocTypes yet)" : "Connected");
      } catch (e) {
        if (!cancelled) setStatus(e instanceof Error ? e.message : "API error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Warehouse</h1>
      <p className="text-sm text-[var(--color-muted-foreground)]">Status: {status}</p>
      {count !== null ? (
        <p className="text-sm text-[var(--color-muted-foreground)]">Records: {count}</p>
      ) : null}
    </div>
  );
}
