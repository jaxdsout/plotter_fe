import EarningBar from './EarningBar';
import EarningDonut from './EarningDonut';
import Tasks from './Tasks';
import Upcoming from './Upcoming';
import "./dash.css";

export default function Dash() {
  return (
    <div className='dash'>
      <div className='dashColumn'>
        <Tasks />
        <Upcoming />
      </div>
      <div className='dashColumn'>
        <EarningDonut />
        <EarningBar />
      </div>
    </div>
  )
}