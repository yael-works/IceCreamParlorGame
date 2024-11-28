document.addEventListener('DOMContentLoaded', function () {
    let users = JSON.parse(localStorage.getItem('arrUser')) || []; // אתחול כמערך ריק אם ערך null

    // שדות להזנה
    const pass = document.querySelector('#pass');
    const name = document.querySelector('#user');
    const nameR = document.querySelector('#userReg');
    const passR = document.querySelector('#passReg');

    // משתנים ליצירת משתמש חדש ולכניסה
    let flag, user;
    
    // שדות והודעות השגיאה
    const loginForm = document.querySelector('#loginForm');
    const registerForm = document.querySelector('#registerForm');
    const loginErr = document.querySelector('#loginErr');
    const registerErr = document.querySelector('#registerErr');

    function createNewUser() {
        flag = false;
        // בודקים אם המשתמש כבר קיים
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === passR.value && users[i].name === nameR.value) {
                alert("המשתמש כבר קיים");
                flag = true;
                break; // לצאת מהלולאה מוקדם אם נמצא משתמש
            }
        }

        // יוצרים משתמש חדש אם לא נמצא משתמש קיים
        if (!flag) {
            user = {
                name: nameR.value,
                id: passR.value,
                level: 1,
            };
            users.push(user);
            localStorage.setItem('currentUser', JSON.stringify(passR.value));
            pass.value = "";
            name.value = "";
            localStorage.setItem('arrUser', JSON.stringify(users));

            window.location.href = 'game.html'; // מפנים לעמוד המשחק אם המשתמש קיים
        }
    }

    function checkUser() {
        flag = false;

        // בודקים אם המשתמש קיים
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === pass.value) {
                flag = true;
                break; // לצאת מהלולאה אם נמצא משתמש
            }
        }

        // טיפול בתוצאות בדיקת המשתמש
        if (!flag) {
            loginErr.textContent = "משתמש זה אינו קיים במערכת!";
            // loginForm.style.display = 'none';
        } 
        else {
            localStorage.setItem('currentUser', JSON.stringify(pass.value));
            pass.value = "";
            name.value = "";
            window.location.href = 'game.html'; // מפנים לעמוד המשחק אם המשתמש קיים
        }
    }


    // ביטוי רגולרי עבור אימות הסיסמה
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // פונקציה לבדוק תקינות הסיסמה
    function checkPass(pass) {
        return passRegex.test(pass);
    }

    // טיפול בהגשת טופס הכניסה
    document.querySelector('#login').addEventListener('submit', function (event) {
        event.preventDefault(); // מונע את הרענון של הדף
        checkUser();

    });

    // טיפול בהגשת טופס הרישום
    document.querySelector('#register').addEventListener('submit', function (event) {
        
        const passReg = document.querySelector('#passReg').value;

        // אימות הסיסמה
        if (!checkPass(passReg)) {
            registerErr.textContent = "סיסמא שגויה! יש להשתמש בסיסמא באורך מינימלי של 8 תווים, כולל אות גדולה, אות קטנה, מספר ותו מיוחד.";
        } else {
            registerErr.textContent = ""; // מנקים את הודעת השגיאה
            createNewUser();
        }
        event.preventDefault(); // מונע את הרענון של הדף
    });

    // מעבר בין טופס הכניסה לטופס הרישום
    document.querySelector('#toRegister').addEventListener('click', function () {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    document.querySelector('#toLogin').addEventListener('click', function () {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
});