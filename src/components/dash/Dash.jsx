import EarningBar from './EarningBar';
import EarningDonut from './EarningDonut';
import Tasks from './Tasks';
import Upcoming from './Upcoming';

export default function Dash() {

    return (
        <div className='flex flex-col md:flex-row items-center justify-start md:items-start md:justify-center overflow-x-hidden w-full'>
            <div className='mx-3 w-full md:w-2/3 flex flex-col'>
                <Tasks />
                <Upcoming />
            </div>
            <div className='mx-3 w-full md:w-1/3 flex flex-col justify-center h-full'>
                <EarningDonut />
                <EarningBar />
            </div>
        </div>
    )
}