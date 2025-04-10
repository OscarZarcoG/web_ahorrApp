import React, { useEffect } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
    type ChartOptions
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { useFinance } from '@/hook/useFinance';
import { useTheme } from '@/context/ThemeContext';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement
);

interface ChartColors {
    income: string;
    expense: string;
    category: string[];
    balance: string;
    text: string;
    grid: string;
    background: string;
    tooltipBg: string;
    tooltipText: string;
}

const lightColors: ChartColors = {
    income: '#4CAF50',
    expense: '#F44336',
    category: ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0', '#00BCD4', '#E91E63', '#FFEB3B'],
    balance: '#9C27B0',
    text: '#6B7280',
    grid: 'rgba(156, 163, 175, 0.1)',
    background: '#FFFFFF',
    tooltipBg: 'rgba(0, 0, 0, 0.7)',
    tooltipText: '#FFFFFF'
};

const darkColors: ChartColors = {
    income: '#81C784',
    expense: '#E57373',
    category: ['#64B5F6', '#81C784', '#FFB74D', '#BA68C8', '#4DD0E1', '#F06292', '#FFF176'],
    balance: '#BA68C8',
    text: '#E5E7EB',
    grid: 'rgba(229, 231, 235, 0.1)',
    background: '#FFFFFF',
    tooltipBg: 'rgba(255, 255, 255, 0.9)',
    tooltipText: '#000000'
};

const Chart: React.FC = () => {
    const {
        transactions,
        summary,
        loading,
        error,
        fetchTransactions,
        formatCurrency,
        calculateSummary
    } = useFinance();

    const { theme } = useTheme();
    const colors = theme === 'dark' ? darkColors : lightColors;

    useEffect(() => {
        fetchTransactions();
        calculateSummary();
    }, []);

    if (loading) return <div className="text-center p-4">Cargando gráficos...</div>;
    if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

    const commonOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: colors.text,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: colors.tooltipBg,
                titleColor: colors.tooltipText,
                bodyColor: colors.tooltipText,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                displayColors: true,
                padding: 10,
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = formatCurrency(context.raw as number);
                        return `${label}: ${value}`;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: colors.text
                },
                grid: {
                    color: colors.grid
                }
            },
            y: {
                ticks: {
                    color: colors.text
                },
                grid: {
                    color: colors.grid
                }
            }
        }
    };

    const pieData = {
        labels: ['Ingresos', 'Gastos'],
        datasets: [
            {
                data: [summary.totalIncome, summary.totalExpense],
                backgroundColor: [colors.income, colors.expense],
                borderWidth: 1,
                borderColor: [
                    `${colors.income.replace(')', ', 0.8)').replace('rgb', 'rgba')}`,
                    `${colors.expense.replace(')', ', 0.8)').replace('rgb', 'rgba')}`
                ]
            },
        ]
    };

    const categoryData = transactions.reduce((acc, transaction) => {
        const categoryName = transaction.category_name || 'Sin categoría';
        if (!acc[categoryName]) {
            acc[categoryName] = 0;
        }
        acc[categoryName] += transaction.amount;
        return acc;
    }, {} as Record<string, number>);

    const barData = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                label: 'Monto por categoría',
                data: Object.values(categoryData),
                backgroundColor: colors.category,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1
            },
        ],
    };

    const transactionsByDate = transactions
        .map(t => ({
            ...t,
            date: new Date(t.created_at || '').toLocaleDateString('es-MX')
        }))
        .reduce((acc, transaction) => {
            if (!acc[transaction.date]) {
                acc[transaction.date] = 0;
            }
            acc[transaction.date] += transaction.amount * (transaction.is_income ? 1 : -1);
            return acc;
        }, {} as Record<string, number>);

    const lineData = {
        labels: Object.keys(transactionsByDate),
        datasets: [
            {
                label: 'Balance diario',
                data: Object.values(transactionsByDate),
                borderColor: colors.balance,
                backgroundColor: `${colors.balance.replace(')', ', 0.2)').replace('rgb', 'rgba')}`,
                borderWidth: 2,
                pointBackgroundColor: colors.balance,
                pointBorderColor: colors.background,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.2
            },
        ],
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <div className={`p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md bg-${colors.background.replace('#', '')}`}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                    Resumen de Ingresos y Gastos
                </h2>
                <div className="h-64">
                    <Pie data={pieData} options={commonOptions} />
                </div>
                <div className="mt-6 text-center">
                    <p style={{ color: colors.text }}>
                        Ingresos: <span className="font-medium" style={{ color: colors.income }}>
                            {formatCurrency(summary.totalIncome)}
                        </span>
                    </p>
                    <p style={{ color: colors.text }}>
                        Gastos: <span className="font-medium" style={{ color: colors.expense }}>
                            {formatCurrency(summary.totalExpense)}
                        </span>
                    </p>
                    <p className="font-bold mt-2" style={{ color: colors.text }}>
                        Balance: <span style={{
                            color: summary.balance >= 0 ? colors.income : colors.expense
                        }}>
                            {formatCurrency(summary.balance)}
                        </span>
                    </p>
                </div>
            </div>

            <div className={`p-6 bg-white dark:bg-slate-800  rounded-lg shadow-md bg-${colors.background.replace('#', '')}`}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                    Transacciones por Categoría
                </h2>
                <div className="h-64">
                    <Bar data={barData} options={commonOptions} />
                </div>
            </div>

            <div className={`p-6 bg-white dark:bg-slate-800  rounded-lg shadow-md md:col-span-2 bg-${colors.background.replace('#', '')}`}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                    Historial de Transacciones
                </h2>
                <div className="h-64">
                    <Line data={lineData} options={commonOptions} />
                </div>
            </div>
        </div>
    );
};

export default Chart;