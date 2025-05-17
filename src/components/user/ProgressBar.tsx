import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Label,
} from "recharts";

interface IProgress {
  progressStatus: any;
}

const ProgressBar: React.FC<IProgress> = ({ progressStatus }) => {
  const progressData = [
    {
      name: "Progress",
      value: progressStatus,
      fill: "hsl(var(--chart-1))",
    },
  ];

  const chartConfig = {
    progress: {
      label: "Course Progress",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-[60px] h-[60px] mx-auto static">
      <CardContent className="flex-1 pb-0 p-0 static">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square static "
        >
          <RadialBarChart
            data={progressData}
            startAngle={90}
            endAngle={90 + 360 * (progressData[0].value / 100)}
            innerRadius={25}
            outerRadius={30}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-inputBackgroundColor"
              polarRadius={[27, 25]}
            />
            <RadialBar dataKey="value" background cornerRadius={5} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          style={{ color: "white" }}
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-white text-xs font-bold"
                        >
                          {progressData[0].value}%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
};
export default ProgressBar;
