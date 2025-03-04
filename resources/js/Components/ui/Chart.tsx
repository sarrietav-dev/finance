import { cn } from '@/utils/cn';
import { Cell, Pie, PieChart } from 'recharts';

interface CircularProgressChartProps {
    current: number;
    limit: number;
    data: { name: string; value: number; color: string }[];
    className?: string;
}

const CircularProgressChart = ({
    current,
    limit,
    data,
    className,
}: CircularProgressChartProps) => {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center',
                className,
            )}
        >
            <PieChart width={300} height={250}>
                <Pie
                    data={data}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map(({ color }, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                    ))}
                </Pie>
            </PieChart>
            <div className="absolute text-center">
                <p className="text-2xl font-bold">${current}</p>
                <p className="text-base text-gray-500">of ${limit} limit</p>
            </div>
        </div>
    );
};

export default CircularProgressChart;
