import { getByUsername, updatePassword } from "services/userService";
import { useState } from "react";
import { handleChangePass, PasswordManagement } from "@/components/users/PasswordControl";
import { passwrdRegex } from "../stores/FieldRegexs";

const UserSecurity = ({ user }) => {
    const [userUpdate, setUserUpdate] = useState(user);
    const [failedSave, setFailedSave] = useState(false);
    const [passwrdControl, setPasswrdControl] = useState({
        new: "",
        repeat: ""
    })

    const [errPass, setErrPass] = useState(false);
    const [errFormatPass, setErrFormatPass] = useState(false);
    const [errRepPass, setErrRepPass] = useState(false);
    const [errMismatch, setErrMismatch] = useState(false);

    const [msgbox, setMsgbox] = useState(false);

    const viewBox = () => {
        setMsgbox(!msgbox)
    }

    const handleBlur = () => {
        if (failedSave) validate();
    }

    const validate = () => {
        let errorDetected = false;

        const validations = [
            { check: () => !passwrdControl.new.trim(), setErr: setErrPass },
            { check: () => passwrdControl.new && !passwrdRegex.test(passwrdControl.new), setErr: setErrFormatPass },
            { check: () => !passwrdControl.repeat.trim(), setErr: setErrRepPass },
            { check: () => passwrdControl.new !== passwrdControl.repeat, setErr: setErrMismatch }
        ];

        validations.forEach(validation => {
            const errorConditionMet = validation.check();
            if (errorConditionMet) {
                errorDetected = true;
                validation.setErr(true);
            } else {
                validation.setErr(false);
            }
        });

        return errorDetected;
    };

    const submit = (e) => {
        e.preventDefault();
        const errorDetected = validate();
        if (!errorDetected) {
            updatePassword(
                {
                    username: user.username,
                    password: passwrdControl.new
                }
            ).then((result) => {
                if (result.status === 202) {
                    window.location.href = '/users/' + userUpdate.username
                }
            });
        } else {
            setFailedSave(true);
        }
    }



    return (
        <form  onSubmit={submit} class="flex-initial items-center justify-center shrink w-full max-w-lg p-6">
            <PasswordManagement
                passwrdControl={passwrdControl}
                setPasswrdControl={setPasswrdControl}
                onChange={handleChangePass}
                onBlur={handleBlur}
                errPass={errPass}
                errFormatPass={errFormatPass}
                errRepPass={errRepPass}
                errMismatch={errMismatch}
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-400  text-white font-bold px-4 py-2 rounded-md"
            >
                Finalizar
            </button>
        </form>

    )
}
export default UserSecurity;


export async function getServerSideProps({ query }) {
    const user = await getByUsername(query.username);

    return {
        props: {
            user
        }
    }
}