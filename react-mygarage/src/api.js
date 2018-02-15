import axios from 'axios';


export default {
    user: {
        login: (credentials) =>
            axios.post(
                'http://localhost:3000/api/v1/sessions',
               credentials,
            ).then(res => res.data)
    }
};