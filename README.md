# warehouse-desktop

**Status:** Runnable scaffold (ERPNext password login)  
**Kind:** Electron + Vite + React  
**Backend:** `inventory_plus`  
**Package:** `@zatgo/warehouse-desktop`  
**Stack:** [FRONTEND_STACK](../../Docs/Foundation/FRONTEND_STACK.md)

## Auth

Sign in with ERPNext / Frappe **site URL + email/password**. Login runs in the Electron main process via `@zatgo/erpnext`.

Use **Continue offline** to browse without a site.

## Run

```bash
pnpm install
pnpm --filter @zatgo/warehouse-desktop dev
```

Vite port: **5179**. Default site URL: `https://erp.zatgo.online`.
