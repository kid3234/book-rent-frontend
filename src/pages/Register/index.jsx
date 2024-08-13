import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  location: Yup.string().required("Location is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .required("Phone number is required"),
  acceptedTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the Terms and Conditions"
  ),
});

function Register() {
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
      location: "",
      phone: "",
      acceptedTerms: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const data = {
        email: values.email,
        password: values.password,
        location: values.location,
        phone: values.phone,
      };

      try {
      const res =  await axios.post("https://book-rent-api-2.onrender.com/api/V1/auth/register", data);
      toast.success(res.data.message)
        navigate("/login");
      } catch (err) {
      
        toast.error(err.response.data.error)
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full min-h-screen flex">
      <div className="w-1/2 min-h-screen bg-[#171B36] flex justify-center items-center">
        <svg
          width="378"
          height="209"
          viewBox="0 0 378 209"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <svg
          width="378"
          height="209"
          viewBox="0 0 378 209"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 49.4717H29.2202L20.0352 24.1189H46.892L39.4796 0.108849C72.7283 2.31111 102.325 14.1818 130.793 29.4902C106.085 22.8835 81.806 14.8801 55.2714 11.5499C57.5274 18.6401 59.6759 24.6023 61.2873 30.7257C71.2423 69.2921 81.054 107.912 90.7224 146.586C92.1727 151.957 91.4744 159.477 94.8584 163.022C98.2423 166.568 105.225 165.332 110.65 166.084C132.404 169.146 153.621 173.712 172.958 185.045C176.727 187.352 180.318 189.937 183.701 192.78C140.83 189.678 97.772 195.157 57.0439 208.894C44.7435 153.837 28.3071 100.07 0 49.4717ZM35.451 32.1222C37.3847 36.7953 38.9424 40.5016 40.4464 44.2615C56.3376 86.3664 69.2605 129.532 79.1203 173.443C80.4631 178.814 82.6654 179.942 87.8219 179.781C101.734 179.351 115.646 179.298 129.557 179.781C137.776 179.781 145.994 181.446 154.212 182.359C152.716 180.926 150.86 179.924 148.841 179.459C130.912 175.048 112.443 173.239 93.999 174.088C88.6276 174.088 86.7476 172.53 85.4585 167.534C73.7489 123.274 61.9319 79.1754 50.276 35.1302C49.6852 32.9279 48.8257 30.8331 48.0738 28.5234L35.451 32.1222ZM72.2449 191.706L31.8522 53.6614L18.2089 58.0122C38.2045 103.155 53.922 150.073 65.1547 198.151L97.7589 189.557L97.4366 187.999L72.2449 191.706Z"
            fill="white"
          />
          <path
            d="M322.497 10.1519L245.901 29.5425C275.497 14.2878 304.986 2.41712 338.45 0L330.984 24.0637H357.84L348.441 49.2555H377.661C349.945 100.069 333.025 153.567 320.832 209C279.871 195.08 236.479 189.759 193.369 193.369C203.071 184.609 214.759 178.342 227.424 175.107C243.538 170.917 260.458 168.124 277.055 165.277C281.943 164.418 284.038 163.182 285.112 157.757C293.763 109.427 305.953 61.7983 321.584 15.2547C321.852 14.449 321.906 13.5896 322.497 10.1519ZM330.017 28.4145C329.211 30.5094 328.405 32.2282 327.868 33.7859C324.538 45.7641 321.047 57.6885 317.931 69.7204C309.516 102.271 301.173 134.839 292.901 167.426C291.719 171.991 289.57 173.549 284.521 173.71C269.75 174.194 254.979 175.268 240.261 176.772C234.079 177.789 227.976 179.243 221.999 181.123L297.627 177.685C309.659 129.343 322.282 79.8186 342.371 31.8522L330.017 28.4145ZM312.936 198.204C324.042 150.068 339.726 103.106 359.774 57.9571L346.185 53.7137C332.541 100.176 319.328 145.994 305.792 191.543L281.352 188.052V189.663L312.936 198.204Z"
            fill="white"
          />
          <path
            d="M35.4504 32.1206L48.0732 28.4143C48.8252 30.724 49.6846 32.8189 50.2754 35.0211C61.9313 79.0664 73.6409 123.165 85.0819 167.318C86.371 172.313 88.0362 174.086 93.6224 173.871C112.066 173.022 130.536 174.831 148.464 179.242C150.483 179.707 152.339 180.71 153.835 182.143C145.617 181.23 137.399 179.78 129.181 179.565C115.269 179.081 101.357 179.135 87.4453 179.565C82.0739 179.565 80.0865 178.705 78.7437 173.226C68.9849 129.489 56.1879 86.4854 40.4458 44.5285C38.9418 40.4999 37.3841 36.7937 35.4504 32.1206Z"
            fill="#171B36"
          />
          <path
            d="M72.2445 191.704L97.4362 187.891L97.7585 189.448L65.1543 198.15C53.9215 150.072 38.2041 103.153 18.2085 58.0108L31.8518 53.66L72.2445 191.704Z"
            fill="#171B36"
          />
          <path
            d="M330.015 28.4143L342.369 32.0669C322.28 80.0332 309.658 129.557 297.626 177.9L221.997 181.337C227.974 179.458 234.077 178.004 240.259 176.986C254.977 175.482 269.748 174.408 284.52 173.925C289.569 173.925 291.717 172.206 292.899 167.64C301.171 135.054 309.514 102.486 317.929 69.935C321.045 57.9032 324.536 45.9787 327.866 34.0006C328.404 32.3354 329.209 30.6166 330.015 28.4143Z"
            fill="#171B36"
          />
          <path
            d="M312.936 198.204L281.138 189.556V187.944L305.577 191.436C318.898 145.887 332.434 100.122 345.97 53.6064L359.56 57.8498C339.579 103.041 323.967 150.039 312.936 198.204Z"
            fill="#171B36"
          />
        </svg>
        </svg>
      </div>

      <div className="w-1/2 min-h-screen flex flex-col gap-4 justify-center items-center">
        <div className="w-full lg:w-3/4 h-fit p-2 lg:p-4 flex flex-col gap-4">
          <div className="flex gap-4">
            <svg
              width="60"
              height="33"
              viewBox="0 0 60 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <svg
              width="60"
              height="33"
              viewBox="0 0 60 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 7.8114H4.61372L3.16345 3.80831H7.40401L6.23361 0.0172577C11.4834 0.364983 16.1565 2.23931 20.6515 4.65643C16.7502 3.61325 12.9167 2.34956 8.72706 1.82373C9.08327 2.94324 9.42251 3.88464 9.67695 4.85149C11.2488 10.9409 12.798 17.0388 14.3246 23.1452C14.5536 23.9934 14.4433 25.1807 14.9776 25.7405C15.5119 26.3002 16.6145 26.1052 17.4711 26.2239C20.9059 26.7073 24.256 27.4282 27.3092 29.2177C27.9042 29.582 28.4712 29.9902 29.0054 30.439C22.2364 29.9493 15.4377 30.8143 9.00694 32.9833C7.06476 24.2902 4.46954 15.8006 0 7.8114ZM5.59753 5.072C5.90285 5.80985 6.1488 6.39505 6.38627 6.98873C8.89541 13.6369 10.9359 20.4526 12.4927 27.3858C12.7047 28.2339 13.0524 28.412 13.8666 28.3866C16.0632 28.3187 18.2598 28.3102 20.4564 28.3866C21.754 28.3866 23.0517 28.6495 24.3493 28.7937C24.113 28.5674 23.82 28.4091 23.5012 28.3357C20.6704 27.6392 17.7541 27.3536 14.8419 27.4876C13.9938 27.4876 13.697 27.2416 13.4934 26.4529C11.6446 19.4644 9.77872 12.5015 7.93832 5.54694C7.84503 5.19922 7.70933 4.86845 7.59059 4.50377L5.59753 5.072ZM11.4071 30.2694L5.0293 8.47293L2.8751 9.15989C6.03229 16.2877 8.51399 23.6958 10.2876 31.2871L15.4356 29.9301L15.3847 29.6842L11.4071 30.2694Z"
                fill="#00ABFF"
              />
              <path
                d="M50.9206 1.60293L38.8265 4.66461C43.4996 2.25598 48.1557 0.38165 53.4395 0L52.2606 3.79954H56.5011L55.0169 7.77718H59.6307C55.2544 15.8003 52.5829 24.2475 50.6577 33C44.1902 30.8021 37.3389 29.9619 30.532 30.532C32.0639 29.1489 33.9093 28.1592 35.909 27.6484C38.4533 26.9869 41.1249 26.5459 43.7456 26.0964C44.5173 25.9607 44.8481 25.7656 45.0177 24.909C46.3837 17.278 48.3084 9.75762 50.7764 2.40864C50.8188 2.28142 50.8273 2.14572 50.9206 1.60293ZM52.1079 4.48651C51.9807 4.81727 51.8535 5.08867 51.7687 5.33462C51.2429 7.22591 50.6916 9.10871 50.1997 11.0085C48.871 16.148 47.5536 21.2904 46.2475 26.4356C46.0609 27.1565 45.7217 27.4025 44.9244 27.4279C42.5921 27.5042 40.2598 27.6739 37.936 27.9113C36.9598 28.072 35.9962 28.3015 35.0524 28.5983L46.9938 28.0555C48.8936 20.4225 50.8866 12.6029 54.0586 5.0293L52.1079 4.48651ZM49.4109 31.2953C51.1646 23.695 53.641 16.2799 56.8065 9.15112L54.6607 8.48111C52.5065 15.8173 50.4202 23.0517 48.2829 30.2436L44.424 29.6924V29.9468L49.4109 31.2953Z"
                fill="#00ABFF"
              />
              <path
                d="M5.59741 5.0716L7.59047 4.4864C7.70921 4.85109 7.84491 5.18185 7.9382 5.52958C9.7786 12.4841 11.6275 19.4471 13.434 26.4186C13.6375 27.2073 13.9004 27.4872 14.7825 27.4532C17.6946 27.3193 20.6109 27.6049 23.4417 28.3014C23.7605 28.3748 24.0535 28.533 24.2898 28.7593C22.9922 28.6152 21.6946 28.3862 20.3969 28.3522C18.2003 28.2759 16.0037 28.2844 13.8071 28.3522C12.959 28.3522 12.6452 28.2165 12.4332 27.3515C10.8923 20.4456 8.87175 13.6555 6.38616 7.03074C6.14868 6.39465 5.90273 5.80946 5.59741 5.0716Z"
                fill="white"
              />
              <path
                d="M11.407 30.2692L15.3846 29.667L15.4355 29.9129L10.2875 31.2869C8.5139 23.6956 6.0322 16.2874 2.875 9.15967L5.0292 8.4727L11.407 30.2692Z"
                fill="white"
              />
              <path
                d="M52.1078 4.4864L54.0584 5.06312C50.8865 12.6368 48.8934 20.4563 46.9936 28.0893L35.0522 28.6321C35.996 28.3354 36.9596 28.1058 37.9358 27.9452C40.2596 27.7077 42.592 27.5381 44.9243 27.4617C45.7215 27.4617 46.0607 27.1903 46.2473 26.4694C47.5534 21.3242 48.8708 16.1819 50.1995 11.0423C50.6914 9.14253 51.2427 7.25973 51.7685 5.36844C51.8533 5.10553 51.9805 4.83413 52.1078 4.4864Z"
                fill="white"
              />
              <path
                d="M49.411 31.2952L44.3901 29.9298V29.6753L48.249 30.2266C50.3524 23.0346 52.4896 15.8087 54.6268 8.46408L56.7726 9.13409C53.6177 16.2695 51.1526 23.6904 49.411 31.2952Z"
                fill="white"
              />
            </svg>
            </svg>
            <p className="font-bold text-lg">Book Rent</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Signup as Owner</p>
            <hr />
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col gap-4"
          >
            <TextField
              id="outlined-email-input"
              label="Email address"
              type="email"
              autoComplete="current-email"
              sx={{ width: "100%" }}
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              sx={{ width: "100%" }}
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <TextField
              id="outlined-cpassword-input"
              label="Confirm Password"
              type="password"
              sx={{ width: "100%" }}
              {...formik.getFieldProps("cpassword")}
              error={formik.touched.cpassword && Boolean(formik.errors.cpassword)}
              helperText={formik.touched.cpassword && formik.errors.cpassword}
            />

            <TextField
              id="outlined-location-input"
              label="Location"
              sx={{ width: "100%" }}
              {...formik.getFieldProps("location")}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />

            <TextField
              id="outlined-phone-input"
              label="Phone"
              sx={{ width: "100%" }}
              {...formik.getFieldProps("phone")}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                {...formik.getFieldProps("acceptedTerms")}
              />
              <span className="ml-2 text-gray-700">I accept the Terms and Conditions</span>
              {formik.touched.acceptedTerms && formik.errors.acceptedTerms && (
                <div className="text-red-500 text-sm ml-4">{formik.errors.acceptedTerms}</div>
              )}
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "#00ABFF" }}
            >
              SIGN UP
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Already have an account?{" "}
              <a href="/login" className="text-[#00ABFF]">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
