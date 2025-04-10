'use client'
import FinanceSummary from '@/components/dashboard/finance/transactions/FinanceSummary'
import Chart from '@/components/dashboard/Chart';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="">
        <div className="lg:col-span-2">
          <div className="space-y-4 pb-4 lg:sticky">
            <FinanceSummary />
          </div>
          <div>
            <Chart />
          </div>
        </div>
      </div>
    </div>
  )
}