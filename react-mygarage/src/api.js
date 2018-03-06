import axiosClient from '../src/axiosClient';
//const config = { headers: { 'Content-Type': 'multipart/form-data' } };
export default {
    user: {
        login: (credentials) =>
            axiosClient.post(
                'http://localhost:3000/api/v1/sessions',
               credentials,
            ).then(user => user.data),
        signup: user =>
            axiosClient.post(
                '/api/v1/users.json',
                {user},
            ).then(res => res.data),
        update: (id,user) =>
            axiosClient.put(
                '/api/v1/users.json',
                { user,user_email:localStorage.email,user_token:localStorage.mygarageJWT },
            ).then(res => res.data)
    },

    vehicles: {
        fetchAll: () => axiosClient.get("http://localhost:3000/api/v1/vehicles.json?user_email="+localStorage.email+'&user_token='+localStorage.mygarageJWT,).then(res => res),
        fetch: (id) => axiosClient.get("http://localhost:3000/api/v1/vehicles/"+id+".json?user_email="+localStorage.email+'&user_token='+localStorage.mygarageJWT,).then(res => res),
        create: vehicle => axiosClient.post("/api/v1/vehicles.json",
            vehicle
            ).then(res => res.data),
        update: (id,vehicle) => axiosClient.put("/api/v1/vehicles/"+id+".json", vehicle).then(res => res.data),
        delete:(id) =>axiosClient.delete("/api/v1/vehicles/"+id+".json?user_email="+localStorage.email+'&user_token='+localStorage.mygarageJWT,{ user_email:localStorage.email,user_token:localStorage.mygarageJWT  }).then(res => res.data)
    },

    service: {
        fetchServiceRecords: (id) => axiosClient.get("http://localhost:3000/api/v1/vehicles/" + id + "/service_records.json?user_email=" + localStorage.email + '&user_token=' + localStorage.mygarageJWT).then(res => res)
    },

    service_companies: {
        fetchAll: () => axiosClient.get("http://localhost:3000/api/v1/service_companies.json?user_email="+localStorage.email+'&user_token='+localStorage.mygarageJWT).then(res => res),
    },
};