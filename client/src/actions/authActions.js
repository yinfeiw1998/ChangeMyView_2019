import axios from "axios";

//SET_USER
//REMOVE_USER

export function hashCode(str) {
    return str.split('').reduce((prevHash, currVal) =>
      (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
  }


export const setUser = currUser => {
    return {
        type: "SET_USER",
        user: currUser
    }
};

export const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}

export const registerUser = async(body,dispatch) =>  {
    try{
        const res = await axios.post("/api/auth/Register",body);
        dispatch(setUser(res.data));
        console.log(res);
        return "SUCCESS";
    } catch (err) {
        console.log("ve: "+err.response.data);
        return err.response.data;
    }
    
}

export const logoutUser = async(dispatch) => {
    console.log("租子");
    try{
        dispatch(removeUser());
        console.log("dispatched remove user");
    } catch (err) {
        return err;
    }
}

export const loginUser = (body) => async dispatch => {
    try{
        let res = await axios.post("/api/auth/Login",body);
        console.log(res);
    }catch (err) {
        return err;
    }
}