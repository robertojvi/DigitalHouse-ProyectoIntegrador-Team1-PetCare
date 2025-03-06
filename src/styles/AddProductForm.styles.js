import styled from "styled-components";

export const FormWrapper = styled.div`
    font-family: "Poppins", sans-serif;
`;

export const FormContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 32px; // Increased from 26px
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 99%; // Increased from 90%
    max-width: 550px; // Increased from 500px
    max-height: calc(90vh + 60%); // Increased from 20% to 60%
    overflow-y: auto; // Added scroll if content exceeds height
    z-index: 1000;
    font-family: inherit;
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 22px; // Increased from 18px
    width: 100%;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #314549;
    border-radius: 8px; // Increased from 4px
    box-sizing: border-box;
    font-family: inherit;
    outline: none;
    
    &:focus {
        border-color: #253538;
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    border: 1px solid #314549;
    border-radius: 8px; // Increased from 4px
    min-height: 140px; // Increased from 100px
    box-sizing: border-box;
    font-family: inherit;
    outline: none;
    
    &:focus {
        border-color: #253538;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

export const Button = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 50px; // Updated to 50%
    cursor: pointer;
    font-weight: bold;

    &.cancel {
        background: #ddd;
    }

    &.submit {
        background: #f2be5e;
        color: white;
    }
    font-family: inherit;
`;

export const ErrorMessage = styled.span`
    color: red;
    font-size: 12px;
    margin-top: 4px;
    font-family: inherit;
`;

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    img {
        height: 60px;
        object-fit: contain;
    }
`;

export const Label = styled.label`
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 4px;
    color: #333;
`;

export const Select = styled.select`
    width: 100%;
    padding: 8px; // Reduced from 12px
    height: 36px; // Reduced from 42px
    border: 1px solid #314549;
    border-radius: 50px; // Match FileInputLabel border-radius
    box-sizing: border-box;
    background-color: white;
    font-family: inherit;
    outline: none;
    appearance: none;  // Added to ensure consistent styling
    padding-right: 30px;  // Added to make room for the dropdown arrow
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 16px;
    
    &:focus {
        border-color: #253538;
    }

    option:first-child {
        font-weight: 700;
    }

    option[value="new"] {
        font-weight: 700;
    }
`;


