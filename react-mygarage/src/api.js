import axios from 'axios';


export default {
    user: {
        login: (credentials) =>
            axios.post(
                'http://localhost:3000/api/v1/sessions',
               credentials,
            ).then(user => user.data),
        signup: user =>
            axios.post(
                'http://localhost:3000/api/v1/users.json',
                {user},
            ).then(res => res.data),
        update: (id,user) =>
            axios.put(
                'http://localhost:3000/api/v1/users.json',
                { user,user_email:localStorage.email,user_token:localStorage.mygarageJWT },
            ).then(res => res.data)
    },

    vehicles: {
        fetchAll: () => axios.get("http://localhost:3000/api/v1/vehicles.json?user_email="+localStorage.email+'&user_token='+localStorage.mygarageJWT,).then(res => res),
        fetch: (id) => axios.get("http://localhost:3000/api/v1/vehicles/"+id+".json?user_email="+localStorage.email+'&user_token='+localStorage.mygarageJWT,).then(res => res),
        create: vehicle => axios.post("http://localhost:3000/api/v1/vehicles.json", { vehicle,user_email:localStorage.email,user_token:localStorage.mygarageJWT  }).then(res => res.data),
        update: (id,vehicle) => axios.put("http://localhost:3000/api/v1/vehicles/"+id+".json", { vehicle,user_email:localStorage.email,user_token:localStorage.mygarageJWT  }).then(res => res.data),
        delete:(id) =>axios.delete("http://localhost:3000/api/v1/vehicles/"+id+".json?user_email="+localStorage.email+'&user_token='+localStorage.mygarageJWT,{ user_email:localStorage.email,user_token:localStorage.mygarageJWT  }).then(res => res.data)
    }
};