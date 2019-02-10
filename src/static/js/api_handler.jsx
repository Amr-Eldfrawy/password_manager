// like a class
const ApiHandler = {
    async callSignin(username, password) {
        let response = await fetch('/login', {
            "crossDomain": true,
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(username + ":" + password),
                "cache-control": "no-cache",
            },
            "processData": false,
            "data": ""
        })

        if (response.ok) {
            let data = await response.json();
            return {
                status: true,
                jwt_token: data['token']
            }
        }

        return {
            status: false,
            message: 'wrong credentials'
        }

    },
    // todo 
    async callGetCredentials(jwt_token) {
        return { status: true, dashboardData: 'my data' }
    },
    async callRegister(username, password) {
        let response = await fetch('/register', {
            "crossDomain": true,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "cache-control": "no-cache",
            },
            "processData": false,
            "body": JSON.stringify({ name: username, password: password })
        })
        if (response.ok) {
            return { message: 'An account was created. please sign in' }

        }
        return { message: 'this account already exist' }
    }
}

export { ApiHandler };