import { useQuery } from "@tanstack/react-query";
import useApi from "../useApi";

export const getSchools = () => {
    return useQuery({
        queryKey: ["schools"],
        queryFn: () => useApi("GET", "/schools",),
    });
}
