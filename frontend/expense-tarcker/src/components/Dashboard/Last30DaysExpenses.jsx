import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({data}) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    
  const result = prepareExpenseBarChartData(data);
  setChartData(result) 
    return () => {
      
    }
  }, [data])
  
  return (
   <div className="card col-span-1">
    <div className="flexitems-center justify-between">
      <h5 className="lext-lg">Last 30 Days Expeneses</h5>
    </div>

    <CustomBarChart data={chartData}/>
   </div>
  )
}

export default Last30DaysExpenses