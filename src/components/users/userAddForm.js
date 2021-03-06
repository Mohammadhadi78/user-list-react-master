import { useState, useContext } from "react";
import React from "./../../routers/users/index";
import UserListContext from "../../contexts/userListContext";
import ModalContext from "../../contexts/modalContext";
import axios from "axios";
import { reduxShowLoading } from "../../store/slices/loadingModalSlice";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/usersSlice";

export default function UserAddForm(){

    let { setShowLoading , setShowModal } = useContext(ModalContext);
    // let { fetchAllUserHandler } = useContext(UserListContext);

    // create states
    const [user, setUser] = useState({
        firstName : '',
        lastName : '',
        gender : '',
        role : '',
        phone : '',
        email : ''
    });
    const dispatch = useDispatch();
    
    // create handlers
    const addUserHandler = async () => {
        // e.preventDefault();
        // setShowLoading(true)
        dispatch(reduxShowLoading(true));
        let res = await axios.post('https://6291ea4f4e324aacf6dc76c2.endapi.io/users',{
            firstName:user.firstName,
            lastName:user.lastName,
            gender:user.gender,
            role:user.role,
            phone:user.phone,
            email:user.email,
            password:'123456789'
        });
        dispatch(addUser(res.data))
        // fetchAllUserHandler()
        setShowModal(false)
    }

    
    // create chenge input in add user form
    const changeInput = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
        // dispatch(setUser({
        //     [e.target.name] : e.target.value
        // }))
    }
    return(
        <form onSubmit={addUserHandler}>
            <div className="mt-3">
                <label htmlFor="last-name" className="block text-sm text-right font-medium text-gray-700">
                    نام
                </label>
                <input
                    type="text"
                    name="firstName"
                    onChange={changeInput}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mt-3">
                <label htmlFor="last-name" className="block text-sm text-right font-medium text-gray-700">
                    نام خانوادگی
                </label>
                <input
                    type="text"
                    name="lastName"
                    onChange={changeInput}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="flex mt-3">
                <div className="basis-1/2 ml-2">
                    <label htmlFor="last-name" className="block text-sm text-right font-medium text-gray-700">
                        جنسیت
                    </label>
                    <select
                        name="gender"
                        onChange={changeInput}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option>...</option>
                        <option>مرد</option>
                        <option>زن</option>
                    </select>
                </div>
                <div className="basis-1/2 mr-2">
                    <label htmlFor="last-name" className="block text-sm text-right font-medium text-gray-700">
                        نقش
                    </label>
                    <select
                        name="role"
                        onChange={changeInput}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option>...</option>
                        <option>مهمان</option>
                        <option>کاربر</option>
                        <option>ادمین</option>
                    </select>
                </div>
            </div>
            <div className="mt-3">
                <label htmlFor="last-name" className="block text-sm text-right font-medium text-gray-700">
                    شماره
                </label>
                <input
                    type="text"
                    name="phone"
                    onChange={changeInput}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mt-3">
                <label htmlFor="last-name" className="block text-sm text-right font-medium text-gray-700">
                    ایمیل
                </label>
                <input
                    type="email"
                    name="email"
                    onChange={changeInput}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <hr className="my-4"/>
            <div className='sm:w-full flex justify-between mx-auto px-2 mt-3'>
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
                    onClick={() => { setShowModal(false) }}
                >
                    بستن
                </button>
                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
                >
                    ذخیره
                </button>
            </div>
        </form>
    )
}