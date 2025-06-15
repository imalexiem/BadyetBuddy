"use client"

import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget';
import { db } from '../../../../../utils/dbConfig';
import { getTableColumns, sql, eq } from 'drizzle-orm';
import { Budgets, Expenses } from '../../../../../utils/schema';
import { useUser } from "@clerk/nextjs";
import { index } from 'drizzle-orm/gel-core';
import BudgetItem from './BudgetItem';


function BudgetList() {

  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user&&getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql `sum(${Expenses.amount })`.mapWith(Number),
      totalItem: sql `count(${Expenses.id })`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      /* .orderBy(desc(Budgets.id)) */

      setBudgetList(result);

  }


  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget refreshData={()=>getBudgetList()} />
          {budgetList?.length>0 ? budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))
          :
          [...Array(5)].map((_, index) => (
            <div key={index} className='p-5 border rounded-lg animate-pulse'>
              <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center'>
                  <div className='h-12 w-12 bg-slate-200 rounded-full'></div>
                  <div>
                    <div className='h-4 w-24 bg-slate-200 rounded'></div>
                    <div className='h-3 w-16 bg-slate-200 mt-2 rounded'></div>
                  </div>
                </div>
                <div className='h-4 w-16 bg-slate-200 rounded'></div>
              </div>
              <div className='mt-5'>
                <div className='flex items-center justify-between mb-3'>
                  <div className='h-2 w-20 bg-slate-200 rounded'></div>
                  <div className='h-2 w-20 bg-slate-200 rounded'></div>
                </div>
                <div className='w-full bg-slate-200 h-2 rounded-full'></div>
              </div>
            </div>
          ))
          }
      </div>  
    </div>
  )
}

export default BudgetList
