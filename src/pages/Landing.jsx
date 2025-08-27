import { Link, useNavigate } from "react-router-dom";
import { Button, Loader } from "semantic-ui-react";
import { useEffect, useState, useRef } from "react";
import { reset_client_view } from "../store/actions/ui";
import { connect } from "react-redux";
import LandingLoop from "../images/videos/0224.mp4";
import { motion, useInView, useAnimation } from "framer-motion";

function Landing({ access, refresh }) {
    const navigate = useNavigate();
    const [imageLoad, setImageLoad] = useState(false);
    const [videoHover, setVideoHover] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
        reset_client_view()
        if (access && refresh) {
            navigate('/dashboard/home')
        }
    }, [access, refresh, navigate])

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible')
        }
    }, [isInView])

    // useEffect(() => {
    //     const preloadImage = (url) => {
    //         const img = new Image();
    //         img.src = url;
    //         if (url === 'https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1008.png') {
    //             img.onload = () => setImageLoad(true);
    //         } 
    //     };

    //     const imageUrls = [
    //         "https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1006.png",
    //         "https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1010.png",
    //         "https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1009.png",
    //         "https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1008.png",
    //     ];

    //     imageUrls.forEach(preloadImage);
    // }, []);

    return (
        <div className="flex flex-col items-center justify-evenly animator bg-fixed">
            <div className="flex flex-col bg-[#262626] flex flex-col items-center justify-center">
                <img className="drop-shadow-md h-[200px] sm:h-[400px] mt-2" src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1006.png" alt='main-header' />
                <motion.div
                    className="bg-[#010111] w-full"
                    initial={{ translateY: 500 }}
                    animate={{ translateY: 0 }}
                    exit={{ translateY: 500 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <h1 className="font-mont drop-shadow text-[#5F85DB] text-3xl md:text-5xl xl:text-6xl text-center text-nowrap py-6 mt-2 -mb-16">THE NEW WAY TO LOCATE</h1>
                    <h2 className="text-sm  shadow-inner shadow-md p-6 text-center text-white z-40 mb-0">Stop juggling multiple platforms and outdated tools.<br></br> Get the new one-stop shop for locators.</h2>
                </motion.div>
                <motion.div
                    className="flex flex-col items-center justify-center bg-black shadow-inner-sm drop-shadow-xl-180 p-6 text-white w-full z-40"
                    initial={{ translateY: 500 }}
                    animate={{ translateY: 0 }}
                    exit={{ translateY: 500 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col items-center justify-center w-full sm:w-3/4">
                        <p className="italic text-lg -mb-1">OUR MISSION AT ATLAS:</p>
                        <p className="font-mont drop-shadow text-white uppercase text-2xl text-center mb-4 mt-2 w-3/4 md:w-1/2">streamline the entire apartment locating process for real estate agents </p>
                    </div>
                    <div className="mt-6 flex flex-col items-center justify-center">
                        <div className="h-[300px] -mb-24 relative">
                            <img src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1009.png" className="drop-shadow h-3/4 sm:h-11/12" alt="sub-header-1" />
                        </div>
                        <div className="flex flex-col items-center drop-shadow uppercase mt-4 ">
                            <span className="font-light text-xl">the three pillars of Atlas</span>
                            <p className="text-3xl mb-4 mt-2 font-mont">
                                <b>clients</b>, <b>lists</b>, <span className="text-xl">&</span> <b>deals</b>
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start p-3 w-full">
                            <div className="flex flex-col items-center justify-center w-full sm:w-1/3 pr-6 pl-6 mt-6">
                                <i className="users icon !text-6xl !mb-2 !text-[#5F85DB]"></i>
                                <p>At the heart of your business is your <b>client</b>. They're the reason you brew that morning coffee. We understand that finding the best deals is usually client-specific, so we’ve centralized everything in Atlas around each one in order to make their journeys as smooth as possible.</p>
                            </div>

                            <div className="flex flex-col items-center justify-center w-full sm:w-1/3 pr-6 pl-6 mt-6">
                                <i className="list alternate icon !text-6xl !mb-2 !text-[#5F85DB]"></i>
                                <p>Next is our <b>list</b>-making feature. The true workhorse of Atlas. Powerful, lean & majestic. While crafting lists, you can browse properties across your region, select units, and add any important details such as specials or notes. When you're ready to send, Atlas packages everything into a unique, shareable link for your client.</p>
                            </div>

                            <div className="flex flex-col items-center justify-center w-full sm:w-1/3 pr-6 pl-6 mt-6">
                                <i className="chart pie icon !text-6xl !mb-2 !text-[#5F85DB]"></i>
                                <p>Last but certaintly not least is the <b>deal</b> tracker. Once you've found your client the perfect place, it’s crucial to record their lease details and stay on top of payment deadlines. Atlas' deal-tracking tools notify you about important updates, so nothing slips through the cracks.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="w-full h-1/3 bg-black shadow-inner z-30 -mt-4 -mb-4"
                    onMouseEnter={() => setVideoHover(true)}
                    onMouseLeave={() => setVideoHover(false)}
                    onTouchStart={() => setVideoHover(true)}
                    onTouchEnd={() => setVideoHover(false)}
                    variants={{
                        init: { translateY: -500 },
                        visible: { translateY: 0 }
                    }}
                    initial={'init'}
                    animate={mainControls}
                    transition={{ duration: 1, delay: 0.75 }}
                    ref={ref}
                >
                    <div className="flex flex-col items-center justify-center relative">
                        <h1
                            className="text-white font-mont z-40 text-center absolute"
                            style={{ opacity: videoHover ? "0%" : "30%" }}
                        >
                            <span className="text-4xl">CHECK OUT </span><br></br>
                            <span className="lowercase text-8xl">ATLAS</span><br></br>
                            <span className="text-4xl">IN ACTION</span>
                        </h1>
                        <video autoPlay loop muted playsInline
                            className="z-30 w-full h-full object-cover"
                            style={{ opacity: videoHover ? "90%" : "40%" }}
                        >
                            <source src={LandingLoop} />
                        </video>
                    </div>
                </motion.div>

                <div className="flex flex-col items-center justify-center bg-black shadow-inner-sm drop-shadow-xl p-6 text-white w-full z-40">
                    <div className="flex flex-row items-end">
                        <img src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1010.png" className="drop-shadow-md h-[80px] z-30 mr-5" alt='sub-header-0' />
                        <div className="flex flex-col items-center drop-shadow uppercase mb-2">
                            <span className="font-light text-xl">A GLIMPSE AT THE </span>
                            <span className="text-3xl mt-0">
                                <b className="font-mont">DASHBOARD</b>
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center mt-4">
                        <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
                            <img src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1020.png" className="drop-shadow-md rounded-2xl" alt='dashboard-0' />
                        </div>
                        <div className="flex flex-col items-center justify-center w-full sm:w-1/3 pr-6 pl-6 mt-6">
                            <p>From your dashboard, you'll see daily stats like upcoming move-ins and renewal timeframes and monthly reports like income summaries and overdues. The dashboard also has the ability to check current commission rates, send guest cards, set to-do's and calculate net effective rates.</p>
                            <p>And we're currently developing a comprehensive stats feature (exciting, right?) to track everything from most-recommended properties to most-leased, and beyond! </p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center bg-[#101011] shadow-inner shadow-md p-6 text-white mt-0">
                    <h1 className="font-mont text-white text-2xl md:text-3xl text-center text-wrap uppercase">ready to JOIN ?</h1>
                    <Link to={"/signup/"}><Button className="!bg-[#90B8F8] hover:!bg-[#5F85DB] hover:!text-white text-white drop-shadow active:translate-y-0.5">LET'S GO</Button></Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    isClientView: state.ui.isClientView,
    access: state.auth.access,
    refresh: state.auth.refresh
});

export default connect(mapStateToProps, {})(Landing);