import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { list } from 'postcss';


const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: {
        list: [],
        targetUser: [],
    },
    reducers: {
        setTargetUser: (state, { payload }) => {
            state.targetUser = payload;
        },
        setUsers: (state, { payload }) => {
            state.list = payload;
        },
        addUser: (state, action) => {
            state.list.push(action.payload)
        },
        deleteUser: (state, action) => {
            state.list = state.list.filter(todo => todo.id !== action.payload)
        },
        toggleDoneUser: (state, { payload }) => {
            state.list = state.list.map((todo) => {
                return todo.id === payload.id
                    ? {
                        ...todo,
                        done: !todo.done
                    }
                    : todo
            })
        },
        editUser: (state, { payload }) => {
            state.list = state.list.map((list) => {
                return list.id === payload.id
                    ? {
                        ...list,
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        gender: payload.gender,
                        role: payload.role,
                        phone: payload.phone,
                        email: payload.email,
                        password: '123456789'
                    }
                    : list
            })
        },
        fetchAllUserHandler : async () => {
            let apiResult = await axios.get('https://6291ea4f4e324aacf6dc76c2.endapi.io/users');
            // dispatch(setUsers(apiResult?.data?.data))
            // setShowLoading(false)
            // console.log(dispatch(setUsers(apiResult?.data?.data)));
            // dispatch(reduxShowLoading(false));
        },
    }
})


export const { addUser, deleteUser, toggleDoneUser, editUser, setUsers, setTargetUser } = usersSlice.actions;

export default usersSlice.reducer;