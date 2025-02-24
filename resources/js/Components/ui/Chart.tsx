import { Cell, Pie, PieChart } from 'recharts';

interface CircularProgressChartProps {
    current: number;
    limit: number;
}

const CircularProgressChart = ({
    current,
    limit,
}: CircularProgressChartProps) => {
    const data: { name: string; value: number }[] = [
        { name: 'Entertainment', value: 50 },
        { name: 'Bills', value: 750 },
        { name: 'Dining Out', value: 75 },
        { name: 'Personal Care', value: 100 },
        { name: 'Dollars', value: 0 },
    ];

    const colors = ['#7CC8DC', '#FFBB28', '#FF8042', '#00C49F', '#EAECEF']; // Colors for each category

    return (
        <div className="flex h-60 w-60 flex-col items-center justify-center">
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Pie>
            </PieChart>
            <div className="absolute text-center">
                <p className="text-xl font-bold">${current}</p>
                <p className="text-sm text-gray-500">of ${limit} limit</p>
            </div>
        </div>
    );
};

export default CircularProgressChart;
