import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import { Card, CardContent } from 'semantic-ui-react';
import { widget_close, widget_open } from '../../store/actions/ui';
import Calculator from '../calculator/Calculator';
import Profile from './Profile';

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
            className='absolute'
            onDoubleClick={() => handleWidget(type)}
            initial={{ top: 0 }}
            animate={{ top: widget === 'calculator' ? 120 : 120 }}
            exit={{ top: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className='drop-shadow-xl shadow-inner'>
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