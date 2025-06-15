"use client"

import React, { use, useEffect, useState } from 'react'
import { db } from '../../../../../utils/dbConfig';
import { useUser } from "@clerk/nextjs";
import { getTableColumns, sql, eq, desc } from 'drizzle-orm';
import BudgetItem from '../../budgets/_components/BudgetItem';
import { Budgets, Expenses } from '../../../../../utils/schema';
import AddExpenses from '../_components/AddExpenses';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '../../../../../components/ui/button';
import { ArrowLeft, Pen, PenBox, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';


function ExpensesScreen({params}) {

    const { user } = useUser();
    const {id} = use(params);
    const [budgetInfo, setBudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState([]);
    const route=useRouter();

  useEffect(() => {
    user&&getBudgetInfo();
  }, [user]); 

    const getBudgetInfo=async() => {
        const result = await db.select({
                ...getTableColumns(Budgets),
                totalSpend: sql `sum(${Expenses.amount })`.mapWith(Number),
                totalItem: sql `count(${Expenses.id })`.mapWith(Number)
            }).from(Budgets)
                .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
                .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
                .where(eq(Budgets.id, id)) 
                .groupBy(Budgets.id)

        setBudgetInfo(result[0]);
        getExpensesList();
    }

    const getExpensesList = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, id))
            .orderBy(desc(Expenses.id))

        setExpensesList(result);
        console.log(result);
    }

    const deleteBudget = async () => {

        const deleteExpenseResult = await db.delete(Expenses)
            .where(eq(Expenses.budgetId, id))
            .returning();

            if(deleteExpenseResult) {
                const result = await db.delete(Budgets)
                    .where(eq(Budgets.id, id))
                    .returning();
            }
            toast('Budget Deleted!');
            route.replace('/dashboard/budgets');
    }

  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold flex justify-between items-center'>
            <span className='flex gap-2 items-center'> <ArrowLeft onClick={()=>route.back()} className='cursor-pointer' /> 
                My Expenses </span> 
                
            <div className='flex gap-2 items-center'>  

                {budgetInfo && <EditBudget budgetInfo={budgetInfo} refreshData={()=>getBudgetInfo()} />}


                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="flex gap-2" variant="destructive"> 
                        <Trash/> Delete </Button> 
                    </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your current budget along with expenses
                                and remove your data from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={()=>deleteBudget()} >Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                </AlertDialog>
            </div>

        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgetInfo ? 
            <BudgetItem budget={budgetInfo} />
        : 
            <div className='p-5 border rounded-lg animate-pulse'>
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
        }
        <AddExpenses budgetId={id} user={user} refreshData={()=>getBudgetInfo()} />
        </div>
        <div className='mt-4'>
            <h2 className='font-bold text-lg'>Latest Expenses</h2>
            <ExpenseListTable expensesList={expensesList} refreshData={()=>getBudgetInfo()} />
        </div>
    </div>
  )
}

export default ExpensesScreen
