import { useSelector } from "react-redux";

export const config = () => {
    const token = useSelector((state) => state?.signinData?.token);

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
}