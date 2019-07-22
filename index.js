const admin = require('firebase-admin');
const axios = require('axios');
let serviceAccount = require('./cred/key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
axios.get('http://ifconfig.me')
    .then((res) => {
        const ip = res.data

        let db = admin.firestore();

        const ipsRef = db.collection('ips');

        ipsRef.doc().set({
            ip : ip,
            updated_on: (new Date()).toISOString()
        })
    })
    .catch((err) => {
        console.log(err)
    })


