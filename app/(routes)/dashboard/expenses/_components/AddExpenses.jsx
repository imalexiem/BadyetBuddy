import React, { useState } from 'react'
import { Input } from '../../../../../components/ui/input'
import { Button } from '../../../../../components/ui/button';
import { db } from '../../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../../utils/schema';
import { toast } from 'sonner';
import moment from 'moment';

function AddExpenses({budgetId, user, refreshData}) {

  const [name, setName]=useState();
  const [amount, setAmount]=useState();

  const addNewExpense = async () => {
    const result = await db.insert(Expenses).values({
      name: name,
      amount: Number(amount),
      budgetId: budgetId,
      createdAt: moment().format('MM/DD/YYYY')
    }).returning({insertedId: Budgets.id});

    setAmount('');
    setName('');

    if(result) {
      refreshData();
      toast('New Expense Added!');
    }
    
  }

  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='font-bold text-lg'>Add Expense</h2>
          <div className='mt-2'>
              <h2 className='text-black font-medium my-2'> Expense Name </h2>
              <Input placeholder="e.g Concert" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className='mt-2'>
              <h2 className='text-black font-medium my-2'> Expense Amount </h2>
              <Input type="number" value={amount} placeholder="e.g  ₱5000" onChange={(e)=>setAmount(e.target.value)} />
          </div>

          <Button disabled={!(name&&amount)} onClick={()=>addNewExpense()} className="mt-3 w-full"> Add New Expense </Button>

    </div>
  )
}

export default AddExpenses
