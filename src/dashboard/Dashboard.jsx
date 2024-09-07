import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { auth_user, load_user } from '../actions/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Clients from '../clients/Clients';
import Lists from '../lists/Lists';
import Deals from '../deals/Deals';
import Dash from './Dash'
import {ReactComponent as Home} from '../components/home.svg'
import {ReactComponent as Person} from '../components/person-circle.svg'
import ProfileWidget from './ProfileWidget';


function Dashboard ({ load_user, auth_user, isAuthenticated }) {
    const [profileHover, setProfileHover] = useState(false);
    const location = useLocation(); 
    const navigate = useNavigate();

    console.log(isAuthenticated)

    const handleProfileWidget = () => {
        setProfileHover(prev => !prev);
    };

    useEffect(() => {
            load_user();
            auth_user();
    }, [load_user, auth_user]);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login/')
        }
    }, [isAuthenticated, navigate])

    const basePath = location.pathname.split('/').pop();

    return (    
        <div className='container pb-5 pt-5'>
            <div className='z-0 navbar p-5 bg-body-secondary'>
                <Link to="/dashboard/home"><Home className='icon' /></Link>
                <Link className='poetsen tabs' to="/dashboard/clients">clients</Link>
                <Link className='poetsen tabs' to="/dashboard/lists">lists</Link>
                <Link className='poetsen tabs' to="/dashboard/deals">deals</Link>
                <Link className='poetsen tabs' onClick={handleProfileWidget}>
                    <Person className="icon"/>
                </Link>
            </div>
            {profileHover && (
                <div className='z-1 position-absolute end-0 p-3'>
                    <ProfileWidget /> 
                </div>
            )}
            <div>
                {basePath === 'home' && <Dash />}
                {basePath === 'clients' && <Clients />}
                {basePath === 'lists' && <Lists />}
                {basePath === 'deals' && <Deals />}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
});

export default connect(mapStateToProps, { load_user, auth_user })(Dashboard);