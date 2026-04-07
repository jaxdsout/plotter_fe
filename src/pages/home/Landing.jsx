import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import LandingLoop from "../../assets/videos/0224.mp4";
import { reset_client_view } from "../../store/actions/ui";
import "./home.css";

function Landing({ access, refresh }) {
  const navigate = useNavigate();
  const [videoHover, setVideoHover] = useState(false);

  useEffect(() => {
    reset_client_view()
    if (access && refresh) {
      navigate('/dashboard/home')
    }
  }, [access, refresh, navigate])

  return (
    <div className="landingPage">
      <div className="landingContent">
        <motion.div
          className="landingHero"
          initial={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="landingTitle">THE NEW WAY TO LOCATE</h1>
          <p className="landingSubtitle">Stop juggling multiple platforms and outdated tools.<br />Get the new one-stop shop for locators.</p>
        </motion.div>

        <motion.div
          className="landingMission"
          initial={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="landingMissionText">
            <p className="landingMissionTagline">OUR MISSION AT ATLAS:</p>
            <p className="landingMissionTitle">streamline the entire apartment locating process for real estate agents</p>
          </div>
          <div className="landingPillars">
            <div className="landingPillarsHeader">
              <span className="landingPillarsSubtitle">the three pillars of Atlas</span>
              <p className="landingPillarsTitle">
                <b>clients</b>, <b>lists</b>, <span style={{ fontSize: '1.25rem' }}>&</span> <b>deals</b>
              </p>
            </div>
            <div className="landingPillarsRow">
              <div className="landingPillar">
                <i className="users icon" />
                <p>At the heart of your business is your <b>client</b>. They're the reason you brew that morning coffee. We understand that finding the best deals is usually client-specific, so we've centralized everything in Atlas around each one in order to make their journeys as smooth as possible.</p>
              </div>
              <div className="landingPillar">
                <i className="list alternate icon" />
                <p>Next is our <b>list</b>-making feature. The true workhorse of Atlas. Powerful, lean &amp; majestic. While crafting lists, you can browse properties across your region, select units, and add any important details such as specials or notes. When you're ready to send, Atlas packages everything into a unique, shareable link for your client.</p>
              </div>
              <div className="landingPillar">
                <i className="chart pie icon" />
                <p>Last but certainly not least is the <b>deal</b> tracker. Once you've found your client the perfect place, it's crucial to record their lease details and stay on top of payment deadlines. Atlas' deal-tracking tools notify you about important updates, so nothing slips through the cracks.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="landingVideoSection"
          onMouseEnter={() => setVideoHover(true)}
          onMouseLeave={() => setVideoHover(false)}
          onTouchStart={() => setVideoHover(true)}
          onTouchEnd={() => setVideoHover(false)}
          initial={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <div className="landingVideoContainer">
            <h1
              className="landingVideoLabel"
              style={{ opacity: videoHover ? "0%" : "30%" }}
            >
              <span className="videoLabelTop">CHECK OUT</span>
              <span className="videoLabelMain">ATLAS</span>
              <span className="videoLabelBottom">IN ACTION</span>
            </h1>
            <video autoPlay loop muted playsInline
              className="landingVideo"
              style={{ opacity: videoHover ? "90%" : "40%" }}
            >
              <source src={LandingLoop} />
            </video>
          </div>
        </motion.div>

        <div className="landingDashSection">
          <div className="landingSectionHeader">
            <div className="landingSectionLabel">
              <span className="landingSectionLabelSub">A GLIMPSE AT THE</span>
              <span className="landingSectionLabelMain"><b>DASHBOARD</b></span>
            </div>
          </div>
          <div className="landingDashContent">
            <div className="landingPillar">
              <p>From your dashboard, you'll see daily stats like upcoming move-ins and renewal timeframes and monthly reports like income summaries and overdues. The dashboard also has the ability to check current commission rates, send guest cards, set to-do's and calculate net effective rates.</p>
              <p>And we're currently developing a comprehensive stats feature (exciting, right?) to track everything from most-recommended properties to most-leased, and beyond!</p>
            </div>
          </div>
        </div>

        <div className="landingCta">
          <h1 className="landingCtaTitle">ready to JOIN ?</h1>
          <Link to={"/signup/"}>
            <Button className="button">LET'S GO</Button>
          </Link>
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
