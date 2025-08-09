import React from 'react'
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../cards/TransactionInfoCard';
import moment from 'moment';

const RecentIncome = ({transactions, onSeeMore}) => {
  return (
    <div className="card">
        <div className="flex items-center justy-between">
            <h5 className="lext-lg">Income</h5>

            <button className="card-btn" onClick={onSeeMore}>
                See All <LuArrowRight className='text-base'/>
            </button>
        </div>

        <div className="mt-6">
            {transactions?.slice(0,5).map(({source, icon, amount, date} ,item) => (
                <TransactionInfoCard
                key={item._id}
                title={source}
                icon={icon}
                date={moment(date).format(" Do MMM YYY")}
                amount={amount}
                type="income"
                hideDeleteBtn

                />
            ))}
        </div>
    </div>
  )
}

export default RecentIncome