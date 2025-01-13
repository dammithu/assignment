import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
import "./register.css";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(/^[A-Za-z\s]+$/, "Only letters are allowed"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[A-Za-z\s]+$/, "Only letters are allowed"),
  position: z.string().min(1, "Position is required"),
  company: z.string().min(1, "Company is required"),
  businessArena: z.string().min(1, "Business Arena is required"),
  employees: z.string().min(1, "Number of employees is required"),
  street: z.string().min(1, "Street is required"),
  additionalInfo: z.string().optional(),
  zipCode: z
    .string()
    .min(1, "Zip code is required")
    .regex(/^\d+$/, "Only numbers are allowed"),
  place: z.string().min(1, "Place is required"),
  country: z.string().min(1, "Country is required"),
  code: z
    .string()
    .min(1, "Code is required")
    .regex(/^\d+$/, "Only numbers are allowed"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Only numbers are allowed")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
});

const Register = () => {
  const [nameErrors, setNameErrors] = useState({
    firstName: "",
    lastName: "",
  });

  const [numericErrors, setNumericErrors] = useState({
    zipCode: "",
    code: "",
    phoneNumber: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      position: "",
      company: "",
      businessArena: "",
      employees: "",
      street: "",
      additionalInfo: "",
      zipCode: "",
      place: "",
      country: "",
      code: "",
      phoneNumber: "",
      email: "",
      acceptTerms: false,
    },
  });

  const handleNameInput = (e, fieldName) => {
    if (/[0-9]/.test(e.key)) {
      e.preventDefault();
      setNameErrors((prev) => ({
        ...prev,
        [fieldName]: "Numbers are not allowed in this field",
      }));

      setTimeout(() => {
        setNameErrors((prev) => ({
          ...prev,
          [fieldName]: "",
        }));
      }, 2000);
    }
  };

  const handleNumericInput = (e, fieldName) => {
    if (
      !/[0-9]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
      setNumericErrors((prev) => ({
        ...prev,
        [fieldName]: "Only numbers are allowed in this field",
      }));

      setTimeout(() => {
        setNumericErrors((prev) => ({
          ...prev,
          [fieldName]: "",
        }));
      }, 2000);
      return;
    }

    const currentValue = e.target.value;

    if (e.key.match(/[0-9]/) && currentValue.length >= 10) {
      e.preventDefault();
      setNumericErrors((prev) => ({
        ...prev,
        [fieldName]: "Maximum 10 digits allowed",
      }));

      setTimeout(() => {
        setNumericErrors((prev) => ({
          ...prev,
          [fieldName]: "",
        }));
      }, 2000);
    }
  };
  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await Swal.fire({
        title: "Success!",
        text: "Registration completed successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#4CAF50",
      });

      reset();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#f44336",
      });
    }
  };

  const onError = (errors) => {
    Swal.fire({
      title: "Validation Error",
      text: "Please check all required fields",
      icon: "warning",
      confirmButtonText: "OK",
      confirmButtonColor: "#ff9800",
    });
  };

  return (
    <div className="form-container">
      <form
        className="registration-form"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="form-section general-info">
          <h2>General Information</h2>

          <div className="form-group">
            <select {...register("title")}>
              <option value="">Title</option>
              <option value="mr">Mr.</option>
              <option value="mrs">Mrs.</option>
              <option value="ms">Ms.</option>
            </select>
            {errors.title && (
              <span className="error-msg">{errors.title.message}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
                onKeyPress={(e) => handleNameInput(e, "firstName")}
              />
              {(errors.firstName || nameErrors.firstName) && (
                <span className="error-msg">
                  {nameErrors.firstName || errors.firstName?.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
                onKeyPress={(e) => handleNameInput(e, "lastName")}
              />
              {(errors.lastName || nameErrors.lastName) && (
                <span className="error-msg">
                  {nameErrors.lastName || errors.lastName?.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <select {...register("position")}>
              <option value="">Position</option>
              <option value="manager">Manager</option>
              <option value="developer">Developer</option>
              <option value="tech-lead">Tech Lead</option>
              <option value="designer">Designer</option>
            </select>
            {errors.position && (
              <span className="error-msg">{errors.position.message}</span>
            )}
          </div>

          <div className="form-group">
            <input type="text" placeholder="Company" {...register("company")} />
            {errors.company && (
              <span className="error-msg">{errors.company.message}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                placeholder="Business Arena"
                {...register("businessArena")}
              />
              {errors.businessArena && (
                <span className="error-msg">
                  {errors.businessArena.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <select {...register("employees")}>
                <option value="">Employees</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
              </select>
              {errors.employees && (
                <span className="error-msg">{errors.employees.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-section contact-details">
          <h2>Contact Details</h2>

          <div className="form-group">
            <input
              type="text"
              placeholder="Street + Nr"
              {...register("street")}
            />
            {errors.street && (
              <span className="error-msg">{errors.street.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Additional Information"
              {...register("additionalInfo")}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                placeholder="Zip Code"
                {...register("zipCode")}
                onKeyDown={(e) => handleNumericInput(e, "zipCode")}
              />
              {(errors.zipCode || numericErrors.zipCode) && (
                <span className="error-msg">
                  {numericErrors.zipCode || errors.zipCode?.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <select {...register("place")}>
                <option value="">Place</option>
                <option value="matara">Matara</option>
                <option value="colombo">Colombo</option>
                <option value="galle">Galle</option>
              </select>
              {errors.place && (
                <span className="error-msg">{errors.place.message}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <select {...register("country")}>
              <option value="">Country</option>
              <option value="us">United States</option>
              <option value="in">India</option>
              <option value="nl">Netherland</option>
              <option value="ae">UAE</option>
            </select>
            {errors.country && (
              <span className="error-msg">{errors.country.message}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                placeholder="Code +"
                {...register("code")}
                onKeyDown={(e) => handleNumericInput(e, "code")}
              />
              {(errors.code || numericErrors.code) && (
                <span className="error-msg">
                  {numericErrors.code || errors.code?.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <input
                type="tel"
                placeholder="Phone Number"
                {...register("phoneNumber")}
                onKeyDown={(e) => handleNumericInput(e, "phoneNumber")}
              />
              {(errors.phoneNumber || numericErrors.phoneNumber) && (
                <span className="error-msg">
                  {numericErrors.phoneNumber || errors.phoneNumber?.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              {...register("email")}
            />
            {errors.email && (
              <span className="error-msg">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="acceptTerms"
              {...register("acceptTerms")}
            />
            <label htmlFor="acceptTerms">
              I do accept the Terms and Conditions of your site.
            </label>
            {errors.acceptTerms && (
              <span className="error-msg">{errors.acceptTerms.message}</span>
            )}
          </div>

          <button type="submit" className="register-button">
            Register Badge
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
