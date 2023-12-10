import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { BarChartProps } from '@/app/lib/types';

Chart.register(...registerables);

export default function BarChart({ conversion, studentResponse }: BarChartProps) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    // Convert string props to numbers if they are strings
    const conversionValue = parseFloat(conversion);
    const studentResponseValue = parseFloat(studentResponse);

    const createChart = () => {
        const ctx = chartRef.current?.getContext('2d');
        if (ctx) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Student Response', 'Answer'],
                    datasets: [
                        {
                            label: 'Results',
                            data: [studentResponseValue, conversionValue],
                            backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
                            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                },
            });
        }
    };

    useEffect(() => {
        createChart();
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [conversion, studentResponse]);

    return <canvas ref={chartRef} width={400} height={400}></canvas>;
}
