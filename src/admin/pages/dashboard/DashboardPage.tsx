import ActivityFeed from "@/admin/components/ActivityFeed";
import { AdminTitle } from "@/admin/components/AdminTitle";
import Chart from "@/admin/components/Chart";
import QuickActions from "@/admin/components/QuickActions";
import StatCard from "@/admin/components/StatCard";
import { PageEnter } from "@/components/custom/PageEnter";
import {
  BarChart3,
  DollarSign,
  Eye,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "24,567",
    change: "+12.5% from last month",
    changeType: "positive" as const,
    icon: Users,
    color: "bg-navy",
  },
  {
    title: "Revenue",
    value: "$84,230",
    change: "+8.2% from last month",
    changeType: "positive" as const,
    icon: DollarSign,
    color: "bg-gold",
  },
  {
    title: "Orders",
    value: "1,429",
    change: "-2.4% from last month",
    changeType: "negative" as const,
    icon: ShoppingCart,
    color: "bg-navy",
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "+0.3% from last month",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "bg-gold",
  },
];

const chartData = [
  { label: "Desktop", value: 65 },
  { label: "Mobile", value: 28 },
  { label: "Tablet", value: 7 },
];

const performanceData = [
  { label: "Page Views", value: 24567 },
  { label: "Sessions", value: 18234 },
  { label: "Users", value: 12847 },
  { label: "Bounce Rate", value: 23 },
];

export const DashboardPage = () => {
  return (
    <PageEnter>
      <div className="animate-fade-up">
        <AdminTitle
          title="Panel de control"
          description="Aquí puedes ver el estado general de tu negocio."
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="animate-fade-up"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Charts and Activity Section */}
      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-fade-up"
        style={{ animationDelay: "280ms" }}
      >
        <div className="lg:col-span-2 space-y-6">
          <Chart title="Traffic Sources" data={chartData} />
          <Chart title="Performance Metrics" data={performanceData} />
        </div>

        <div className="space-y-6">
          <ActivityFeed />
          <QuickActions />
        </div>
      </div>

      {/* Additional Dashboard Section */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up"
        style={{ animationDelay: "380ms" }}
      >
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-navy">Top Pages</h3>
            <Eye size={20} className="text-gold" />
          </div>
          <div className="space-y-3">
            {[
              { page: "/dashboard", views: 2847, change: "+12%" },
              { page: "/products", views: 1923, change: "+8%" },
              { page: "/analytics", views: 1456, change: "+15%" },
              { page: "/settings", views: 987, change: "-3%" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p className="font-medium text-navy">{item.page}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.views.toLocaleString()} views
                  </p>
                </div>
                <span
                  className={`text-sm font-medium ${
                    item.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-navy">
              System Status
            </h3>
            <BarChart3 size={20} className="text-gold" />
          </div>
          <div className="space-y-4">
            {[
              {
                service: "API Server",
                status: "Online",
                uptime: "99.9%",
                color: "bg-green-500",
              },
              {
                service: "Database",
                status: "Online",
                uptime: "99.8%",
                color: "bg-green-500",
              },
              {
                service: "Cache Server",
                status: "Warning",
                uptime: "98.2%",
                color: "bg-yellow-500",
              },
              {
                service: "CDN",
                status: "Online",
                uptime: "99.9%",
                color: "bg-green-500",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <div>
                    <p className="font-medium text-navy">{item.service}</p>
                    <p className="text-sm text-muted-foreground">{item.status}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-navy">
                  {item.uptime}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageEnter>
  );
};
