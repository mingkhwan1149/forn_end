

import axios, { type AxiosRequestConfig } from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

// const token = Cookies.get('token');

export const FetchingToken = async (config: AxiosRequestConfig) => {
    try {
        const headers = {
            // Authorization: Cookies.get('token')
        }

        const updatedConfig: AxiosRequestConfig = {
            ...config
            // headers,
        }

        const response = await axios(updatedConfig)
        // console.log(response);

        if (config.method === 'get') {
            return response.data
        } else {
            return response
        }
    } catch (error: any) {
        if (error.response) {
            throw {
                message:
                    error?.response?.data?.message || error?.response?.data,
                code: error.response.status
            }
        } else if (error.request) {
            throw {
                message: error.message,
                code: 400
            }
        } else {
            throw {
                message:
                    'Something happened in setting up the request that triggered an Error',
                code: 0
            }
        }
    }
}
