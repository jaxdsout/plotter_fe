import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth_user, load_user, lock_out, refresh_token } from '../store/actions/auth';
import { widget_close } from '../store/actions/ui';
import "./pages.css";

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
        <div className="dashboard">
            <motion.div
                className='dashNav'
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
            <AnimatePresence mode='wait'>
                <motion.div
                    key={basePath}
                    className='dashFrame'
                    initial={{ translateY: 800 }}
                    animate={{ translateY: 0 }}
                    exit={{ translateY: 800 }}
                    transition={{ duration: 0.5 }}
                >
                    {basePath === 'home' &&
                        <Dash />
                    }
                    {basePath === 'search' &&
                        <AllProps />
                    }
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
            {widget !== '' && (
                <AnimatePresence>
                    <Widget type={widget} />
                </AnimatePresence>
            )}
        </div>
    )
}


const Tab = ({ to, icon, currentPath, subtitle }) => {
    const isActive = currentPath === to;
    const navigate = useNavigate();

    return (
        <div className={`dashTab ${isActive && "activeTab"}`} onClick={() => navigate(to)}>
            <i className={`${icon}`} />
            <p>{subtitle.toUpperCase()}</p>
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