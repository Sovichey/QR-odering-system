"use client";

import {
  DollarSign,
  Users,
  ClipboardCheck,
  Timer,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRestaurant } from "@/context/RestaurantContext";
import { formatCurrency, formatTimestamp } from "@/lib/utils/helpers";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

function KPICard({ title, value, subtitle, icon, trend }: KPICardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <p
            className={cn(
              "text-xs font-medium mt-1",
              trend.positive ? "text-emerald-600" : "text-red-600",
            )}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { metrics, orders, completedOrders } = useRestaurant();

  // Combine all orders for history table
  const allOrders = [...orders, ...completedOrders].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  const statusConfig = {
    Pending: {
      className: "bg-amber-100 text-amber-800 border-amber-200",
    },
    Preparing: {
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    Completed: {
      className: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
              <div className="h-8 md:h-10 w-8 md:w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <LayoutDashboard className="h-4 md:h-5 w-4 md:w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg md:text-2xl font-bold text-foreground truncate">
                  Admin Dashboard
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground truncate">
                  Restaurant overview and analytics
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 md:gap-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors flex-shrink-0 text-xs md:text-sm px-2 md:px-3"
              onClick={onLogout}
            >
              <LogOut className="h-3 md:h-4 w-3 md:w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Today's Revenue"
            value={formatCurrency(metrics.todayRevenue)}
            subtitle="Total earnings today"
            icon={<DollarSign className="h-5 w-5 text-primary" />}
            trend={{ value: "12% from yesterday", positive: true }}
          />
          <KPICard
            title="Active Tables"
            value={metrics.activeTables}
            subtitle="Currently ordering"
            icon={<Users className="h-5 w-5 text-primary" />}
          />
          <KPICard
            title="Orders Completed"
            value={metrics.totalOrdersCompleted}
            subtitle="Total today"
            icon={<ClipboardCheck className="h-5 w-5 text-primary" />}
            trend={{ value: "8% from yesterday", positive: true }}
          />
          <KPICard
            title="Avg. Prep Time"
            value={`${metrics.averagePrepTime} min`}
            subtitle="Kitchen efficiency"
            icon={<Timer className="h-5 w-5 text-primary" />}
            trend={{ value: "2 min faster", positive: true }}
          />
        </div>

        {/* Order History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto rounded-md border">
              <div className="h-[400px] overflow-y-auto">
                <table className="w-full min-w-max">
                  <thead className="sticky top-0 bg-background">
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left text-sm font-medium text-foreground whitespace-nowrap w-[120px]">
                        Order ID
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-foreground whitespace-nowrap">
                        Table #
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-foreground whitespace-nowrap">
                        Items
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-foreground whitespace-nowrap">
                        Total
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-foreground whitespace-nowrap">
                        Time
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-foreground whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-2 font-mono text-sm whitespace-nowrap">
                          {order.id.slice(0, 12).toUpperCase()}
                        </td>
                        <td className="px-4 py-2 font-medium whitespace-nowrap">
                          {order.tableNumber || "-"}
                        </td>
                        <td className="px-4 py-2 text-sm text-muted-foreground">
                          <span className="truncate block max-w-[200px]">
                            {order.items && order.items.length > 0
                              ? order.items
                                  .map(
                                    (item) =>
                                      `${item.quantity}x ${item.mealName}`,
                                  )
                                  .join(", ")
                              : "No items"}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-right font-medium whitespace-nowrap">
                          {formatCurrency(order.totalPrice)}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground whitespace-nowrap">
                          {formatTimestamp(order.createdAt)}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Badge
                            variant="secondary"
                            className={statusConfig[order.status].className}
                          >
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
