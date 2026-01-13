import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";
import { clearAdminErrorLogs, getAdminErrorLogs } from "@/hooks/useAdminAuth";

type AdminErrorLog = {
  timestamp: string;
  context: string;
  message: string;
  stack?: string;
};

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

export function ErrorLogViewer() {
  const { isRTL } = useLanguage();
  const [logs, setLogs] = useState<AdminErrorLog[]>([]);

  const hasLogs = logs.length > 0;

  const refresh = () => {
    const list = getAdminErrorLogs();
    // show newest first
    setLogs([...list].slice(-20).reverse());
  };

  useEffect(() => {
    refresh();
    // lightweight auto-refresh so new errors appear without reload
    const t = window.setInterval(refresh, 4000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const header = useMemo(
    () => (isRTL ? "سجل الأخطاء (آخر 20)" : "Error Logs (Last 20)"),
    [isRTL]
  );

  return (
    <section className="glass-card rounded-2xl p-6" aria-labelledby="admin-error-logs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 id="admin-error-logs" className="text-lg font-bold text-foreground">
            {header}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {isRTL
              ? "الأخطاء تُحفظ محليًا لتسهيل التشخيص."
              : "Errors are stored locally to help debugging."}
          </p>
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={refresh} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            {isRTL ? "تحديث" : "Refresh"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              clearAdminErrorLogs();
              refresh();
            }}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {isRTL ? "مسح" : "Clear"}
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      {!hasLogs ? (
        <p className="text-sm text-muted-foreground">
          {isRTL ? "لا يوجد أخطاء مسجلة." : "No errors recorded."}
        </p>
      ) : (
        <ScrollArea className="h-[340px]">
          <div className="space-y-3">
            {logs.map((l, idx) => (
              <details key={`${l.timestamp}-${idx}`} className="rounded-xl bg-muted/30 p-3">
                <summary className="cursor-pointer list-none">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="font-mono">
                          {l.context}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(l.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-foreground mt-2 break-words">
                        {l.message}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {isRTL ? "تفاصيل" : "Details"}
                    </span>
                  </div>
                </summary>

                {l.stack ? (
                  <pre className="mt-3 text-xs whitespace-pre-wrap break-words text-muted-foreground font-mono">
                    {l.stack}
                  </pre>
                ) : null}
              </details>
            ))}
          </div>
        </ScrollArea>
      )}
    </section>
  );
}
