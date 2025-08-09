import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Layouts/DashboardLayout"
import { useUserAuth } from "../../hooks/useUseAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import InfoCard from "../../components/cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import {IoMdCard} from 'react-icons/io';
import { addThosandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenesTransactions from "../../components/cards/ExpenesTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Charts/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const Home = () => {

  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`
        ${API_PATHS.DASHBOARD.GET_DATA}`);

        if(response.data) {
          setDashboardData(response.data);
        }
    } catch (error) {
      console.log("Something went wrong. Please try again", error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  
    return () => {
      
    }
  }, [dashboardData])
  
  return (
    <DashboardLayout activeMenu="Dashboard">
     <div className="my-5 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       <InfoCard
        icon ={<IoMdCard/>}
        label="Total Balance"
        value={addThosandsSeparator(dashboardData?.totalBalance || 0)}
        color="bg-primary"
        />

  <InfoCard
        icon ={<LuWalletMinimal/>}
        label="Total Income"
        value={addThosandsSeparator(dashboardData?.totalIncome || 0)}
        color="bg-orange-500"
        />

   <InfoCard
        icon ={<LuHandCoins/>}
        label="Total Expense"
        value={addThosandsSeparator(dashboardData?.totalExpense || 0)}
        color="bg-red-500"
        />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
         <RecentTransactions
         transactions={dashboardData?.recentTransactions}
         onSeeMore {... () => navigate("/expense")}
         />
         <FinanceOverview
         totalBalance={dashboardData?.totalBalance || 0}
         totalIncome={dashboardData?.totalIncome || 0}
         totalExpense={dashboardData?.totalExpense || 0}
         />

         <ExpenesTransactions
         
         transactions={dashboardData?.last30DaysExpenes?.transactions || []}
         onSeeMore={() => navigate("/expense")}
         />

         <Last30DaysExpenses
         date={dashboardData?.last30DaysExpenses?.transactions || []}

         />

         <RecentIncomeWithChart
         data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
          totalIncome={dashboardData?.totalIncome || 0}
         
         />

         <RecentIncome
         transactions={dashboardData?.last60DaysIncome?.transactions || []}
         onSeeMore={() => navigate("/income")}
         />
      </div>
     </div>
    </DashboardLayout>
  )
}

export default Home