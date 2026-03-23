"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { useEffect, useState } from "react";

const apiBase =
  process.env.NEXT_PUBLIC_NEST_API_URL ?? "http://127.0.0.1:3000";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

async function loadUsersFromApi(baseUrl: string): Promise<User[]> {
  const res = await fetch(`${baseUrl}/users`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  const data: unknown = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Unexpected response shape from API.");
  }
  return data as User[];
}

const UsersDemoPage = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    loadUsersFromApi(apiBase)
      .then((rows) => {
        if (cancelled) {
          return;
        }
        setUsers(rows);
      })
      .catch((e: unknown) => {
        if (cancelled) {
          return;
        }
        setError(
          e instanceof Error
            ? e.message
            : "Could not reach nest-api. Is it running on port 3000?",
        );
        setUsers(null);
      })
      .finally(() => {
        if (cancelled) {
          return;
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const showList = !loading && error === null && (users?.length ?? 0) > 0;
  const showEmpty = !loading && error === null && users?.length === 0;

  return (
    <main className="p-8">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Users demo</CardTitle>
          <CardDescription>
            Data from{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-foreground text-xs">
              GET {apiBase}/users
            </code>
            . Start{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-foreground text-xs">
              nest-api
            </code>{" "}
            first (
            <code className="rounded bg-muted px-1 py-0.5 text-foreground text-xs">
              pnpm --filter nest-api dev
            </code>
            ).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <p className="text-muted-foreground text-sm">Loading users…</p>
          ) : null}
          {error !== null ? (
            <p className="text-destructive text-sm" role="alert">
              {error}
            </p>
          ) : null}
          {showEmpty ? (
            <p className="text-muted-foreground text-sm">No users returned.</p>
          ) : null}
          {showList ? (
            <ul className="divide-y rounded-md border">
              {(users ?? []).map((u) => (
                <li
                  className="flex flex-col gap-0.5 px-4 py-3 text-sm sm:flex-row sm:items-baseline sm:justify-between"
                  key={u.id}
                >
                  <div>
                    <span className="font-medium text-foreground">{u.name}</span>
                    <span className="text-muted-foreground"> — {u.role}</span>
                  </div>
                  <span className="text-muted-foreground">{u.email}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </CardContent>
      </Card>
    </main>
  );
};

export default UsersDemoPage;
