// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// import required modules
import { EffectCoverflow, Pagination, Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css/navigation';
import WizardSteper from './wizard/WizardSteper';
import { useClusterWizardContext } from '@/hooks/useCreateClusterWizard';
import Wrapper from './wizard/Wrapper';
import { CREATE_CLUSTER_STEPS } from '@/constants';
import { useState, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './style.css';


function ClusterCreateWizard({ handleClose }) {

    const [swiperRef, setSwiperRef] = useState(null);

    const { wizard, dispatch } = useClusterWizardContext();

    const coverEffect = {
        rotate: 40, depth: 300, modifier: 1, scale: 0.9, slideShadows: true,
    };
    const btnNavHandler = (e) => {
        // console.log('nav btn click to change slide to ', wizard.current);
        // dispatch((prev) => ({ ...prev, current: e.activeIndex }));
        dispatch({ isChangeStep: true, currentIndex: e.activeIndex });
    };
    const checkOrUpdateIndex = (swiper) => {
        if (swiper.activeIndex !== wizard.current) {
            // dispatch((prev) => ({ ...prev, current: swiper.activeIndex }));
            dispatch({ isChangeStep: true, currentIndex: swiper.activeIndex });
        }
    };

    return (<>
        <Swiper
            draggable={false}
            grabCursor={false}
            initialSlide={wizard.current}
            effect={'coverflow'}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={coverEffect}
            pagination={{ type: 'progressbar' }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation, Keyboard]}
            className="mySwiper"
            onNavigationNext={btnNavHandler}
            onNavigationPrev={btnNavHandler}
            onSwiper={setSwiperRef}
            onSlideChange={checkOrUpdateIndex}
            keyboard={{
                enabled: true,
                onlyInViewport: true,
                // keyPress: keyboardHanlder,
                // pageUpDown: true
            }}
        >
            {
                CREATE_CLUSTER_STEPS.map(cs => {
                    return (<SwiperSlide key={cs.id}>
                        <Wrapper step={cs} swiperRef={swiperRef} handleClose={handleClose} />
                    </SwiperSlide>);
                })
            }
        </Swiper>
        <WizardSteper swiperRef={swiperRef} />
    </>);
}

export default ClusterCreateWizard;