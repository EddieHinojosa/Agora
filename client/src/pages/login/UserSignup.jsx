import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useLocation } from "react-router-dom";
import FormField from "../../components/Login/FormField";
import SelectField from "../../components/Login/SelectField";
import axios from "axios";
import debounce from "lodash/debounce";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  billingStreetAddress1: yup
    .string()
    .required("Billing Street Address is required"),
  billingStreetAddress2: yup.string(),
  billingZipcode: yup.string().required("Billing Zipcode is required"),
  billingCity: yup.string().required("Billing City is required"),
  billingState: yup.string().required("Billing State is required"),
  billingCountry: yup.string().required("Billing Country is required"),
  mailingStreetAddress1: yup
    .string()
    .required("Mailing Street Address is required"),
  mailingStreetAddress2: yup.string(),
  mailingZipcode: yup.string().required("Mailing Zipcode is required"),
  mailingCity: yup.string().required("Mailing City is required"),
  mailingState: yup.string().required("Mailing State is required"),
  mailingCountry: yup.string().required("Mailing Country is required"),
  username: yup.string().required("Username is required"),
  shopName: yup.string().required("Shop Name is required"),
});

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
const countries = ["United States", "Canada", "Mexico"];

const UserSignup = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [shopNameError, setShopNameError] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  useEffect(() => {
    if (location.state) {
      const { email, name, signupMessage } = location.state;
      setValue("email", email || "");
      setValue("firstName", name?.split(" ")[0] || "");
      setValue("lastName", name?.split(" ").slice(1).join(" ") || "");
      setSignupMessage(signupMessage || "");
    }
  }, [location.state, setValue]);

  const apiUrl =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_PROD_API_URL
      : import.meta.env.VITE_DEV_API_URL;

  const checkEmail = debounce(async (email) => {
    try {
      await axios.get(`${apiUrl}/api/auth/check-unique-email`, {
        params: { email },
      });
      setEmailError("");
    } catch (error) {
      setEmailError("Email already in use");
    }
  }, 500);

  const checkUsername = debounce(async (username) => {
    try {
      await axios.get(`${apiUrl}/api/auth/check-unique-username`, {
        params: { username },
      });
      setUsernameError("");
    } catch (error) {
      setUsernameError("Username already in use");
    }
  }, 500);

  const checkShopName = debounce(async (shopName) => {
    try {
      await axios.get(`${apiUrl}/api/auth/check-unique-shopname`, {
        params: { shopName },
      });
      setShopNameError("");
    } catch (error) {
      setShopNameError("Shop name already in use");
    }
  }, 500);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "email" && value.email) {
        checkEmail(value.email);
      } else if (name === "username" && value.username) {
        checkUsername(value.username);
      } else if (name === "shopName" && value.shopName) {
        checkShopName(value.shopName);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    try {
      await axios.post(`${apiUrl}/api/auth/register`, data);
      alert("Registration successful");
      navigate("/");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  const handleAddressCheck = () => {
    setValue("mailingStreetAddress1", watch("billingStreetAddress1"));
    setValue("mailingStreetAddress2", watch("billingStreetAddress2"));
    setValue("mailingZipcode", watch("billingZipcode"));
    setValue("mailingCity", watch("billingCity"));
    setValue("mailingState", watch("billingState"));
    setValue("mailingCountry", watch("billingCountry"));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">User Signup</h1>
      {signupMessage && (
        <p className="text-red-600 text-sm text-center">{signupMessage}</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="First Name"
          name="firstName"
          register={register}
          errors={errors}
        />
        <FormField
          label="Last Name"
          name="lastName"
          register={register}
          errors={errors}
        />
        <FormField
          label="Email"
          name="email"
          register={register}
          errors={errors}
        />
        {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
        <FormField
          label="Password"
          name="password"
          register={register}
          errors={errors}
          type="password"
        />
        <FormField
          label="Confirm Password"
          name="confirmPassword"
          register={register}
          errors={errors}
          type="password"
        />
        <FormField
          label="Billing Street Address 1"
          name="billingStreetAddress1"
          register={register}
          errors={errors}
        />
        <FormField
          label="Billing Street Address 2"
          name="billingStreetAddress2"
          register={register}
          errors={errors}
        />
        <FormField
          label="Billing Zipcode"
          name="billingZipcode"
          register={register}
          errors={errors}
        />
        <FormField
          label="Billing City"
          name="billingCity"
          register={register}
          errors={errors}
        />
        <SelectField
          label="Billing State"
          name="billingState"
          register={register}
          errors={errors}
          options={states}
        />
        <SelectField
          label="Billing Country"
          name="billingCountry"
          register={register}
          errors={errors}
          options={countries}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            onClick={handleAddressCheck}
          />
          <label className="ml-2 block text-sm text-gray-900">
            Mailing address same as billing
          </label>
        </div>

        <FormField
          label="Mailing Street Address 1"
          name="mailingStreetAddress1"
          register={register}
          errors={errors}
        />
        <FormField
          label="Mailing Street Address 2"
          name="mailingStreetAddress2"
          register={register}
          errors={errors}
        />
        <FormField
          label="Mailing Zipcode"
          name="mailingZipcode"
          register={register}
          errors={errors}
        />
        <FormField
          label="Mailing City"
          name="mailingCity"
          register={register}
          errors={errors}
        />
        <SelectField
          label="Mailing State"
          name="mailingState"
          register={register}
          errors={errors}
          options={states}
        />
        <SelectField
          label="Mailing Country"
          name="mailingCountry"
          register={register}
          errors={errors}
          options={countries}
        />

        <FormField
          label="Username"
          name="username"
          register={register}
          errors={errors}
        />
        {usernameError && (
          <p className="text-red-600 text-sm">{usernameError}</p>
        )}
        <FormField
          label="Shop Name"
          name="shopName"
          register={register}
          errors={errors}
        />
        {shopNameError && (
          <p className="text-red-600 text-sm">{shopNameError}</p>
        )}

        {signupMessage && (
          <p className="text-red-600 text-sm">{signupMessage}</p>
        )}

        <button
          type="submit"
          className="w-full mt-2 bg-black text-white text-sm hover:bg-gray-300 hover:text-black px-4 py-2 rounded-md"
          disabled={!isValid || emailError || usernameError || shopNameError}
        >
          Register
        </button>
        {(!isValid || emailError || usernameError || shopNameError) && (
          <p className="text-red-600 text-sm text-center mt-4">
            Please fill out all fields correctly before continuing.
          </p>
        )}
      </form>
    </div>
  );
};

export default UserSignup;
