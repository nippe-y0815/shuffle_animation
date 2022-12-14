'use strict';
let angle = [];
let animationCo = document.getElementById('animation');
let cardElement;
let cardImgElement;
let containerWidth = window.innerWidth * (1200 / 1280);
let cardWidth = containerWidth * 0.5 * 0.15;
let cardHeight = cardWidth * (483 / 357);
let cardNum = 77;//表示するカードの枚数
let cardCrs = './img/card3.jpg';
let cardLists;
let cardX;
let gFlame = 40;
let theta;


//カード要素の作成
function cardCreate() {
    cardElement = document.createElement('li');
    cardElement.classList.add('card-img');
    cardImgElement = document.createElement('img');
    cardImgElement.src = cardCrs;
    cardElement.insertBefore(cardImgElement, cardElement.firstChild);
}



//カード枚数設定
function clickBtn3() {
    const number2 = document.getElementById("number2");
    document.getElementById("span2").textContent = number2.value;
    if (number2.value % 2 === 0) {
        cardNum = number2.value - 1;
    } else {
        cardNum = number2.value
    }
    cardInit();
}




//ヤマ札表示
function cardInit() {
    cardLists = document.querySelectorAll(".card-img");
    for (let i = 0; i < cardLists.length; i++) {
        cardLists[i].remove();
    }
    cardCreate();
    animationCo.insertBefore(cardElement, animationCo.firstChild);
    for (let i = 0; i < cardNum - 1; i++) {
        cardCreate();
        animationCo.appendChild(cardElement);
    }
    cardLists = document.querySelectorAll(".card-img");
}

//カードトランスフォーム
function cardTransform(index,x,y,r){
    cardLists[index].style.transform ='translateX(' + (x) + 'px)' + 'translateY(' + (y) + 'px)' +  'rotate(' + (r) + 'deg)';
}

//右へ移動
function moveRight() {
    for (let i = 0; i < cardLists.length; i++) {
        setTimeout(() => {
            cardTransform(i,cardWidth * 2,0,0);
            cardLists[i].classList.add('opacity');
        }, i * 10)
    }
}

// ランダム数値配列の生成
function getRandomInt(Max) {
    return Math.floor(Math.random() * Math.floor(Max));
}

//回転度数のランダム数値生成
function createRandom() {
    let angleMax = 360;
    for (let i = 0; i < cardNum; i++) {
        angle.push(getRandomInt(angleMax));
    }
}

//カードを広げる
function openCard() {
    for (let i = 0; i < cardLists.length; i++) {
        cardTransform(i,cardWidth * 2,0,angle[i])
    }
}

//残像
function zanzou(target,ms) {
    cardLists[target].style.opacity = "0.25";
    setTimeout(() => {
        cardLists[target].style.opacity = "1";
    }, ms)
}

//カード円軌道上に広げる
function circularOrbit() {
    theta = Math.PI * (360 / cardNum) / 180;
    for (let i = 0; i < cardLists.length; i++) {
        cardTransform(i,cardWidth * 2 * Math.cos(theta * i),cardWidth * 2 * Math.sin(theta * i),angle[i]);
        cardLists[i].classList.add('opacity2');
    }
}



//カードを軌道上で動かす（右周り）
function moveOrbit() {
    gFlame = 40;
    let timerID = setInterval(() => {
        gFlame++;
        console.log(gFlame);
        theta = Math.PI * (360 / cardNum) / 180 * gFlame;
        for (let i = 0; i < cardLists.length; i++) {
            cardLists[i].classList.add('card-add-class');
            cardTransform(i,cardWidth * 2 * Math.cos(theta * i),cardWidth * 2 * Math.sin(theta * i),angle[i]);
            zanzou(i,500);
        }
        if (gFlame > 50) {
            clearInterval(timerID);
        }
    }, 1000)
}

//カードを順に中央へ戻す
function moveCenter() {
    for (let i = 0; i < cardLists.length; i++) {
        cardLists[i].classList.remove('card-add-class');
    }
    for (let i = 0; i < cardLists.length; i++) {
        setTimeout(() => {
            cardTransform(i,-i,-i,0)
            cardLists[i].style.zIndex = i;
        }, i * 10)
    }
}

//シャッフル①
function shuffle_1() {
    for (let i = 0; i < cardLists.length; i++) {
        setTimeout(() => {
            if (i < cardLists.length / 2) {
                cardTransform(i,cardWidth * 2 -i,-i - (cardLists.length),0);
            }
        }, i * 10)
    }
}

//シャッフル②
function shuffle_2() {
    for (let i = 0; i < cardLists.length; i++) {
        setTimeout(() => {
            if (i < cardLists.length / 2) {
                cardTransform(i,10 -i,-i - (cardLists.length),0);
                cardLists[i].style.zIndex = '100';
            }
        }, i * 10)
    }
}

//シャッフル③
function shuffle_3() {
    for (let i = 0; i < cardLists.length / 2; i++) {
        setTimeout(() => {
            if (i < cardLists.length / 3) {
                cardTransform(i,cardWidth * 2 -i,-i - (cardLists.length),0);
            }
            else {
                cardTransform(i,-i -i,-i - (cardLists.length / 2),0);
            }
        }, i * 10)
    }
}

//シャッフル④
function shuffle_4() {
    for (let i = 0; i < cardLists.length; i++) {
        setTimeout(() => {
            if (i < cardLists.length / 3) {
                cardTransform(i,10 -i,-i - (cardLists.length),0);
                cardLists[i].style.zIndex = '200';
            }
        }, i * 10)
    }
}

//シャッフル➄
function shuffle_5() {
    for (let i = 0; i < cardLists.length / 3; i++) {
        setTimeout(() => {
            if (i < cardLists.length / 4) {
                cardTransform(i,cardWidth * 2 -i,-i - (cardLists.length),0);
            }
            else {
                cardTransform(i,-i -i,-i - (cardLists.length)/1.5,0);
            }
        }, i * 10)
    }
}

//シャッフル⑥
function shuffle_6() {
    for (let i = 0; i < cardLists.length; i++) {
        setTimeout(() => {
            if (i < cardLists.length / 4) {
                cardTransform(i,10-i,-i - (cardLists.length),0);
                cardLists[i].style.zIndex = '300';
            }
        }, i * 10)
    }
}

//シャッフル⑦
function shuffle_7() {
    for (let i = 0; i < cardLists.length / 4; i++) {
        setTimeout(() => {
            if (i < cardLists.length / 6) {
                cardTransform(i,cardWidth * 2 -i,-i - (cardLists.length),0);
            }
            else {
                cardTransform(i,0-i,-i - (cardLists.length)/1.25,0);
            }
        }, i * 10)
    }
}

//シャッフル⑧
function shuffle_8() {
    for (let i = 0; i < cardLists.length; i++) {
        setTimeout(() => {
            if (i < cardLists.length / 6) {
                cardTransform(i,0-i,-i - (cardLists.length),0);
                cardLists[i].style.zIndex = '400';
            }
        }, i * 10)
    }
}

//シャッフルa
function shuffle_a() {
    for (let i = 0; i < cardLists.length; i++) {
        setTimeout(() => {
            if (i < cardLists.length / 4) {
                cardTransform(i,0,(-i) - cardHeight - 50,0);
                cardLists[i].classList.add('opacity3');
            } else if (cardLists.length / 4 < i && i < cardLists.length / 2) {
                cardTransform(i,0,(-i) + cardHeight + 30,0);
                cardLists[i].classList.add('opacity3');
            } else if (cardLists.length / 2 < i && i < cardLists.length * 3 / 4) {
                cardTransform(i,200,-i,0);
                cardLists[i].classList.add('opacity3');
            } else if (i > cardLists.length * 3 / 4 && i <= cardLists.length) {
                cardTransform(i,-200,-i,0);
                cardLists[i].classList.add('opacity3');
            }
        }, i * 30);
    }
}



/** 重複チェック用配列 */
let randoms = [];
/** 最小値と最大値 */
let min = 0;
let max = cardNum - 1;
let tmp;


/** min以上max以下の整数値の乱数を返す */
function intRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function test(){
    randoms.length = 0;
    /** 重複チェックしながら乱数作成 */
    for (let i = min; i <= max; i++) {
        while (true) {
            tmp = intRandom(min, max);
            if (!randoms.includes(tmp)) {
                randoms.push(tmp);
                break;
            }
        }
    }
}

//シャッフルb
function shuffle_b() {
    min = 0;
    max = cardNum - 1;
    test();
    intRandom();
    for (let i = 0; i < cardLists.length; i++) {
        setTimeout(() => {
            console.log(randoms[i]);
            cardTransform(randoms[i],0,-i,0);
            cardLists[randoms[i]].style.zIndex = i;
            cardLists[randoms[i]].classList.add('opacity4');
        }, i * 100)
    }
}

//カードを一枚下へ移動
function moveBottom() {
    cardTransform(10,0,cardHeight + 10,0);
}

//カードを大きく表示
function cardBic() {
    let BoxCover = document.querySelector('.box-cover');
    BoxCover.classList.add('box-cover-show');
    cardTransform(10,0,-cardHeight,0);
    cardLists[10].style.width = '45%';
    cardLists[10].style.zIndex = '100';
    cardCreate();
    cardImgElement.src = './img/card_a.png';
    animationCo.appendChild(cardElement);
    cardElement.classList.add('card_X');
    cardX = document.querySelector('.card_X');
    cardX.style.transform = 'translateY(' + (-cardHeight) + 'px)' + 'rotateY(90deg)';
    cardX.style.width = '45%';
    cardX.style.zIndex = '99';
}


//カードを回転
function cardRot() {
    cardLists[10].style.transform = 'translateY(' + (-cardHeight) + 'px)' + 'rotateY(90deg)'
    setTimeout(() => {
        cardX.style.transform = 'translateY(' + (-cardHeight) + 'px)' + 'rotateY(0deg)'
    }, 500)
}

//起動イベント
window.onload = function () {
    cardInit();
    createRandom();
}

