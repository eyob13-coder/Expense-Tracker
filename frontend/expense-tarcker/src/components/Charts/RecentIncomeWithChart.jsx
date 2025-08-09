import React, { useEffect, useState } from 'react';
import CustomPieChart from './CustomPieChart';


const COLORS = ["#875CF5", "#FA2c37", "#FF6900", "#4f39f6"]
const RecentIncomeWithChart = ({data, totalIncome}) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data.map((item) => ({
            name: item.source,
            amount: item.amount
        }));

        setChartData(dataArr)
    };


    useEffect(() => {
      prepareChartData()
    
      return () => {
        
      }
    }, [data])
    
  return (
   <div className="card">
    <div className="flex items-center justift-center">
        <h5 className="text-lg">Last 60 Days Income</h5>
    </div>

    <CustomPieChart
    data={chartData}
    label="Total Income"
    totalAmount={`$${totalIncome}`}
    showTextAnchor
    colors={COLORS}
    />
   </div>
  )
}

export default RecentIncomeWithChart