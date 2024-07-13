"use client";
import { auth, db } from "@/lib/firebase/firebaseInit";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import RegesterdUserTable from "./RegesterdUserTable";
import RegesterdFLHAtable from "./RegesterdFLHAtable";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useAuth } from "../../../components/providers/AuthProvider";
import { firebaseConfig } from "@/lib/firebase/config/firebaseConfig";
import { exportToExcel } from "./exportToExcel";

function UserTable() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [currentCompanyName, setCurrentCompanyName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [buttonName, setButtonName] = useState("UserTable");
  const [flhaData, setFlhaData] = useState([]);

  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        setItems(users);

        const currentUserData = users.find(
          (user) => user.email === currentUser.email
        );
        setCurrentCompanyName(currentUserData.companyName);
        if (currentUserData) {
          if (currentUserData.role === "admin") {
            setSelectedData(users);
            setIsAdmin(true);
          } else {
            const filteredData = users.filter(
              (user) => user.companyName === currentUserData.companyName
            );
            setSelectedData(filteredData);
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchItems();
  }, [currentUser.email]);

  useEffect(() => {
    const flhaItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "FLHA"));
        const flhaData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        });
        if (isAdmin) {
          setFlhaData(flhaData);
          console.log(flhaData);
        } else {
          const filteredData = flhaData.filter(
            (item) => item.company_name === currentCompanyName
          );
          setFlhaData(filteredData);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    flhaItems();
  }, [currentCompanyName, currentUser.email, isAdmin]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        console.log("Logout Catch ", e.message);
      });
  };

  const handleExport = async () => {
    try {
      exportToExcel(
        buttonName === "UserTable" ? selectedData : flhaData,
        buttonName === "UserTable" ? "UserData" : "FLHAData",
        buttonName === "FLHATable" ? "flha" : "users"
      );
      console.log("Export successful");
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (sortBy === "name") {
        return sortDirection === "asc"
          ? a.fullName.localeCompare(b.fullName)
          : b.fullName.localeCompare(a.fullName);
      } else if (sortBy === "date") {
        // Use consistent case
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
    return sortedData;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 sm:py-6 bg-zinc-400 w-full max-h-full">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="flex justify-end gap-2 mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <select
            onChange={(event) => setSortDirection(event.target.value)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
          <select
            onChange={(event) => setSortBy(event.target.value)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <option value="name">Sort by name</option>
            <option value="date">Sort by date</option>
          </select>
          <button
            type="button"
            onClick={handleExport}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            ExportButton-users
          </button>
          <button
            type="button"
            onClick={() => setButtonName("UserTable")}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            User Information Table
          </button>

          <button
            type="button"
            onClick={() => setButtonName("FLHATable")}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            User FLHA Information
          </button>

          <button
            type="button"
            onClick={() => logOut()}
            className="block rounded-md border-indigo-600 bg-white px-3 py-2 text-center text-sm font-semibold hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            SignOut
          </button>
        </div>
      </div>
      {buttonName === "UserTable" ? (
        <RegesterdUserTable users={sortData(selectedData)} />
      ) : (
        <RegesterdFLHAtable
          currentCompanyName={currentCompanyName}
          admin={isAdmin}
          sortBy={sortBy}
          sortDirection={sortDirection}
        />
      )}

      {/* <Regesterdcertificates certificates={items} /> */}
    </div>
  );
}

export default UserTable;
