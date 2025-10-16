import {
  ArrowLeft,
  TrendingUp,
  Users,
  Sparkles,
  Download,
  BarChart3,
  Activity,
} from "lucide-react";
import type { Language } from "../types";
import { translate } from "../utils/translations";
import { analyticsData } from "../data/trendData";

interface AdminDashboardProps {
  language: Language;
  onBack: () => void;
}

export const AdminDashboard = ({ language, onBack }: AdminDashboardProps) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 lg:mb-12">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 sm:gap-3 text-white/60 hover:text-white text-lg sm:text-2xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-amber-100">
              {translate("admin.title", language)}
            </h1>
          </div>

          <button className="flex items-center gap-2 sm:gap-3 bg-amber-600 hover:bg-amber-500 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl lg:rounded-2xl transition-all text-white text-base sm:text-lg lg:text-xl">
            <Download className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">Download Report</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            icon={<Users className="w-6 h-6 sm:w-8 sm:h-8" />}
            title={translate("admin.sessions", language)}
            value={analyticsData.weeklyStats.totalSessions.toLocaleString()}
            trend={`+${analyticsData.weeklyStats.weeklyGrowth}%`}
            positive
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />}
            title={translate("admin.conversion", language)}
            value={`${analyticsData.weeklyStats.conversionRate}%`}
            trend="+5.2%"
            positive
          />
          <StatCard
            icon={<Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />}
            title="Avg. Wishlist"
            value={analyticsData.weeklyStats.avgWishlistSize.toString()}
            trend="+0.8"
            positive
          />
          <StatCard
            icon={<Activity className="w-6 h-6 sm:w-8 sm:h-8" />}
            title="Avg. Duration"
            value={`${analyticsData.weeklyStats.avgSessionDuration}m`}
            trend="+0.3m"
            positive
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-light text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              {translate("admin.trending", language)}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {Object.entries(analyticsData.styleTrends)
                .sort(([, a], [, b]) => b - a)
                .map(([style, percentage]) => (
                  <div key={style} className="space-y-2">
                    <div className="flex justify-between text-white/80 text-sm sm:text-base lg:text-lg">
                      <span className="capitalize">
                        {translate(`style.${style}`, language)}
                      </span>
                      <span className="font-medium text-amber-400">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 sm:h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-light text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              {translate("admin.celebrities", language)}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {Object.entries(analyticsData.celebrityTrends)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 4)
                .map(([celeb, percentage]) => (
                  <div key={celeb} className="space-y-2">
                    <div className="flex justify-between text-white/80 text-sm sm:text-base lg:text-lg">
                      <span className="capitalize truncate">
                        {celeb === "deepika"
                          ? "Deepika"
                          : celeb === "zendaya"
                          ? "Zendaya"
                          : celeb === "alia"
                          ? "Alia"
                          : celeb === "taylor"
                          ? "Taylor"
                          : "Blake"}
                      </span>
                      <span className="font-medium text-amber-400">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 sm:h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-rose-600 to-pink-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-light text-white mb-4 sm:mb-6">
              Conversion Funnel
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {analyticsData.conversionFunnel.map((stage) => (
                <div key={stage.stage}>
                  <div className="flex justify-between text-white/80 text-sm sm:text-base mb-2">
                    <span>{stage.stage}</span>
                    <span className="font-medium">{stage.percentage}%</span>
                  </div>
                  <div className="relative">
                    <div
                      className="h-8 sm:h-10 bg-gradient-to-r from-amber-600 to-amber-400 rounded transition-all duration-500"
                      style={{ width: `${stage.percentage}%` }}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-xs sm:text-sm font-medium">
                      {stage.count.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-light text-white mb-4 sm:mb-6">
              Top Products
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {analyticsData.topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 sm:gap-4"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-600/20 flex items-center justify-center text-amber-400 font-bold text-sm sm:text-base">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm sm:text-base truncate">
                      {product.name}
                    </p>
                    <p className="text-white/60 text-xs sm:text-sm">
                      {product.wishlists} wishlists / {product.views} views
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {analyticsData.insights.map((insight) => (
            <div
              key={insight.title}
              className={`backdrop-blur-xl border rounded-xl lg:rounded-2xl p-4 sm:p-6 ${
                insight.impact === "high"
                  ? "bg-amber-600/10 border-amber-600/30"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg sm:text-xl font-light text-white mb-1 sm:mb-2">
                    {insight.title}
                  </h4>
                  <p className="text-white/80 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3">
                    {insight.description}
                  </p>
                  <p className="text-amber-400 text-xs sm:text-sm font-medium">
                    Action: {insight.action}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend?: string;
  positive?: boolean;
}

const StatCard = ({ icon, title, value, trend, positive }: StatCardProps) => {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-2 sm:gap-3 text-amber-400 mb-3 sm:mb-4">
        {icon}
      </div>
      <div className="text-white/60 text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">
        {title}
      </div>
      <div className="flex items-baseline gap-2 sm:gap-3">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-white">
          {value}
        </div>
        {trend && (
          <div
            className={`text-sm sm:text-base lg:text-lg font-medium ${
              positive ? "text-green-400" : "text-red-400"
            }`}
          >
            {trend}
          </div>
        )}
      </div>
    </div>
  );
};
