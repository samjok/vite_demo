import { useState, type ChangeEvent, type FormEvent } from "react";
import "./LoginForm.css";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => Promise<void> | void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setSuccessMessage("Login successful!");
      // Reset form
      setFormData({
        email: "",
        password: "",
        rememberMe: false,
      });
    } catch (error) {
      setErrors({
        email: error instanceof Error ? error.message : "Login failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit}
      style={{ minWidth: "300px" }}
    >
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          disabled={isLoading}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <span className="error-message" id="email-error">
            {errors.email}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          disabled={isLoading}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <span className="error-message" id="password-error">
            {errors.password}
          </span>
        )}
      </div>

      <div className="form-group checkbox">
        <input
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <label htmlFor="rememberMe">Remember me</label>
      </div>

      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <div className="form-footer">
        <a href="#forgot">Forgot password?</a>
        <span className="separator">|</span>
        <a href="#signup">Sign up</a>
      </div>
    </form>
  );
};

export default LoginForm;
