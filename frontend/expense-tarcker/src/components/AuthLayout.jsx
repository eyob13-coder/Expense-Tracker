import CARD_2 from '../assets/images/card2.png';
import {LuTrendingUpDown} from 'react-icons/lu';

const AuthLayout = ( { children }) => {
  return (
    <div className="flex">
        <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
            <h2 className="text-2xl font-bold text-purple-400"><span className='text-purple-500'>Expense</span> Tracker</h2>
            {children}
        </div>
        <div className='auth-layout'>
            <div className='inner-layout'/>
            <div className='outer-layout'/>
            <div className='side-layout'/>
            <div className='card-container'>
                <div className="grid grid-cols-1 z-20">
                    <StatsInfocard
                    icon={<LuTrendingUpDown/>}
                    label="Track your Income & Expense"
                    value="430,000"
                    color="bg-primary"
                    />
                </div>
                <img src={CARD_2} className='w-full shadow-lg shadow-blue-400/15 rounded-lg '/>
            </div>
        </div>
    </div>
  )
}

export default AuthLayout;

const StatsInfocard = ({icon, value, label, color}) =>{
  return <div className='stats-card'>
    <div className={`info-card ${color}`}>
      {icon}
    </div>
    <div>
        <h6 className='text-sm text-gray-500 mb-1'>{label}</h6>
      <span className="text-[20px]">{value}</span>
    </div>
  </div>
}