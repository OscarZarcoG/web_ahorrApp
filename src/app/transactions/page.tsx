'use client'

import TransactionsList  from '@/components/dashboard/finance/transactions/TransactionList'
import AddTransaction from '@/components/dashboard/finance/transactions/AddTransaction'

export default function TrasactionPage() {
    return (
        
      <div className="space-y-6">
        <div className="">
          <div className="lg:col-span-2">
            <div className="space-y-4 pb-4 lg:sticky mt-2 ">
              <AddTransaction />
            </div>
              <TransactionsList />
          </div>
        </div>
      </div>
    )
  }