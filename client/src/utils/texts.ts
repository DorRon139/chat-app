type TLanguage = {
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