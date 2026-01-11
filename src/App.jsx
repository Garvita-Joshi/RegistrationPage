import { useState, useEffect } from 'react'
import './index.css'
import './App.css'
import doorGif from './components/registration/door.gif'
import doorPng from './components/registration/door.png'
import doorOnlyPng from './components/registration/door_only.png'
import nextButton from './components/registration/next.png'
import preRegisterImg from './components/registration/Pre register here.png'

function App() {
    const [showGif, setShowGif] = useState(true)
    const [showPng, setShowPng] = useState(false)
    const [step, setStep] = useState(1)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGif(false)
            setShowPng(true)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    const handleNext = () => {
        if (step === 1) {
            setStep(2)
        }
    }

    return (
        <div className="app-container">
            <div className="door-center">
                {showGif && (
                    <img src={doorGif} alt="Door Animation" className="door-gif" />
                )}
                {showPng && (
                    <div className="door-png-overlay">
                        <img src={doorPng} alt="Door" className="door-png desktop-door" />
                        <img src={doorOnlyPng} alt="Door" className="door-png mobile-door" />

                        <div className={`registration-form-container ${step === 2 ? 'participant-mode' : ''}`}>
                            {step === 1 ? (
                                <>
                                    <img src={preRegisterImg} alt="Pre Register Here" className="form-heading-img" />
                                    <form className="registration-form">
                                        <div className="form-group">
                                            <label>NAME</label>
                                            <input type="text" placeholder="Enter text" />
                                        </div>
                                        <div className="form-group">
                                            <label>MOBILE NO.</label>
                                            <input type="text" placeholder="Enter text" />
                                        </div>
                                        <div className="form-group">
                                            <label>EMAIL</label>
                                            <input type="email" placeholder="Enter text" />
                                        </div>
                                        <div className="form-group">
                                            <label>UNIVERSITY/ INSTITUTION/ ACADEMY</label>
                                            <input type="text" placeholder="Enter text" />
                                        </div>
                                        <div className="form-group">
                                            <label>REFERRAL CODE (OPTIONAL)</label>
                                            <input type="text" placeholder="Enter text" />
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="participant-selection">
                                    <h2 className="participant-title">ARE YOU A PARTICIPANT?</h2>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input type="radio" name="participant" value="yes" />
                                            <span className="custom-radio"></span>
                                            Yes
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="participant" value="no" />
                                            <span className="custom-radio"></span>
                                            No
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="next-button" onClick={handleNext}>
                            <img src={nextButton} alt="Next" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App