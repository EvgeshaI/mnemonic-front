import React from "react";
import "animate.css/animate.min.css";
import {AnimationOnScroll} from 'react-animation-on-scroll';
import Slide1 from '../../../import/images/inputWord.png'
import Slide2 from '../../../import/images/slide2.png'
import Slide3 from '../../../import/images/slide3.png'
import Slide4 from '../../../import/images/slide4.png'
import Slide5 from '../../../import/images/slide5.png'
import s from './startPage.module.css'

export const AnimatedTutorial = () => {
    return (
        <div className={s.animatedTutorialBox}>
            <div className={s.firstSlideBox}>
                <AnimationOnScroll animateIn="animate__backInLeft" animateOnce={true}>
                    <div className={s.slade1Image}>
                        <img src={Slide1}/>
                    </div>
                    <div className={s.slide1Text}>Введите в поисковой строке английское слово</div>
                </AnimationOnScroll>
            </div>
            <div className={s.secondSlideBox}>
                <div className={s.secondSlideImage}>
                    <AnimationOnScroll animateIn="animate__backInLeft" animateOnce={true}>
                        <div className={s.sladeImage}> <img src={Slide2}/> </div>
                    </AnimationOnScroll>
                </div>
                <div  className={s.secondSlideText}>
                    <AnimationOnScroll animateIn="animate__backInRight" animateOnce={true}>
                        <div className={s.slideText}>

                            Например, для слова "mark" уже есть мнемоника <span className={s.colorHighlight}>марк</span>ер с созвучной частью<br/><br/>
                            Попробуйте придумать и добавить свою мнемонику
                        </div>
                    </AnimationOnScroll>
                </div>
            </div>
            <div  className={s.thirdSlideBox}>
                <div className={s.thirdSlideText}>
                    <AnimationOnScroll animateIn="animate__backInLeft" animateOnce={true}>
                        <div className={s.slideText}>
                            Хороший пример мнемоники для слова "mark" будет слово "маркиз"<br/><br/>
                            Выберите буквы созвучные английскому слову<br/><br/>
                            Попробуйте придумать похожую по звучанию мнемонику
                        </div>
                    </AnimationOnScroll>
                </div>
                <div className={s.thirdSlideImage}>
                    <AnimationOnScroll animateIn="animate__backInRight" animateOnce={true}>
                        <div className={s.sladeImage}> <img src={Slide3}/> </div>
                    </AnimationOnScroll>
                </div>

            </div>
            <div className={s.fourthSlideBox}>
                <div className={s.fourthSlideImage}>
                    <AnimationOnScroll animateIn="animate__backInLeft" animateOnce={true}>
                        <div className={s.sladeImage}> <img src={Slide4}/> </div>
                    </AnimationOnScroll>
                </div>
                <div className={s.fourthSlideText}>
                    <AnimationOnScroll animateIn="animate__backInRight" animateOnce={true}>
                        <div className={s.slideText}>
                            Все добавленные мнемоники будут автоматически сохраняться на вашу страницу<br/><br/>
                            Кликните по своему имени в навигационной панели, чтобы туда перейти <br/><br/>
                        </div>
                    </AnimationOnScroll>
                </div>
            </div>
            <div className={s.fifthSlideBox}>
                <div className={s.fifthSlideText}>
                    <AnimationOnScroll animateIn="animate__backInLeft" animateOnce={true}>
                        <div className={s.slideText}>
                            Для лучшего запоминания, придумайте пример, который будет содержать и мнемонику и перевод<br/><br/>

                        </div>
                    </AnimationOnScroll>
                </div>
                <div className={s.fifthSlideImage}>
                    <AnimationOnScroll animateIn="animate__backInRight" animateOnce={true}>
                        <div className={s.sladeImage}> <img src={Slide5}/> </div>
                    </AnimationOnScroll>
                </div>
            </div>


        </div>
        )

}