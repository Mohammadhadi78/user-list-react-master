import React, { useEffect, useState } from "react";
import UserSearchBox from "./../../components/users/userSearchBox";
import UserList from "./../../components/users/userList";
import Modal from "./../../components/modal";
import UserAdd from "./../../components/users/userAdd";
import UserEdit from "./../../components/users/userEdit";
import LoadingModal from "./../../components/loading";
import { useSelector } from "react-redux";
// import Contexts
import UserListContext from './../../contexts/userListContext'
import ModalContext from './../../contexts/modalContext'
import axios from "axios";
import { useDispatch } from "react-redux";
import { reduxShowLoading } from "../../store/slices/loadingModalSlice";
//import redux
import { setUsers , setTargetUser } from "../../store/slices/usersSlice";

export default function Users() {
    // create states
    const [showModal, setShowModal] = useState(false);
    // const [showLoading, setShowLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [userList, setUserList] = useState([]);
    // const [targetUser, setTargetUser] = useState({});
    const [search, setSearch] = useState({
        search: '',
        gender: '',
        role: ''
    });

    const dispatch = useDispatch();
    

    useEffect(() => {
        fetchAllUserHandler()
    }, []);

    const usersSlice = useSelector(state => state.usersSlice.list)
    // const usersSlice2 = useSelector(state => state.usersSlice.targetUser)
    // console.log(usersSlice2);
    // fetch data from api
    let fetchAllUserHandler = async () => {
        let apiResult = await axios.get('https://6291ea4f4e324aacf6dc76c2.endapi.io/users');
        dispatch(setUsers(apiResult?.data?.data))
        // setShowLoading(false)
        console.log(dispatch(setUsers(apiResult?.data?.data)));
        dispatch(reduxShowLoading(false));
    };



    // create variable
    let finalUserList = usersSlice;

    //create handler
    const getTargetUserHandler = (id) => {
        // setTargetUser(usersSlice.find(item => item.id === id));
        dispatch(setTargetUser(usersSlice.find(item => item.id === id)))
        setShowEditModal(true);
    }

    const deleteUserHandler = async (id) => {
        // setShowLoading(true)
        dispatch(reduxShowLoading(true));
        let res = await axios.delete(`https://6291ea4f4e324aacf6dc76c2.endapi.io/users/${id}`);
        fetchAllUserHandler()
    }

    const searchBoxChengeHandler = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    //for search box
    if (finalUserList.length) {
        if (search.search.length) {
            finalUserList = finalUserList.filter(item => (
                item.firstName.search(search.search) !== -1 ||
                item.lastName.search(search.search) !== -1 ||
                item.phone.search(search.search) !== -1 ||
                item.email.search(search.search) !== -1
            ));
        }
        if (search.role && search.role !== "all") {
            finalUserList = finalUserList.filter(item => item.role === search.role);
        }
        if (search.gender && search.gender !== "all") {
            finalUserList = finalUserList.filter(item => item.gender === search.gender);
        }
    }

    return (
        <ModalContext.Provider value={{
            showModal,
            setShowModal,
            showEditModal,
            setShowEditModal,
            // setShowLoading
        }}>
            <UserListContext.Provider value={{
                userList,
                setUserList,
                // targetUser,
                // setTargetUser,
                // fetchAllUserHandler
            }}>

                {/*Add loading Component*/}
                <LoadingModal
                    // showLoading={showLoading}
                    // setShowLoading={setShowLoading}
                />

                <div className='sm:absolute w-full mt-10'>
                    <div className='container sm:w-4/5 w-full mx-auto'>
                        <div className='p-6 sm:px-14 sm:pb-7 sm:pt-12 mt-7 bg-white rounded-lg md:rounded-xl lg:rounded-2xl mb-5 shadow-[0_4px_80px_0px_rgba(0,0,0,0.05)] border-2 border-violet-200'>
                            <div className="sm:flex sm:items-center mb-4">
                                <div className="sm:flex-auto">
                                    <h1 className="text-xl font-semibold text-gray-900">لیست کاربران</h1>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:flex-none">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(true)}
                                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                    >
                                        کاربر جدید
                                    </button>

                                    {/*Add modal Component*/}
                                    <Modal
                                        showModal={showModal}
                                        setShowModal={setShowModal}
                                    >
                                        {/*send user add form in modal*/}
                                        <UserAdd />
                                    </Modal>

                                    {/*Add Edit modal Component*/}
                                    <Modal
                                        showModal={showEditModal}
                                        setShowModal={setShowEditModal}
                                    >
                                        {/*send user edit form in modal*/}
                                        <UserEdit />
                                    </Modal>

                                </div>
                            </div>

                            {/*Add User Search Box Component*/}
                            <UserSearchBox searchBoxChengeHandler={searchBoxChengeHandler} />

                            {/*Add User List Component*/}
                            <UserList finalUserList={finalUserList} setUser={setUsers} getTargetUserHandler={getTargetUserHandler} deleteUserHandler={deleteUserHandler} />

                        </div>
                    </div>
                </div>
            </UserListContext.Provider>
        </ModalContext.Provider>
    )
}