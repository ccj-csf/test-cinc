/**
 * 使用给定的类型参数来提供相应的动画配置。
 * @param {string} type 动画类型，决定了返回的动画预设。
 * @returns {Object} 包含了指定动画预设以及其他所有动画预设的对象。
 */
const useMotionConfig = (type) => {
  const animationPresets = {
    scaleUp: {
      initial: { scale: 0 },
      whileInView: { scale: 1, transition: { duration: 0.5 } },
    },
    fadeIn: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1, transition: { duration: 0.5 } },
    },
    slideIn: {
      initial: { x: -100 },
      whileInView: { x: 0, transition: { duration: 0.5 } },
    },
    rotateIn: {
      initial: { rotate: -90 },
      whileInView: { rotate: 0, transition: { duration: 0.5 } },
    },
    zoomFade: {
      initial: { scale: 0.5, opacity: 0 },
      whileInView: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    },
    slideUp: {
      initial: { y: 100 },
      whileInView: { y: 0, transition: { duration: 0.5 } },
    },
    slideDown: {
      initial: { y: -100 },
      whileInView: { y: 0, transition: { duration: 0.5 } },
    },
    slideLeft: {
      initial: { x: 300 },
      whileInView: { x: 0, transition: { duration: 0.5 } },
    },
    slideRight: {
      initial: { x: -300 },
      whileInView: { x: 0, transition: { duration: 0.5 } },
    },
    scaleIn: {
      initial: { scale: 0 },
      whileInView: { scale: 1, transition: { duration: 0.5 } },
    },
    scaleOut: {
      initial: { scale: 1 },
      whileInView: { scale: 0, transition: { duration: 0.5 } },
    },
    fadeInUp: {
      initial: { y: 500, opacity: 0 },
      whileInView: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    },
    fadeInDown: {
      initial: { y: -360, opacity: 0 },
      whileInView: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    },
  };

  return {
    motionPreset: animationPresets[type] || animationPresets.scaleUp,
    motionScaleUp: animationPresets.scaleUp,
    motionFadeIn: animationPresets.fadeIn,
    motionSlideIn: animationPresets.slideIn,
    motionRotateIn: animationPresets.rotateIn,
    motionZoomFade: animationPresets.zoomFade,
    motionSlideUp: animationPresets.slideUp,
    motionSlideDown: animationPresets.slideDown,
    motionSlideLeft: animationPresets.slideLeft,
    motionSlideRight: animationPresets.slideRight,
    motionScaleIn: animationPresets.scaleIn,
    motionScaleOut: animationPresets.scaleOut,
    motionFadeInUp: animationPresets.fadeInUp,
    motionFadeInDown: animationPresets.fadeInDown,
  };
};

export { useMotionConfig };
