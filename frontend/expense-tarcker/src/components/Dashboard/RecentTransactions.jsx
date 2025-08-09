import React from 'react'
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../cards/TransactionInfoCard';

const RecentTransactions = ({transactions,
    onSeeMore }) => {
  return (
   <div className='card'>
     <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>

        <button className='card-btn' onClick={onSeeMore}>
            See All <LuArrowRight className ="text-base"/>
        </button>
     </div>

     <div className="mt-6">
        {transactions?.slice(0,5)?.map(({type, catagory,source, icon, date, idx, amount} ,item ) => (
            <TransactionInfoCard
            key={item._id}
            title={type == 'expense' ? catagory : source}
            icon={icon}
            date={moment(date).format("DDD MMM YYY")}
            amount={amount}
            type={idx}
            hideDeleteBtn

            />
        ))}
     </div>
   </div>
  )
}

export default RecentTransactions