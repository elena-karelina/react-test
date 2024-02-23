import { useState } from 'react';
import { LoginButton } from './button/login';
import { NextButton } from './button/next';
import styles from './login.module.css'
import { TextTimer } from './textTimer';

import { GetOtpCode, SignIn } from './requests';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const spanTextPhone = "номер телефона";
    const spanTextCode = "проверочный код";
    const [currentSpanText, setCurrentSpanText] = useState(spanTextPhone);
    const [showNextButton, setShowNextButton] = useState(true);
    const [showVerificationInput, setShowVerificationInput] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const [showTextTimer, setShowTextTimer] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [retryDelay, setRetryDelay] = useState(0);
    const navigate  = useNavigate();

    const handlePhoneNumberChange = (e) => {
        let newValue = e.target.value;
        newValue = newValue.replace(/[^0-9]/g, '');
        setPhoneNumber(newValue);
    };
    const handleOtpCodeChange = (e) => {
        let newValue = e.target.value;
        newValue = newValue.replace(/[^0-9]/g, '');
        setOtpCode(newValue);
    };

    const handleNextButtonClick = () => {
        if (!phoneNumber) {
            return;
        }
        GetOtpCode(phoneNumber, setRetryDelay, setShowTextTimer);
        setShowVerificationInput(true);
        setCurrentSpanText(spanTextCode);
        setShowNextButton(false);
    };

    const handleLoginButtonClick = () => {
        if (!phoneNumber || !otpCode.trim||otpCode.length!=6) {
            return;
        }
        
        SignIn(phoneNumber, otpCode, ()=>navigate('/profile'));
    };

    return (
        <div className={`${styles.wrapper}`}>
            <h1>Вход</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
            }}>
                <p>
                    Введите <span>{currentSpanText}</span> для входа в личный кабинет
                </p>
                <input
                    placeholder="Телефон"
                    className={`${styles.block} ${styles.input}`}
                    required
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    title="Только цифры разрешены"

                />

                {showVerificationInput && (
                    <input
                        placeholder="Проверочный код"
                        required
                        className={`${styles.block} ${styles.input}`}
                        value={otpCode}
                        minLength={6}
                        maxLength={6}
                        onChange={handleOtpCodeChange}
                    />
                )}
                {showNextButton ? (
                    <NextButton onClick={() => handleNextButtonClick()} />
                ) : (
                    <LoginButton onClick={() => handleLoginButtonClick()} />
                )}
            </form>
            {showTextTimer && <TextTimer initValue={retryDelay}
                                        phoneNumber={phoneNumber}
                                        setRetryDelay={setRetryDelay}
                                        setShowTextTimer={setShowTextTimer} />}
        </div>

    );
};
