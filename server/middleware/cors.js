import cors from 'cors';

const ACCEPTED_ORIGINS = [
    'https://vercel-dep1-client.vercel.app'
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {} ) => cors({
    origin: (origin, callback) =>{
        if(acceptedOrigins.includes(origin)){
            return callback(null,true);
        }

        if(!origin){
            console.log('b' ,origin);
        }

        return callback("No permitido");
    }
})