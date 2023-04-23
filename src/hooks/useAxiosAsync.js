import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {axiosInstance} from './axiosInstance';

export const useAxiosGet = (url) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosInstance.get(url);
                setData(res?.data);
            } catch (error) {
                setError(error?.message && "Unable to load data!");
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [url])

    return (
        {loading, error, data}
    );
}

// a function for deleting an article
export const useAxiosDelete = (url) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        const deleteData = async () => {
            try {
                const res = await axiosInstance.delete(url);
                setData(res?.data);
                navigate("/");
            } catch (error) {
                setError(error?.message && "Unable to delete article!");
            } finally {
                setLoading(false);
            }
        };

        deleteData();
    }, [url])

    return (
        {loading, error, data}
    );
}