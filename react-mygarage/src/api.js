import axios from 'axios';


export default {
    user: {
        login: (credentials) =>
            axios.post(
                'http://localhost:3000/api/v1/sessions',
               credentials,
            ).then(res => res.data),
        signup: user =>
            axios.post(
                'http://localhost:3000/api/v1/users.json',
                {user},
            ).then(res => res.data),
    },

    vehicles: {
        /*fetchAll: () => axios.get("/api/v1/vehicles.json").then(res => res.data.vehicles),*/
        create: vehicle =>
            axios.post("http://localhost:3000/api/v1/vehicles.json", { vehicle,user_email:localStorage.email,user_token:localStorage.mygarageJWT  }).then(res => res.data)
    }
};