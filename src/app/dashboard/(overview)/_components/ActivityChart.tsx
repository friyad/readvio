"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
} from "recharts";
import CommonTooltip from "./CommonTooltip";
import { formatDateForDisplay } from "@/utils/date";

interface ActivityChartProps {
  referralsPerDay: { date: string; count: number }[];
  creditsPerDay: { date: string; creditEarned: number }[];
}

const ActivityChart = ({
  referralsPerDay,
  creditsPerDay,
}: ActivityChartProps) => {
  return (
    <div>
      <div className="rounded-xl border border-accent-blue/20 bg-white px-8 pt-8 pb-4 shadow-sm">
        <div className="mb-3 text-sm font-semibold text-primary-blue">
          Referral Activity (last 30 days)
        </div>

        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={referralsPerDay}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 60,
              }}
              className="*:outline-none!"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(dateStr) => {
                  return formatDateForDisplay(dateStr);
                }}
                angle={-45}
                textAnchor="end"
                height={20}
                tick={{ fontSize: 12 }}
                minTickGap={10}
                padding={{ left: 0, right: 0 }}
              />
              <YAxis
                label={
                  <text
                    offset="5"
                    transform="rotate(-90, 50, 140.5)"
                    x="50"
                    y="100"
                    className="recharts-text recharts-label"
                    textAnchor="middle"
                    fill="#f3a057"
                  >
                    <tspan x="50" dy="0.355em">
                      Referrals
                    </tspan>
                  </text>
                }
                domain={["auto", "auto"]}
                allowDecimals={false}
              />
              <Tooltip content={<CommonTooltip />} />
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ paddingTop: "20px", bottom: "10px" }}
              />

              <Bar
                name="Referrals"
                type="monotone"
                dataKey="count"
                fill="#f3a057"
                strokeWidth={2}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-accent-blue/20 bg-white px-8 pt-8 pb-4 shadow-sm mt-8">
        <div className="mb-3 text-sm font-semibold text-primary-blue">
          Credits Earned Activity (last 30 days)
        </div>

        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={creditsPerDay}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 60,
              }}
              className="*:outline-none!"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(dateStr) => {
                  return formatDateForDisplay(dateStr);
                }}
                angle={-45}
                textAnchor="end"
                height={20}
                tick={{ fontSize: 12 }}
                minTickGap={10}
                padding={{ left: 0, right: 0 }}
              />
              <YAxis
                label={
                  <text
                    offset="5"
                    transform="rotate(-90, 50, 140.5)"
                    x="50"
                    y="100"
                    className="recharts-text recharts-label"
                    textAnchor="middle"
                    fill="#8884d8"
                  >
                    <tspan x="50" dy="0.355em">
                      Credits Earned
                    </tspan>
                  </text>
                }
                domain={["auto", "auto"]}
                allowDecimals={false}
              />
              <Tooltip content={<CommonTooltip />} />
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ paddingTop: "20px", bottom: "10px" }}
              />

              <Line
                name="Credits Earned"
                type="monotone"
                format="right_$"
                dataKey="creditEarned"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                connectNulls
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
