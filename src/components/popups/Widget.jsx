import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import { Card, CardContent } from 'semantic-ui-react';
import { widget_close, widget_open } from '../../store/actions/ui';
import Calculator from '../calculator/Calculator';
import Profile from './Profile';
import './popups.css';

function Widget({ widget, type }) {


    const handleWidget = (type) => {
        if (type === 'calculator' || type === 'profile') {
            if (widget === type) {
                widget_close()
            } else {
                widget_close();
                setTimeout(() => {
                    widget_open(type);
                }, 40)
            }
        }
    }


    return (
        <motion.div
            key={widget}
            className='widget'
            onDoubleClick={() => handleWidget(type)}
            initial={{ top: -40, right: 80, opacity: 0 }}
            animate={{ top: widget === 'calculator' ? 0 : 120, right: 80, opacity: 100 }}
            exit={{ top: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card>
                <CardContent>
                    {widget === 'calculator' && <Calculator />}
                    {widget === 'profile' && <Profile />}
                </CardContent>
            </Card>
        </motion.div>
    )
}

const mapStateToProps = state => ({
    widget: state.ui.widget
});

export default connect(mapStateToProps, { widget_close, widget_open })(Widget);