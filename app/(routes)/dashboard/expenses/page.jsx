"use client"

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '../../../../utils/dbConfig'
import { getTableColumns, sql, eq, desc } from 'drizzle-orm'
import { Budgets, Expenses } from '../../../../utils/schema'
import BudgetList from '../budgets/_components/BudgetList'
import ExpenseListTable from './_components/ExpenseListTable'

function ExpensesPage() {
  const { user } = useUser()
  const [budgetList, setBudgetList] = useState([])
  const [expensesList, setExpensesList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      user&&getBudgetList()
    }
  }, [user])

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
      getAllExpenses();

  }

      const getAllExpenses = async () => {
        const result = await db.select({
          id:Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt
        }).from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(Expenses.id))
  
        setExpensesList(result);
  
      }

    return (
        <div>
        <ExpenseListTable expensesList={expensesList} refreshData={()=>getBudgetList} />
        </div>
    )
}

export default ExpensesPage