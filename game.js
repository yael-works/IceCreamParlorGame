
document.addEventListener('DOMContentLoaded', function () {
    const peopleArr = ['pictures/people/child1.png', 'pictures/people/child2.png',
        'pictures/people/child3.png', 'pictures/people/child4.png', 'pictures/people/child5.png',
        'pictures/people/child6.png', 'pictures/people/child7.png', 'pictures/people/child8.png'];
    let indexPeople = 1, level = 1, sum = 0;
    let arrInsert = [], indexInsert = 0, amountSucced = 0, faldC, falgB, arrPeple = [], myMusic, moodMusic,
        winORdis = false, intervalId, arrInterval = [], amountCups = 0, levelTimer, open = false,
        fC = false, fB = false, fA = false, levelSum, isGameRunning = false; // משתנה לבדוק אם המשחק פועל
    let interV, timerCount = 0; // מספר שניות שחלפו
    let users = JSON.parse(localStorage.getItem('arrUser')) || []; // אם לא קיים, מגדיר כ-array ריק
    let currentUserId =JSON.parse(localStorage.getItem('currentUser'));

    /*  SUM  כמות המוגדרת לרמה בשלב אמונה את מספר האנשים שעל המסך עד 
        INDEXPEOPLE מונה במערך האנשים שאינו מוגרל
        arrInsert מערך של האנשים שמוצגים על המסך
        arrPeple מערך מקביל של הגלידות של האנשים המוצגים על המסך 
        indexInsert   מונה את מספר האנשים שמוצגים על המסך
        pepleIndex מונה את האיש הראשון שעומד על המסך

    */
    const coneArr = document.querySelectorAll('.divImg img[alt^="cone"]');
    const ballsArr = document.querySelectorAll('.divImg img[alt^="ball"]');
    const addsArr = document.querySelectorAll('.divImg img[alt^="adds"]');
    let thePepole = document.querySelector('#thepepole');
    let yourSuccess = document.querySelector('#iceCreamProces');
    const cups = document.querySelectorAll('.cupImg');
    const theIceCream = document.querySelector("#yourIceCream");
    const stopG = document.querySelector('#btnS');
    const startG = document.querySelector('#btnP');
    const clearCoice = document.querySelector('#btnC');
    const music = document.querySelector('#btnM');
    const endGame = document.querySelector('#btnE');
    const changLevel = document.querySelector('#btnCHA');
    let playerLevel = document.querySelector('#pLevel');
    let imgC = document.querySelector('#imgC');
    let imgB = document.querySelector('#imgB');
    let imgA = document.querySelector('#imgA');
    startG.addEventListener('click', startProcesGame);
    stopG.addEventListener('click', stopProcessGame);
    clearCoice.addEventListener('click', clearMyCoice);
    music.addEventListener('click', openMusic);
    endGame.addEventListener('click', gameOver);
    changLevel.addEventListener('click', ChooseOtherLevel);
    init();
    function init() {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == currentUserId) {
                level = users[i].level;
                playerLevel.innerText = `YOUR LEVEL IS   ${users[i].level}`;
                //השינויים בין הרמות מתבטא בכמות האנשים עלל המסך וכן במהירות שהם נעלמים
                if (level == 1) {
                    levelSum = 3;
                    levelTimer = 8000;
                }

                if (level == 2) {
                    levelTimer = 7000;
                    levelSum = 4;
                }

                if (level == 3) {
                    levelTimer = 6000;
                    levelSum = 5;
                }

            }
        }
        dragANdSuccess();
    }
    function startProcesGame() {
        setInterval(() => {
            const text = document.getElementById('blinkingText');
            text.style.visibility = (text.style.visibility === 'hidden' ? '' : 'hidden');
        }, 500);
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == currentUserId) {
                level = users[i].level;
                playerLevel.innerText = `YOUR LEVEL IS   ${users[i].level}`;
                //השינויים בין הרמות מתבטא בכמות האנשים עלל המסך וכן במהירות שהם נעלמים
                if (level == 1) {
                    levelSum = 3;
                    levelTimer = 8000;
                }

                if (level == 2) {
                    levelTimer = 7000;
                    levelSum = 4;
                }

                if (level == 3) {
                    levelTimer = 6000;
                    levelSum = 5;
                }

            }
        }
        startTimer();
        isGameRunning = true;
        clearMyCoice();
        intervalId = setInterval(() => {
            createChildWithIceCream();
        }, 10000);
        createChildWithIceCream();
    }
    function stopProcessGame() {
        if (isGameRunning) { // אם המשחק פועל
            clearInterval(intervalId); // ניקוי ה-intervall
            for (let i = 0; i < arrInterval.length; i++) {
                clearTimeout(arrInterval[i]);
            }
            isGameRunning = false; // מעדכן את מצב המשחק
            stopTimer()
            this.innerText = "continue";
        }
        else {
            startTimer(); // אם הטיימר לא רץ, הפעל אותו
            // ממשיכה את כל הטיימרים
            for (let i = 0; i < arrInterval.length; i++) {
                setTimeout(() => {
                    thePepole.removeChild(arrPeple.shift());
                    arrInterval.shift();
                    arrInsert.shift();
                    sum--;
                    clearMyCoice();
                }
                    , levelTimer);
            }
            this.innerText = "stop";
            startProcesGame();

        }
    }

    function randCone() {
        let randNum = Math.floor((Math.random() * coneArr.length));
        return randNum;
    }
    function randBall() {
        let ranB = Math.floor((Math.random() * (ballsArr.length)));
        return ranB;
    }
    function randAdd() {
        let ranA = Math.floor((Math.random() * (addsArr.length)));
        return ranA;
    }
    function createChildWithIceCream() {
        if (sum < levelSum) {
            // לתמונה של האיש
            if (indexPeople == peopleArr.length)
                indexPeople = 1;
            else indexPeople++;
            // יצירת DIV עבור הילד
            const childDiv = document.createElement('div');
            childDiv.style.display = 'inline-block'; // שומר על תצוגה במקביל
            childDiv.style.width = '20%'; // הגדר רוחב
            childDiv.style.marginRight = '0%'; // רווח בין הילד להקונוס והכדור
            childDiv.style.height = '3%';
            childDiv.style.marginTop = '0%';
            thePepole.appendChild(childDiv);
            // הוספת התמונה של הילד
            const imgP = document.createElement('img');
            imgP.src = `pictures/people/child${indexPeople}.png`;
            imgP.style.marginTop = '1%';
            imgP.style.width = '40%'; // שינוי רוחב התמונה, תלוי בגודל התמונה
            imgP.style.height = '10%'; // שמירה על יחס גובה-רוחב
            childDiv.appendChild(imgP);
            // יצירת DIV עבור הקונוס והכדור
            const iceCreamDiv = document.createElement('div');
            iceCreamDiv.style.display = 'inline-block'; // שומר על תצוגת הקונוס והכדור אחד מעל לשני
            iceCreamDiv.style.verticalAlign = 'top'; // מקביל לתצוגה העליונה
            iceCreamDiv.style.width = '25%'; // הגדר רוחב
            iceCreamDiv.style.position = "relative";
            iceCreamDiv.style.height = "200px";

            const iceCream = {
                cone: randCone(),
                ball: randBall(),
                add: randAdd(),
                getConImg: function () {
                    const img = document.createElement('img');
                    img.src = coneArr[this.cone].src;
                    img.style.height = '30%'; // שינוי גובה התמונה
                    img.style.width = '35%'; // שמירה על יחס גובה-רוחב
                    img.style.top = '50%'
                    img.style.position = 'absolute';
                    return img;
                },
                getBallImg: function () {
                    const img = document.createElement('img');
                    img.src = ballsArr[this.ball].src;
                    img.style.height = '30%'; // שינוי גובה התמונה
                    img.style.width = '60%'; // שמירה על יחס גובה-רוחב
                    img.style.position = 'absolute';
                    img.style.marginTop = "1px";
                    img.style.left = '-15%'
                    img.style.top = '30%'
                    return img;
                },
                getAddImg: function () {
                    const img = document.createElement('img');
                    img.src = addsArr[this.add].src;
                    img.style.height = '13%';
                    img.style.width = '65%';
                    img.style.top = '45%';
                    img.style.left = '-10%';
                    img.style.marginTop = '0%';
                    img.style.zIndex = '90';
                    img.style.marginBottom = '0%';
                    img.style.position = "absolute";
                    return img;
                }

            }

            arrInsert.push(iceCream);
            arrPeple.push(childDiv);
            indexInsert++;
            sum++;
            iceCreamDiv.appendChild(iceCream.getAddImg());
            iceCreamDiv.appendChild(iceCream.getBallImg()); // הוספת ה-DIV של ה-BALL
            iceCreamDiv.appendChild(iceCream.getConImg()); // הוספת ה-DIV של ה-CONE
            childDiv.appendChild(iceCreamDiv);
            let timeOut;
            timeOut = setTimeout(() => {
                if (isGameRunning && !winORdis) {
                    // וכן הסרתו מן המערך של הגלידות מהמסך הסרת האיבר האחרון שנכנס
                    thePepole.removeChild(arrPeple.shift());
                    arrInterval.shift();
                    arrInsert.shift();
                    sum--;
                    //אם כבר לא הוסר מניצחון
                    clearMyCoice();
                }
            }, levelTimer);
            arrInterval.push(timeOut);

        }
    }
    function dragANdSuccess() {

        for (let x of coneArr) {
            x.addEventListener('dragover', (e) => {
                e.preventDefault();
                fC = true;
            });
            winORdis = false;
            faldC = false;
            x.addEventListener('drop', (e) => {
                e.preventDefault();
                if (arrInsert != null) {
                    imgC.src = x.src.substr(-24, 24);
                    imgC.classList.add('dragImg');
                    theIceCream.appendChild(imgC);
                    if (arrInsert != null && parseInt(e.target.src.substr(-5, 1)) === arrInsert[0].cone + 1) {
                        faldC = true;
                    }

                }
                else {
                    if (fC == true) {
                        imgC.src = "";
                        fC = false;
                    }
                    alert("THERE ISNT PLAYERS");
                }
            });
        }



        for (let x of ballsArr) {
            x.addEventListener('dragover', (e) => {
                e.preventDefault();
                fB = true;
            });

            x.addEventListener('drop', (e) => {
                falgB = false;
                winORdis = false;
                e.preventDefault();
                if (arrInsert != null) {
                    imgB.src = x.src.substr(-24, 24);
                    imgB.classList.add('dragImg');
                    theIceCream.appendChild(imgB);
                    if (arrInsert != null && parseInt(e.target.src.substr(-6, 1)) === arrInsert[0].ball + 1 && faldC) {
                        falgB = true;
                    }
                }
                else {
                    if (fC == true) {
                        imgC.src = "";
                        fC = false;
                    }
                    if (fB == true) {
                        imgB.src = "";
                        fB = false;
                    }
                    alert("THERE ISNT PLAYERS");
                }
            });
        }

        for (let x of addsArr) {
            x.addEventListener('dragover', (e) => {
                e.preventDefault();
                fA = true;
            });
            x.addEventListener('drop', (e) => {
                e.preventDefault();
                winORdis = false;
                //רק אם נוצרו גלידות במסך
                if (arrInsert != null) {
                    imgA.src = x.src.substr(-23, 23);
                    imgA.classList.add('dragImg');
                    theIceCream.appendChild(imgA);
                    if (arrInsert != null && parseInt(e.target.src.substr(-5, 1)) === arrInsert[0].add + 1 && faldC && falgB &&
                        isGameRunning) {
                        amountSucced++;
                        yourSuccess.innerText = amountSucced;
                        //כל 4 גלידות טובות זה גביע זהב
                        if (parseInt(amountSucced / 4) > 0) {
                            let len = parseInt(amountSucced / 4);
                            amountCups = len;
                            for (let i = 0; i < len; i++) {
                                cups[i].src = 'pictures/coneWin1.png';
                            }
                        }
                        winORdis = true;
                        thePepole.removeChild(arrPeple.shift());
                        indexInsert--;
                        arrInsert.shift();
                        arrInterval.shift();
                        sum--;
                        moodMusic = new Audio("sounds/Applause.mp3");
                        moodMusic.play();
                        setTimeout(() => { moodMusic.pause(); }, 2000);
                        clearMyCoice();
                        if (amountCups == 4) {
                            if (level < 3) {
                                level++;
                                for (let i = 0; i < users.length; i++) {
                                    if (users[i].id == currentUserId) {
                                        users[i].level = level;
                                    }
                                }
                                localStorage.setItem('arrUser', JSON.stringify(users));
                                playerLevel.innerText = `YOUR LEVEL IS   ${level}`;
                                amountCups = 0;
                                amountSucced = 0;
                                yourSuccess.innerText = amountSucced;
                                for (let i = 0; i < 4; i++) {
                                    cups[i].src = 'pictures/coneSilver1.png';
                                }
                                showM();
                                setTimeout(() => {
                                    startProcesGame();

                                }, 100000);

                            }

                        }
                    }
                }
                else {
                    alert("THERE ISNT PLAYERS");
                }
            });
        }

    }
    function clearMyCoice() {
        if (fC == true) {
            imgC.src = "";
            fC = false;
        }
        if (fB == true) {
            imgB.src = "";
            fB = false;
        }

        if (fA == true) {
            imgA.src = "";
            fA = false;
        }
    }

    function openMusic() {
        if (!open) {
            myMusic = new Audio("sounds/backgroundMusic.mp3");
            myMusic.play();
            open = true;
        } else {
            if (open) {
                myMusic.pause();
                open = false;
            }
        }
    }

    // הפעלת הטיימר
    function startTimer() {
        if (!interV) { // רק אם הטיימר לא רץ
            interV = setInterval(() => {
                timerCount++; // עדכון הזמן
                updateTimerDisplay(); // עדכון התצוגה
            }, 1000); // עדכון כל שנייה
        }
    }

    // עצירת הטיימר
    function stopTimer() {
        if (interV) { // רק אם הטיימר רץ
            clearInterval(interV); // עצירת הטיימר
            interV = null; // ניקוי intervalId
        }
    }





    // עדכון תצוגת הטיימר
    function updateTimerDisplay() {
        document.getElementById('timerDisplay').innerText = `TIMER: ${timerCount}`; // הצגת הזמן
    }
    function showM() {
        Swal.fire({
            title: 'עברת לשלב הבא',
            text: level,
            icon: 'success',

        });
    }
    function ChooseOtherLevel() {
        window.location.href = 'changeLevel.html';
        startProcesGame();
    }
    function gameOver() {
        //שמירת הרמה
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == currentUserId) {
                users[i].level = level;
            }
        }
        localStorage.setItem('arrUser', JSON.stringify(users));
        window.location.href = 'enterPage.html';

    }

});