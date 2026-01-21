import { useState, useEffect } from 'react'
import './index.css'
import './App.css'
import doorGif from './components/registration/door.gif'
import doorPng from './components/registration/door.png'
import doorOnlyPng from './components/registration/door_only.png'
import nextButton from './components/registration/next.png'
import preRegisterImg from './components/registration/Pre register here.png'

function App() {
    const [doorState, setDoorState] = useState('gif')
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        university: '',
        referral: '',
        participant: ''
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        // Simple timer is more reliable for preventing "double opening"
        const timer = setTimeout(() => {
            setDoorState('png')
        }, 1300) // Trigger slightly earlier to ensure second loop never starts visually

        return () => clearTimeout(timer)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validate = () => {
        const newErrors = {}
        if (step === 1) {
            if (!formData.name.trim()) newErrors.name = 'Please enter your name'
            if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required'
            else if (!/^\d{10}$/.test(formData.mobile.trim())) newErrors.mobile = 'Enter a valid 10-digit number'

            if (!formData.email.trim()) newErrors.email = 'Email address is required'
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address'

            if (!formData.university.trim()) newErrors.university = 'University name is required'
        } else if (step === 2) {
            if (!formData.participant) newErrors.participant = 'Please select an option'
        }
        return newErrors
    }

    const handleNext = (e) => {
        if (e) e.preventDefault()

        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        if (step === 1) {
            setStep(2)
        } else {
            // Final submission or next step
            console.log('Final Form Data:', formData)
            alert('Registration Complete!')
        }
    }

    return (
        <div className="app-container">
            <div className="door-center">
                <div className="door-stack">
                    <img
                        src={doorGif}
                        alt="Door Animation"
                        className={`door-gif ${doorState === 'png' ? 'fade-out' : ''}`}
                    />

                    <img src={doorPng} alt="Door" className={`door-png desktop-door ${doorState === 'png' ? 'fade-in' : ''}`} />
                    <img src={doorOnlyPng} alt="Door" className={`door-png mobile-door ${doorState === 'png' ? 'fade-in' : ''}`} />

                    <div className={`registration-form-container ${step === 2 ? 'participant-mode' : ''}`}>
                        {step === 1 ? (
                            <>
                                <img src={preRegisterImg} alt="Pre Register Here" className="form-heading-img" />
                                <form className="registration-form" onSubmit={handleNext}>
                                    <div className="form-group">
                                        <label>NAME</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter text"
                                            className={errors.name ? 'input-error' : ''}
                                        />
                                        {errors.name && <span className="error-text">{errors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>MOBILE NO.</label>
                                        <input
                                            type="text"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            placeholder="Enter text"
                                            className={errors.mobile ? 'input-error' : ''}
                                        />
                                        {errors.mobile && <span className="error-text">{errors.mobile}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>EMAIL</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter text"
                                            className={errors.email ? 'input-error' : ''}
                                        />
                                        {errors.email && <span className="error-text">{errors.email}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>UNIVERSITY/ INSTITUTION/ ACADEMY</label>
                                        <input
                                            type="text"
                                            name="university"
                                            value={formData.university}
                                            onChange={handleChange}
                                            placeholder="Enter text"
                                            className={errors.university ? 'input-error' : ''}
                                        />
                                        {errors.university && <span className="error-text">{errors.university}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>REFERRAL CODE (OPTIONAL)</label>
                                        <input
                                            type="text"
                                            name="referral"
                                            value={formData.referral}
                                            onChange={handleChange}
                                            placeholder="Enter text"
                                        />
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="participant-selection">
                                <h2 className="participant-title">ARE YOU A PARTICIPANT?</h2>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="participant"
                                            value="yes"
                                            checked={formData.participant === 'yes'}
                                            onChange={handleChange}
                                        />
                                        <span className="custom-radio"></span>
                                        Yes
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="participant"
                                            value="no"
                                            checked={formData.participant === 'no'}
                                            onChange={handleChange}
                                        />
                                        <span className="custom-radio"></span>
                                        No
                                    </label>
                                </div>
                                <div className="form-group" style={{ marginTop: '10px', paddingBottom: '20px' }}>
                                    {errors.participant && <span className="error-text">{errors.participant}</span>}
                                </div>
                            </div>
                        )}
                    </div>

                    <button className="next-button" onClick={handleNext}>
                        <img src={nextButton} alt="Next" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App