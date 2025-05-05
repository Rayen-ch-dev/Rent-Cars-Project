interface Props extends IFormFieldsVariables{};
export const useFormFields = ({slug}:Props)=>{
    const loginFields =(): IFormField[] => {
        return [
            {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "Email",
                required: true,
                autoFocus: true,
            },
            {
                name: "password",
                label: "Password",
                type: "password",
                placeholder: "Password",
                required: true,
            },
        ];
    };
    const registerFields = (): IFormField[] => {
        return [
            {
                name: "name",
                label: "Name",
                type: "text",
                placeholder: "Name",
                required: true,
            },
            {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "Email",
                required: true,
                autoFocus: true,
            },
            {
                name: "password",
                label: "Password",
                type: "password",
                placeholder: "Password",
                required: true,
            },
            {
                name: "confirmPassword",
                label: "confirm Password",
                type: "password",
                placeholder: "confirm Password",
                required: true,
            },


        ];
    };
    const getFormFields = (): IFormField[] => {
        switch(slug){
            case "login":
                return loginFields();
            case "register":
                return registerFields();
            default:
                return [];   b
        }
    };
    return {getFormFields};
};