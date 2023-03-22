type TLanguage = {
    navbar:{
        messanger: string,
        profile: string,
        friends: string,
        myPhotos: string,
        login: string,
        logout: string,
    },
    login: {
        username: string,
        password: string,
        submit: string,
        donthaveUser: string,
        registerHere: string,
    },
    registerForm: {
        username: string,
        email: string,
        password: string,
        submit: string,
        haveUser: string,
        loginHere: string,
    }
}
interface ITexts {
    he: TLanguage,
    en: TLanguage
}
const TEXTS: ITexts={
    en: {
        navbar:{
            messanger: 'Messanger',
            profile: 'Profile',
            friends: 'Friends',
            myPhotos: 'My Photos',
            login: 'Login',
            logout: 'Logout',
        },
        login: {
            username: 'User Name',
            password: 'Password',
            submit: 'Login',
            donthaveUser: 'Create a new user ',
            registerHere: 'Here',
        },
        registerForm: {
            username: 'User Name',
            email: 'Email',
            password: 'Password',
            submit: 'Register',
            haveUser: 'Have a user?',
            loginHere: 'Login Here',
        }
    },
    he: {
        navbar:{
            messanger: 'צ׳אט',
            profile: 'איזור אישי',
            friends: 'חברים',
            myPhotos: 'התמונות שלי',
            login: 'התחבר',
            logout: 'התנתק',
        },
        login: {
            username: 'שם משתמש',
            password: 'סיסמה',
            submit: 'התחבר',
            donthaveUser: 'לא רשום? ',
            registerHere: 'הרשם כאן',
        },
        registerForm: {
            username: 'שם משתמש',
            email: 'אי-מייל',
            password: 'סיסמה',
            submit: 'הרשמה',
            haveUser: 'כבר יש משתמש?',
            loginHere: 'התחבר כאן',
        }
    }
}

export default TEXTS