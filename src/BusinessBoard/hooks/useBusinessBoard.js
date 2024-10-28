import axios from "axios";
import useCustomers from "../../customers/hooks/useCustomers";

export default function useBusinessBoard() {
    const { updateBusinessStatus } = useCustomers()

    const SECRETBUSINESSCODE = "SECRETBUSINESSCODE"
    const makeBusiness = async (code, customer_id) => {
        const responseFromUpdate = await updateBusinessStatus(SECRETBUSINESSCODE, code, customer_id)
        return responseFromUpdate

    }

    return {
        makeBusiness
    }

}
