import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';
import { auth_user, load_user, lock_out, refresh_token } from '../store/actions/auth';
import { widget_close } from '../store/actions/ui';

import AllCards from '../components/cards/AllCards';
import NewCard from '../components/cards/NewCard';
import AllClients from '../components/clients/AllClients';
import NewClient from '../components/clients/NewClient';
import Dash from '../components/dash/Dash';
import AllDeals from '../components/deals/AllDeals';
import NewDeal from '../components/deals/NewDeal';
import AllLists from '../components/lists/AllLists';
import NewList from '../components/lists/NewList';
import Widget from '../components/popups/Widget';
import AllProps from '../components/props/AllProps';


function Dashboard({ auth_user, refresh_token, access, refresh, lock_out, widget }) {
    const location = useLocation();
    const basePath = location.pathname.split('/').pop();
    const pathName = location.pathname;

    const checkTokens = useCallback(() => {
        if (!access && !refresh) {
            lock_out();
        } else if (!access) {
            try {
                refresh_token();
                load_user();
            } catch (err) {
                console.error("Failed to refresh token:", err);
                lock_out();
            }
        }
    }, [access, refresh, refresh_token, lock_out]);

    useEffect(() => {
        checkTokens();
    }, [checkTokens]);

    useEffect(() => {
        auth_user(pathName);
    }, [auth_user, pathName])

    useEffect(() => {
        if (widget === '') {
            setTimeout(() => {
                widget_close()
            }, 40)
        }
    }, [widget])


    return (
        <div className='w-full flex flex-col items-center justify-evenly'>
            <div className="w-full h-full p-3 sm:p-5 mt-3 bg-white shadow-inner shadow-md overflow-y-hidden">
                <motion.div
                    className='p-3 sm:p-5 flex flex-row items-center justify-center bg-[#3e3e3e] bg-blend-color-burn rounded-md'
                    style={{ zIndex: 3 }}
                    initial={{ translateY: -200 }}
                    animate={{ translateY: 0 }}
                    exit={{ translateY: -200 }}
                    transition={{ duration: 0.5 }}
                >
                    <Tab to="/dashboard/home" icon="home icon" subtitle="home" currentPath={pathName} />
                    <Tab to="/dashboard/search" icon="search icon" subtitle="search" currentPath={pathName} />
                    <Tab to="/dashboard/clients" icon="users icon" subtitle="clients" currentPath={pathName} />
                    <Tab to="/dashboard/lists" icon="list alternate icon" subtitle="lists" currentPath={pathName} />
                    <Tab to="/dashboard/deals" icon="chart pie icon" subtitle="deals" currentPath={pathName} />
                    <Tab to="/dashboard/cards" icon="address card icon" subtitle="cards" currentPath={pathName} />
                </motion.div>
                <Divider />
                <AnimatePresence mode='wait'>

                    <motion.div
                        key={basePath}
                        className='w-full flex flex-col items-center justify-start bg-gray-100 rounded-lg shadow-inner mt-6 mb-8'
                        initial={{ translateY: 800 }}
                        animate={{ translateY: 0 }}
                        exit={{ translateY: 800 }}
                        transition={{ duration: 0.5 }}
                    >
                        {basePath === 'home' && <Dash />}
                        {basePath === 'search' && <AllProps />}
                        {basePath === 'clients' &&
                            <>
                                <NewClient />
                                <AllClients />
                            </>
                        }
                        {basePath === 'lists' &&
                            <>
                                <NewList />
                                <AllLists />
                            </>
                        }
                        {basePath === 'deals' &&
                            <>
                                <NewDeal />
                                <AllDeals />
                            </>
                        }
                        {basePath === 'cards' &&
                            <>
                                <NewCard />
                                <AllCards />
                            </>
                        }
                    </motion.div>
                </AnimatePresence>

            </div>
            <AnimatePresence>
                {widget !== '' && (
                    <Widget type={widget} />
                )}
            </AnimatePresence>

        </div>
    )
}


const Tab = ({ to, icon, currentPath, subtitle }) => {
    const isActive = currentPath === to;

    return (
        <div className='relative flex flex-col items-center justify-center px-4 md:px-5'>
            <h1 className='text-4xl md:text-5xl'>
                <Link to={to}>
                    {icon ? <i className={`font-mont drop-shadow-md active:translate-y-0.5
                    ${isActive ? "text-[#89a2dc]" : "text-white"} hover:text-[#5F85DB] ${icon}`} /> : null}
                </Link>
            </h1>
            <p className='font-mont text-white text-center text-[0.6rem] -mt-2 -ml-1'>{subtitle.toUpperCase()}</p>

        </div>

    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    access: state.auth.access,
    refresh: state.auth.refresh,
    user: state.auth.user,
    widget: state.ui.widget
});

export default connect(mapStateToProps, { auth_user, refresh_token, load_user, lock_out })(Dashboard);