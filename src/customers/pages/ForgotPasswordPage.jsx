import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import useCustomers from "../hooks/useCustomers";
import { useSnack } from "../../providers/SnackBarProvider";
import { useNavigate } from "react-router-dom";
import CheckEmail from "../components/forgotPassword/CheckEmail";
import CheckValidation from "../components/forgotPassword/CheckValidation";
import ChangePassword from "../components/forgotPassword/ChangePassword";
import ROUTES from "../../router/routesModel";
import Joi from "joi";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [validationCodeFromCustomer, setValidationCodeFromCustomer] =
        useState("");
    const [newPassword, setNewPassword] = useState("");
    const [currentComponent, setCurrentComponent] = useState("CheckEmail");
    const [code, setCode] = useState();
    const { getCustomerByEmail, sendEmail, changePasword } = useCustomers();
    const setSnack = useSnack();
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState("false")
    const [timer, setTimer] = useState("")

    const emailValidation = Joi.string()
        .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        .rule({ message: "Please enter a valid email address." })
        .required();

    const passwordValidation = Joi.string()
        .ruleset.regex(
            /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
        )
        .rule({
            message:
                "The password must be at least seven characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters: !@#$%^&*-",
        })
        .required();

    const generateRandomCode = () => {
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();

        setCode(newCode);
        return newCode;
    };

    function startCountdown() {
        let timeLeft = 30;

        const timerId = setInterval(() => {
            timeLeft -= 1;
            setTimer(timeLeft)

            if (timeLeft <= 0) {
                clearInterval(timerId);
            }
        }, 1000);

        return () => clearInterval(timerId);
    }


    const handleGetEmail = (e) => {
        setEmail(e.target.value);
        validateEmail(e.target.value)
    };

    const handleGetNewPassword = (e) => {
        setNewPassword(e.target.value);
        validatePassword(e.target.value)

    };

    const handleGetValidationCodeFromCustomer = (e) => {
        setValidationCodeFromCustomer(e.target.value);

    };

    const validateEmail = (email) => {
        setValidationError(true)
        const { error } = emailValidation.validate(email);

        if (error) {
            setValidationError(error)
        } else {
            setValidationError(false)
        }
    };

    const validatePassword = (password) => {
        setValidationError(true)
        const { error } = passwordValidation.validate(password);
        if (error) {
            setValidationError(error)
        } else {
            setValidationError(false)
        }
    };

    const checkMatchingEmail = async (mail) => {
        try {
            validateEmail(mail);
            let customerFromDB = await getCustomerByEmail(mail);
            return customerFromDB;
        } catch (err) {
            console.log(err);
            throw new Error("Invalid email address.");
        }
    };

    const handleSendConfirmationMail = async () => {
        try {
            let customer = await checkMatchingEmail(email);
            if (customer === "Email doesn't exist") {
                setSnack(
                    "error",
                    <span>
                        Email doesn't exist, please{" "}
                        <span
                            style={{
                                color: "purple",
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                            onClick={() => navigate(ROUTES.REGISTER)}
                        >
                            Register
                        </span>
                    </span>
                );
            } else {
                const generatedCode = generateRandomCode();
                await sendEmail(
                    email,
                    "Change Password",
                    `Dear Customer,

We received a request to reset the password associated with your account. To proceed, please use the verification code below to complete the process:

Your Verification Code: ${generatedCode}

If you did not request this password reset, please ignore this email, and your account will remain secure.`
                );
                startCountdown()
                setValidationError(true)
                setCurrentComponent("CheckValidation");
            }
        } catch (err) {
            setSnack("error", err.message);
        }
    };

    const handleValidateCode = () => {
        if (validationCodeFromCustomer === code) {
            setCurrentComponent("ChangePassword");
        } else {
            setSnack("error", "Invalid code. Please try again.");
        }
    };

    const handlePasswordChange = async () => {
        try {
            await changePasword(email, newPassword);
            setSnack("success", "Password changed successfully.");
            navigate(ROUTES.LOGIN);
        } catch (err) {
            console.log(err);
            setSnack("error", err.message || "Failed to change password. Please try again.");
        }
    };

    return (
        <Box sx={{ height: "100vh", backgroundColor: "white" }}>
            {currentComponent === "CheckEmail" && (
                <CheckEmail
                    handleGetEmail={handleGetEmail}
                    handleSendConfirmationMail={handleSendConfirmationMail}
                    validationError={validationError}
                />
            )}
            {currentComponent === "CheckValidation" && (
                <CheckValidation
                    onValidateCode={handleValidateCode}
                    handleGetValidationCodeFromCustomer={handleGetValidationCodeFromCustomer}
                    timer={timer}
                    handleSendConfirmationMail={handleSendConfirmationMail}
                />
            )}
            {currentComponent === "ChangePassword" && (
                <ChangePassword
                    handleGetNewPassword={handleGetNewPassword}
                    onChangePassword={handlePasswordChange}
                    validationError={validationError}
                />
            )}
        </Box>
    );
}
