import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function SideBar() {
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    setUserRole(localStorage.getItem("role"));
    console.log(userRole);
  }, []);

  return (
    <div className="bg-[#171B36] rounded-lg min-h-[95%] w-[240px] fixed left-2 top-4 text-[#FFFF] p-4 flex flex-col gap-8 z-50">
      <div className="flex gap-4 items-center">
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 7H17M1 1H17M1 13H17"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <svg
          width="131"
          height="22"
          viewBox="0 0 131 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 5.47083H2.93601L2.01311 2.92342H4.71164L3.96685 0.510925C7.30763 0.732205 10.2814 1.92496 13.1419 3.46312C10.6592 2.79928 8.21974 1.99512 5.55359 1.6605C5.78026 2.37291 5.99614 2.97199 6.15806 3.58726C7.15831 7.46235 8.14418 11.3428 9.11565 15.2287C9.26137 15.7684 9.19121 16.524 9.53122 16.8802C9.87124 17.2364 10.5729 17.1123 11.118 17.1879C13.3038 17.4955 15.4356 17.9543 17.3786 19.093C17.7572 19.3248 18.118 19.5846 18.458 19.8702C14.1504 19.5586 9.82398 20.109 5.73169 21.4893C4.49576 15.9573 2.84426 10.5549 0 5.47083ZM3.56207 3.72758C3.75636 4.19712 3.91287 4.56952 4.06399 4.94732C5.66072 9.17795 6.95919 13.5152 7.94988 17.9273C8.08481 18.467 8.30609 18.5803 8.82421 18.5641C10.222 18.5209 11.6199 18.5155 13.0177 18.5641C13.8435 18.5641 14.6692 18.7314 15.495 18.8232C15.3446 18.6792 15.1582 18.5785 14.9553 18.5317C13.1539 18.0885 11.2981 17.9068 9.44487 17.992C8.90516 17.992 8.71627 17.8355 8.58674 17.3336C7.41018 12.8864 6.22282 8.45541 5.05166 4.02981C4.99229 3.80853 4.90594 3.59805 4.83038 3.36598L3.56207 3.72758ZM7.25906 19.7623L3.20046 5.8918L1.82961 6.32897C3.83873 10.8648 5.418 15.5791 6.54665 20.4099L9.82267 19.5464L9.79028 19.3899L7.25906 19.7623Z"
            fill="#00ABFF"
          />
          <path
            d="M32.404 1.52005L24.7078 3.46839C27.6816 1.93562 30.6446 0.742868 34.0069 0.5L33.2567 2.91789H35.9553L35.0108 5.44911H37.9468C35.1619 10.5547 33.4618 15.9302 32.2367 21.5C28.121 20.1013 23.7611 19.5667 19.4294 19.9295C20.4043 19.0493 21.5786 18.4195 22.8512 18.0944C24.4703 17.6735 26.1704 17.3928 27.8381 17.1068C28.3292 17.0204 28.5397 16.8963 28.6476 16.3512C29.5169 11.4951 30.7417 6.70939 32.3122 2.03277C32.3392 1.95181 32.3446 1.86546 32.404 1.52005ZM33.1596 3.35505C33.0786 3.56554 32.9977 3.73824 32.9437 3.89476C32.6091 5.0983 32.2583 6.29645 31.9452 7.5054C31.0997 10.776 30.2614 14.0484 29.4302 17.3227C29.3115 17.7814 29.0956 17.9379 28.5883 17.9541C27.1041 18.0027 25.6199 18.1106 24.1411 18.2618C23.5199 18.364 22.9067 18.5101 22.3061 18.6989L29.9052 18.3535C31.1141 13.4961 32.3824 8.52005 34.4009 3.70046L33.1596 3.35505ZM31.4433 20.4152C32.5593 15.5787 34.1352 10.8599 36.1496 6.32344L34.7841 5.89707C33.4133 10.5655 32.0856 15.1692 30.7255 19.746L28.2698 19.3951V19.5571L31.4433 20.4152Z"
            fill="#00ABFF"
          />
          <path
            d="M3.56201 3.72744L4.83032 3.35504C4.90588 3.58712 4.99224 3.7976 5.0516 4.01888C6.22277 8.44448 7.39933 12.8755 8.5489 17.3119C8.67843 17.8138 8.84574 17.9919 9.40704 17.9703C11.2602 17.885 13.116 18.0668 14.9174 18.51C15.1203 18.5567 15.3068 18.6574 15.4572 18.8015C14.6314 18.7097 13.8056 18.564 12.9799 18.5424C11.5821 18.4938 10.1842 18.4992 8.78637 18.5424C8.24667 18.5424 8.04698 18.456 7.91205 17.9055C6.93151 13.5109 5.64568 9.18993 4.06394 4.97416C3.91282 4.56938 3.75631 4.19698 3.56201 3.72744Z"
            fill="#171B36"
          />
          <path
            d="M7.25898 19.7621L9.79021 19.3789L9.82259 19.5355L6.54657 20.4098C5.41792 15.579 3.83865 10.8647 1.82953 6.32882L3.20038 5.89166L7.25898 19.7621Z"
            fill="#171B36"
          />
          <path
            d="M33.1595 3.35504L34.4009 3.72204C32.3824 8.54163 31.114 13.5177 29.9051 18.3751L22.306 18.7205C22.9066 18.5316 23.5198 18.3856 24.141 18.2833C25.6198 18.1322 27.104 18.0243 28.5882 17.9757C29.0955 17.9757 29.3114 17.803 29.4302 17.3442C30.2613 14.07 31.0997 10.7976 31.9452 7.52698C32.2582 6.31803 32.609 5.11988 32.9437 3.91634C32.9976 3.74903 33.0786 3.57632 33.1595 3.35504Z"
            fill="#171B36"
          />
          <path
            d="M31.4433 20.4152L28.2482 19.5463V19.3844L30.7039 19.7352C32.0424 15.1585 33.4024 10.5602 34.7625 5.88629L36.128 6.31266C34.1203 10.8534 32.5516 15.5757 31.4433 20.4152Z"
            fill="#171B36"
          />
          <path
            d="M52 17.3V4.5H56.2687C57.1193 4.5 57.8208 4.65417 58.3733 4.9625C58.9258 5.26667 59.3371 5.67708 59.6074 6.19375C59.8777 6.70625 60.0128 7.275 60.0128 7.9C60.0128 8.45 59.9194 8.90417 59.7326 9.2625C59.5498 9.62083 59.3073 9.90417 59.0053 10.1125C58.7072 10.3208 58.3832 10.475 58.0335 10.575V10.7C58.4071 10.725 58.7827 10.8625 59.1603 11.1125C59.5379 11.3625 59.8538 11.7208 60.1082 12.1875C60.3626 12.6542 60.4898 13.225 60.4898 13.9C60.4898 14.5417 60.3507 15.1187 60.0724 15.6312C59.7942 16.1438 59.355 16.55 58.7549 16.85C58.1547 17.15 57.3737 17.3 56.4118 17.3H52ZM53.4786 15.925H56.4118C57.3777 15.925 58.0633 15.7292 58.4687 15.3375C58.8781 14.9417 59.0828 14.4625 59.0828 13.9C59.0828 13.4667 58.9774 13.0667 58.7668 12.7C58.5561 12.3292 58.256 12.0333 57.8665 11.8125C57.477 11.5875 57.016 11.475 56.4834 11.475H53.4786V15.925ZM53.4786 10.125H56.221C56.6662 10.125 57.0676 10.0333 57.4254 9.85C57.787 9.66667 58.0732 9.40833 58.2839 9.075C58.4985 8.74167 58.6058 8.35 58.6058 7.9C58.6058 7.3375 58.419 6.86042 58.0454 6.46875C57.6718 6.07292 57.0796 5.875 56.2687 5.875H53.4786V10.125Z"
            fill="#00ABFF"
          />
          <path
            d="M66.4487 17.5C65.622 17.5 64.8966 17.2937 64.2726 16.8813C63.6526 16.4688 63.1677 15.8917 62.8179 15.15C62.4721 14.4083 62.2992 13.5417 62.2992 12.55C62.2992 11.55 62.4721 10.6771 62.8179 9.93125C63.1677 9.18542 63.6526 8.60625 64.2726 8.19375C64.8966 7.78125 65.622 7.575 66.4487 7.575C67.2754 7.575 67.9988 7.78125 68.6189 8.19375C69.2429 8.60625 69.7278 9.18542 70.0736 9.93125C70.4233 10.6771 70.5982 11.55 70.5982 12.55C70.5982 13.5417 70.4233 14.4083 70.0736 15.15C69.7278 15.8917 69.2429 16.4688 68.6189 16.8813C67.9988 17.2937 67.2754 17.5 66.4487 17.5ZM66.4487 16.175C67.0767 16.175 67.5934 16.0062 67.9988 15.6687C68.4042 15.3312 68.7043 14.8875 68.8991 14.3375C69.0938 13.7875 69.1912 13.1917 69.1912 12.55C69.1912 11.9083 69.0938 11.3104 68.8991 10.7562C68.7043 10.2021 68.4042 9.75417 67.9988 9.4125C67.5934 9.07083 67.0767 8.9 66.4487 8.9C65.8207 8.9 65.304 9.07083 64.8986 9.4125C64.4932 9.75417 64.1931 10.2021 63.9984 10.7562C63.8036 11.3104 63.7062 11.9083 63.7062 12.55C63.7062 13.1917 63.8036 13.7875 63.9984 14.3375C64.1931 14.8875 64.4932 15.3312 64.8986 15.6687C65.304 16.0062 65.8207 16.175 66.4487 16.175Z"
            fill="#00ABFF"
          />
          <path
            d="M76.4663 17.5C75.6395 17.5 74.9142 17.2937 74.2902 16.8813C73.6701 16.4688 73.1852 15.8917 72.8354 15.15C72.4897 14.4083 72.3168 13.5417 72.3168 12.55C72.3168 11.55 72.4897 10.6771 72.8354 9.93125C73.1852 9.18542 73.6701 8.60625 74.2902 8.19375C74.9142 7.78125 75.6395 7.575 76.4663 7.575C77.293 7.575 78.0164 7.78125 78.6364 8.19375C79.2604 8.60625 79.7453 9.18542 80.0911 9.93125C80.4409 10.6771 80.6158 11.55 80.6158 12.55C80.6158 13.5417 80.4409 14.4083 80.0911 15.15C79.7453 15.8917 79.2604 16.4688 78.6364 16.8813C78.0164 17.2937 77.293 17.5 76.4663 17.5ZM76.4663 16.175C77.0942 16.175 77.6109 16.0062 78.0164 15.6687C78.4218 15.3312 78.7219 14.8875 78.9166 14.3375C79.1114 13.7875 79.2087 13.1917 79.2087 12.55C79.2087 11.9083 79.1114 11.3104 78.9166 10.7562C78.7219 10.2021 78.4218 9.75417 78.0164 9.4125C77.6109 9.07083 77.0942 8.9 76.4663 8.9C75.8383 8.9 75.3216 9.07083 74.9162 9.4125C74.5107 9.75417 74.2107 10.2021 74.0159 10.7562C73.8211 11.3104 73.7238 11.9083 73.7238 12.55C73.7238 13.1917 73.8211 13.7875 74.0159 14.3375C74.2107 14.8875 74.5107 15.3312 74.9162 15.6687C75.3216 16.0062 75.8383 16.175 76.4663 16.175Z"
            fill="#00ABFF"
          />
          <path
            d="M84.0752 13.8L84.0513 11.975H84.3375L88.3439 7.7H90.0848L85.816 12.225H85.6968L84.0752 13.8ZM82.7635 17.3V4.5H84.1706V17.3H82.7635ZM88.5824 17.3L85.0052 12.55L86.0068 11.525L90.371 17.3H88.5824Z"
            fill="#00ABFF"
          />
          <path
            d="M96.8084 17.3V4.5H100.934C101.888 4.5 102.671 4.67083 103.283 5.0125C103.895 5.35 104.348 5.81458 104.642 6.40625C104.936 6.99792 105.084 7.67083 105.084 8.425C105.084 9.17917 104.936 9.84792 104.642 10.4312C104.348 11.0146 103.897 11.4729 103.289 11.8062C102.681 12.1354 101.904 12.3 100.958 12.3H97.6192V10.9H100.91C101.562 10.9 102.087 10.8 102.484 10.6C102.886 10.4 103.176 10.1167 103.355 9.75C103.537 9.37917 103.629 8.9375 103.629 8.425C103.629 7.9125 103.537 7.46458 103.355 7.08125C103.172 6.69792 102.88 6.40208 102.478 6.19375C102.077 5.98125 101.546 5.875 100.886 5.875H98.2869V17.3H96.8084ZM102.556 11.55L105.56 17.3H103.843L100.886 11.55H102.556Z"
            fill="#00ABFF"
          />
          <path
            d="M111.098 17.5C110.215 17.5 109.454 17.2958 108.814 16.8875C108.178 16.475 107.687 15.9 107.342 15.1625C107 14.4208 106.829 13.5583 106.829 12.575C106.829 11.5917 107 10.725 107.342 9.975C107.687 9.22083 108.168 8.63333 108.784 8.2125C109.404 7.7875 110.128 7.575 110.955 7.575C111.431 7.575 111.902 7.65833 112.367 7.825C112.833 7.99167 113.256 8.2625 113.637 8.6375C114.019 9.00833 114.323 9.5 114.55 10.1125C114.776 10.725 114.889 11.4792 114.889 12.375V13H107.83V11.725H113.459C113.459 11.1833 113.355 10.7 113.149 10.275C112.946 9.85 112.656 9.51458 112.278 9.26875C111.904 9.02292 111.463 8.9 110.955 8.9C110.394 8.9 109.909 9.04583 109.5 9.3375C109.094 9.625 108.782 10 108.564 10.4625C108.345 10.925 108.236 11.4208 108.236 11.95V12.8C108.236 13.525 108.355 14.1396 108.594 14.6438C108.836 15.1438 109.172 15.525 109.601 15.7875C110.03 16.0458 110.529 16.175 111.098 16.175C111.467 16.175 111.801 16.1208 112.099 16.0125C112.401 15.9 112.662 15.7333 112.88 15.5125C113.099 15.2875 113.268 15.0083 113.387 14.675L114.746 15.075C114.603 15.5583 114.363 15.9833 114.025 16.35C113.687 16.7125 113.27 16.9958 112.773 17.2C112.276 17.4 111.718 17.5 111.098 17.5Z"
            fill="#00ABFF"
          />
          <path
            d="M118.437 11.525V17.3H117.03V7.7H118.389V9.2H118.508C118.723 8.7125 119.049 8.32083 119.486 8.025C119.923 7.725 120.488 7.575 121.179 7.575C121.799 7.575 122.342 7.70833 122.807 7.975C123.272 8.2375 123.634 8.6375 123.892 9.175C124.15 9.70833 124.279 10.3833 124.279 11.2V17.3H122.872V11.3C122.872 10.5458 122.686 9.95833 122.312 9.5375C121.938 9.1125 121.426 8.9 120.774 8.9C120.325 8.9 119.923 9.00208 119.569 9.20625C119.22 9.41042 118.943 9.70833 118.741 10.1C118.538 10.4917 118.437 10.9667 118.437 11.525Z"
            fill="#00ABFF"
          />
          <path
            d="M130.833 7.7V8.95H126.087V7.7H130.833ZM127.471 5.4H128.878V14.55C128.878 14.9667 128.935 15.2792 129.05 15.4875C129.17 15.6917 129.321 15.8292 129.504 15.9C129.69 15.9667 129.887 16 130.094 16C130.249 16 130.376 15.9917 130.475 15.975C130.575 15.9542 130.654 15.9375 130.714 15.925L131 17.25C130.905 17.2875 130.771 17.325 130.601 17.3625C130.43 17.4042 130.213 17.425 129.951 17.425C129.553 17.425 129.164 17.3354 128.782 17.1562C128.405 16.9771 128.091 16.7042 127.84 16.3375C127.594 15.9708 127.471 15.5083 127.471 14.95V5.4Z"
            fill="#00ABFF"
          />
        </svg>
      </div>

      <hr />

      <div className="flex flex-col gap-2">
        <NavLink to={userRole === "admin" ? "/admin/dashboard" : "/owner/dashboard"} 
          style={({ isActive }) => ({
            textDecoration: "none",
            background: isActive ? "#00ABFF" : "",

            borderRadius: 4,
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          <div className="flex gap-2 p-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H10V21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5ZM14 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V10H14V3ZM14 14H22V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H14V14Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Dashboard
          </div>
        </NavLink>

        <NavLink
          to={userRole === "admin" ? "/admin/books" : "/owner/bookUpload"}
          style={({ isActive }) => ({
            textDecoration: "none",
            background: isActive ? "#00ABFF" : "",
            borderRadius: 4,
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          <div className="flex gap-2 p-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 2.25H6.75C5.95435 2.25 5.19129 2.56607 4.62868 3.12868C4.06607 3.69129 3.75 4.45435 3.75 5.25V21C3.75 21.1989 3.82902 21.3897 3.96967 21.5303C4.11032 21.671 4.30109 21.75 4.5 21.75H18C18.1989 21.75 18.3897 21.671 18.5303 21.5303C18.671 21.3897 18.75 21.1989 18.75 21C18.75 20.8011 18.671 20.6103 18.5303 20.4697C18.3897 20.329 18.1989 20.25 18 20.25H5.25C5.25 19.8522 5.40804 19.4706 5.68934 19.1893C5.97064 18.908 6.35218 18.75 6.75 18.75H19.5C19.6989 18.75 19.8897 18.671 20.0303 18.5303C20.171 18.3897 20.25 18.1989 20.25 18V3C20.25 2.80109 20.171 2.61032 20.0303 2.46967C19.8897 2.32902 19.6989 2.25 19.5 2.25ZM18.75 17.25H6.75C6.22325 17.2492 5.70569 17.388 5.25 17.6522V5.25C5.25 4.85218 5.40804 4.47064 5.68934 4.18934C5.97064 3.90804 6.35218 3.75 6.75 3.75H18.75V17.25Z"
                fill="white"
                fill-opacity="0.75"
              />
            </svg>

            {userRole === "admin" ? "Books" : "Book Upload"}
          </div>
        </NavLink>

        {
          userRole === "admin" ? (
            <NavLink
          to="/admin/owners"
          style={({ isActive }) => ({
            textDecoration: "none",
            background: isActive ? "#00ABFF" : "",

            borderRadius: 4,
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          <div className="flex gap-2 p-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 18C4 16.9391 4.42143 15.9217 5.17157 15.1716C5.92172 14.4214 6.93913 14 8 14H16C17.0609 14 18.0783 14.4214 18.8284 15.1716C19.5786 15.9217 20 16.9391 20 18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18Z"
                stroke="white"
                stroke-opacity="0.75"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10Z"
                stroke="white"
                stroke-opacity="0.75"
                stroke-width="1.5"
              />
            </svg>
            Owners
          </div>
        </NavLink>
          ): ''
        }

        

        <div className="flex gap-2 p-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3995 2.10051L2.20697 11.293C2.0195 11.4805 1.91418 11.7348 1.91418 12C1.91418 12.2652 2.0195 12.5195 2.20697 12.707L11.4 21.9C11.5875 22.0875 11.8418 22.1928 12.107 22.1928C12.3721 22.1928 12.6264 22.0875 12.814 21.9L22.0065 12.7075C22.1939 12.52 22.2993 12.2657 22.2993 12.0005C22.2993 11.7353 22.1939 11.481 22.0065 11.2935L12.8135 2.10001C12.6259 1.91254 12.3716 1.80722 12.1065 1.80722C11.8413 1.80722 11.587 1.91254 11.3995 2.10001V2.10051Z"
              stroke="white"
              stroke-opacity="0.75"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M9 12H15M12 9V15"
              stroke="white"
              stroke-opacity="0.75"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          Other
        </div>

        <hr />
      </div>

      <ListItem
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "100%",
          padding: 0,
        }}
      >
        <div className="flex gap-2 p-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
              stroke="white"
              stroke-opacity="0.75"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
              stroke="white"
              stroke-opacity="0.75"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Notification
        </div>
        <div className="flex gap-2 p-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9999 14.3466C13.2959 14.3466 14.3465 13.296 14.3465 12C14.3465 10.704 13.2959 9.65341 11.9999 9.65341C10.7039 9.65341 9.65332 10.704 9.65332 12C9.65332 13.296 10.7039 14.3466 11.9999 14.3466Z"
              stroke="white"
              stroke-opacity="0.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.0545 14.4545C17.9456 14.7013 17.9131 14.9751 17.9613 15.2405C18.0094 15.5059 18.1359 15.7508 18.3245 15.9436L18.3736 15.9927C18.5258 16.1447 18.6465 16.3252 18.7288 16.5238C18.8112 16.7225 18.8536 16.9354 18.8536 17.1505C18.8536 17.3655 18.8112 17.5784 18.7288 17.7771C18.6465 17.9757 18.5258 18.1562 18.3736 18.3082C18.2217 18.4603 18.0412 18.581 17.8425 18.6634C17.6439 18.7457 17.431 18.7881 17.2159 18.7881C17.0009 18.7881 16.7879 18.7457 16.5893 18.6634C16.3906 18.581 16.2102 18.4603 16.0582 18.3082L16.0091 18.2591C15.8163 18.0705 15.5714 17.9439 15.3059 17.8958C15.0405 17.8477 14.7668 17.8802 14.52 17.9891C14.278 18.0928 14.0716 18.265 13.9263 18.4845C13.7809 18.704 13.7029 18.9613 13.7018 19.2245V19.3636C13.7018 19.7976 13.5294 20.2138 13.2225 20.5207C12.9157 20.8276 12.4994 21 12.0655 21C11.6315 21 11.2152 20.8276 10.9084 20.5207C10.6015 20.2138 10.4291 19.7976 10.4291 19.3636V19.29C10.4228 19.0192 10.3351 18.7565 10.1775 18.5362C10.0199 18.3159 9.79969 18.1481 9.54545 18.0545C9.29868 17.9456 9.02493 17.9131 8.75952 17.9613C8.4941 18.0094 8.24919 18.1359 8.05636 18.3245L8.00727 18.3736C7.8553 18.5258 7.67483 18.6465 7.47617 18.7288C7.27752 18.8112 7.06459 18.8536 6.84955 18.8536C6.6345 18.8536 6.42157 18.8112 6.22292 18.7288C6.02426 18.6465 5.84379 18.5258 5.69182 18.3736C5.53967 18.2217 5.41898 18.0412 5.33663 17.8425C5.25428 17.6439 5.21189 17.431 5.21189 17.2159C5.21189 17.0009 5.25428 16.7879 5.33663 16.5893C5.41898 16.3906 5.53967 16.2102 5.69182 16.0582L5.74091 16.0091C5.92953 15.8163 6.05606 15.5714 6.10419 15.3059C6.15231 15.0405 6.11982 14.7668 6.01091 14.52C5.90719 14.278 5.73498 14.0716 5.51547 13.9263C5.29596 13.7809 5.03873 13.7029 4.77545 13.7018H4.63636C4.20237 13.7018 3.78616 13.5294 3.47928 13.2225C3.1724 12.9157 3 12.4994 3 12.0655C3 11.6315 3.1724 11.2152 3.47928 10.9084C3.78616 10.6015 4.20237 10.4291 4.63636 10.4291H4.71C4.98081 10.4228 5.24346 10.3351 5.46379 10.1775C5.68412 10.0199 5.85195 9.79969 5.94545 9.54545C6.05437 9.29868 6.08686 9.02493 6.03873 8.75952C5.99061 8.4941 5.86408 8.24919 5.67545 8.05636L5.62636 8.00727C5.47422 7.8553 5.35352 7.67483 5.27118 7.47617C5.18883 7.27752 5.14644 7.06459 5.14644 6.84955C5.14644 6.6345 5.18883 6.42157 5.27118 6.22292C5.35352 6.02426 5.47422 5.84379 5.62636 5.69182C5.77834 5.53967 5.95881 5.41898 6.15746 5.33663C6.35611 5.25428 6.56905 5.21189 6.78409 5.21189C6.99913 5.21189 7.21207 5.25428 7.41072 5.33663C7.60937 5.41898 7.78984 5.53967 7.94182 5.69182L7.99091 5.74091C8.18374 5.92953 8.42865 6.05606 8.69406 6.10419C8.95948 6.15231 9.23322 6.11982 9.48 6.01091H9.54545C9.78745 5.90719 9.99383 5.73498 10.1392 5.51547C10.2846 5.29596 10.3626 5.03873 10.3636 4.77545V4.63636C10.3636 4.20237 10.536 3.78616 10.8429 3.47928C11.1498 3.1724 11.566 3 12 3C12.434 3 12.8502 3.1724 13.1571 3.47928C13.464 3.78616 13.6364 4.20237 13.6364 4.63636V4.71C13.6374 4.97328 13.7154 5.23051 13.8608 5.45002C14.0062 5.66953 14.2126 5.84174 14.4545 5.94545C14.7013 6.05437 14.9751 6.08686 15.2405 6.03873C15.5059 5.99061 15.7508 5.86408 15.9436 5.67545L15.9927 5.62636C16.1447 5.47422 16.3252 5.35352 16.5238 5.27118C16.7225 5.18883 16.9354 5.14644 17.1505 5.14644C17.3655 5.14644 17.5784 5.18883 17.7771 5.27118C17.9757 5.35352 18.1562 5.47422 18.3082 5.62636C18.4603 5.77834 18.581 5.95881 18.6634 6.15746C18.7457 6.35611 18.7881 6.56905 18.7881 6.78409C18.7881 6.99913 18.7457 7.21207 18.6634 7.41072C18.581 7.60937 18.4603 7.78984 18.3082 7.94182L18.2591 7.99091C18.0705 8.18374 17.9439 8.42865 17.8958 8.69406C17.8477 8.95948 17.8802 9.23322 17.9891 9.48V9.54545C18.0928 9.78745 18.265 9.99383 18.4845 10.1392C18.704 10.2846 18.9613 10.3626 19.2245 10.3636H19.3636C19.7976 10.3636 20.2138 10.536 20.5207 10.8429C20.8276 11.1498 21 11.566 21 12C21 12.434 20.8276 12.8502 20.5207 13.1571C20.2138 13.464 19.7976 13.6364 19.3636 13.6364H19.29C19.0267 13.6374 18.7695 13.7154 18.55 13.8608C18.3305 14.0062 18.1583 14.2126 18.0545 14.4545V14.4545Z"
              stroke="white"
              stroke-opacity="0.75"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Setting
        </div>
        <ListItem
          component={Link}
          to="/login"
          sx={{ display: "flex", gap: 2, padding: 1 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 13.5C13.0609 13.5 14.0783 13.0786 14.8284 12.3284C15.5786 11.5783 16 10.5609 16 9.5C16 8.43913 15.5786 7.42172 14.8284 6.67157C14.0783 5.92143 13.0609 5.5 12 5.5C10.9391 5.5 9.92172 5.92143 9.17157 6.67157C8.42143 7.42172 8 8.43913 8 9.5C8 10.5609 8.42143 11.5783 9.17157 12.3284C9.92172 13.0786 10.9391 13.5 12 13.5ZM12 12.5C12.394 12.5 12.7841 12.4224 13.1481 12.2716C13.512 12.1209 13.8427 11.8999 14.1213 11.6213C14.3999 11.3427 14.6209 11.012 14.7716 10.6481C14.9224 10.2841 15 9.89397 15 9.5C15 9.10603 14.9224 8.71593 14.7716 8.35195C14.6209 7.98797 14.3999 7.65726 14.1213 7.37868C13.8427 7.1001 13.512 6.87913 13.1481 6.72836C12.7841 6.5776 12.394 6.5 12 6.5C11.2044 6.5 10.4413 6.81607 9.87868 7.37868C9.31607 7.94129 9 8.70435 9 9.5C9 10.2956 9.31607 11.0587 9.87868 11.6213C10.4413 12.1839 11.2044 12.5 12 12.5Z"
              fill="white"
              fill-opacity="0.75"
            />
            <path
              d="M12 13.6C13.0874 13.6 14.1302 13.168 14.8991 12.3991C15.668 11.6302 16.1 10.5874 16.1 9.5C16.1 8.41261 15.668 7.36976 14.8991 6.60086C14.1302 5.83196 13.0874 5.4 12 5.4C10.9126 5.4 9.86976 5.83196 9.10086 6.60086C8.33196 7.36976 7.9 8.41261 7.9 9.5C7.9 10.5874 8.33196 11.6302 9.10086 12.3991C9.86976 13.168 10.9126 13.6 12 13.6ZM13.1098 12.1793C12.7579 12.325 12.3808 12.4 12 12.4C11.2309 12.4 10.4932 12.0945 9.94939 11.5506C9.40553 11.0068 9.1 10.2691 9.1 9.5C9.1 8.73087 9.40553 7.99325 9.94939 7.44939C10.4932 6.90553 11.2309 6.6 12 6.6C12.3808 6.6 12.7579 6.67501 13.1098 6.82075C13.4616 6.96649 13.7813 7.1801 14.0506 7.44939C14.3199 7.71868 14.5335 8.03837 14.6793 8.39022C14.825 8.74206 14.9 9.11917 14.9 9.5C14.9 9.88083 14.825 10.2579 14.6793 10.6098C14.5335 10.9616 14.3199 11.2813 14.0506 11.5506C13.7813 11.8199 13.4616 12.0335 13.1098 12.1793Z"
              stroke="white"
              stroke-opacity="0.75"
              stroke-width="0.2"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12ZM16.815 19.605C15.3757 20.5192 13.7051 21.0032 12 21C10.2542 21.0032 8.54553 20.4957 7.0845 19.54C6.9645 19.39 6.84283 19.235 6.7195 19.075C6.57645 18.8876 6.49929 18.6582 6.5 18.4225C6.5 17.884 6.887 17.4325 7.4045 17.357C10.827 16.857 13.1835 16.9 16.6105 17.3745C16.8586 17.4108 17.0851 17.5354 17.2486 17.7255C17.412 17.9156 17.5013 18.1583 17.5 18.409C17.5 18.649 17.4175 18.882 17.2685 19.064C17.1148 19.251 16.9637 19.4313 16.815 19.605ZM18.4925 18.233C18.4125 17.297 17.702 16.516 16.7475 16.384C13.2395 15.8985 10.7875 15.852 7.26 16.3675C6.3 16.5075 5.5925 17.2955 5.5085 18.234C3.89616 16.5595 2.99682 14.3245 3 12C3 7.0295 7.0295 3 12 3C16.9705 3 21 7.0295 21 12C21.0032 14.3241 20.1042 16.5586 18.4925 18.233Z"
              fill="white"
              fill-opacity="0.75"
            />
            <path
              d="M12.0002 20.9H11.9998C10.2788 20.9031 8.59435 20.4044 7.15259 19.465C7.0363 19.3195 6.91841 19.1692 6.79893 19.0142C6.66929 18.8444 6.59936 18.6365 6.6 18.4228V18.4225C6.6 17.9323 6.9519 17.5241 7.41894 17.456L7.41896 17.4559C10.8308 16.9575 13.1777 17.0002 16.5964 17.4735C16.8205 17.5064 17.0251 17.619 17.1728 17.7907C17.3205 17.9625 17.4012 18.1819 17.4 18.4085V18.409C17.4 18.6263 17.3253 18.8367 17.1912 19.0005C17.0413 19.1829 16.8938 19.359 16.7488 19.5286C15.3284 20.4274 13.6813 20.9031 12.0002 20.9ZM3.1 12.0001V12C3.1 7.08473 7.08473 3.1 12 3.1C16.9153 3.1 20.9 7.08473 20.9 12V12.0001C20.9031 14.2287 20.0672 16.3741 18.5632 18.0118C18.3978 17.1269 17.69 16.4134 16.7612 16.2849C13.2451 15.7983 10.7835 15.7515 7.24554 16.2686C6.31125 16.4048 5.60603 17.1256 5.43829 18.0134C3.93337 16.3755 3.09695 14.2295 3.1 12.0001ZM12 22.1C17.5782 22.1 22.1 17.5782 22.1 12C22.1 6.42177 17.5782 1.9 12 1.9C6.42177 1.9 1.9 6.42177 1.9 12C1.9 17.5782 6.42177 22.1 12 22.1Z"
              stroke="white"
              stroke-opacity="0.75"
              stroke-width="0.2"
            />
          </svg>
          {userRole === "admin" ? "Login as Book Owner" : "Login as Admin"}
        </ListItem>
        <hr />
      </ListItem>

      <div className="w-[200px] h-[48px] rounded  flex gap-2 items-center justify-center bg-gray-600 absolute bottom-6  m-auto">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.33331 14.1667L12.5 10L8.33331 5.83334"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.5 10H2.5"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.5 2.5H15.8333C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H12.5"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Logout
      </div>
    </div>
  );
}

export default SideBar;
