import { cn } from '@/utils/cn';
import { Cell, Pie, PieChart } from 'recharts';

interface CircularProgressChartProps {
    current: number;
    limit: number;
    data: { category: string; amount: number; theme: string }[];
    className?: string;
}

const CircularProgressChart = ({
    current,
    limit,
    data,
    className,
}: CircularProgressChartProps) => {
    const transformedData = data.map(({ category, amount, theme }) => ({
        name: category,
        value: Math.abs(amount),
        color: theme,
    }));

    console.log(transformedData);
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center',
                className,
            )}
        >
            <PieChart width={300} height={250}>
                <Pie
                    data={transformedData}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map(({ theme }, index) => (
                        <Cell key={`cell-${index}`} fill={theme} />
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
