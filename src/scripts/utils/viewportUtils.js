export default {
  bp: {
    mobile: 0,
    tabletPortrait: 768,
    tabletLandscape: 1024,
    desktop: 1280,
  },

  isMobile() {
    return !!!window.matchMedia(`(min-width: ${this.bp.tabletLandscape}px)`)
      .matches;
  },
  isDesktop() {
    return !!window.matchMedia(`(min-width: ${this.bp.tabletLandscape}px)`)
      .matches;
  },

  setDocumentHeight() {
    /**
     * Set the document height to the viewport height
     * https://dev.to/nirazanbasnet/dont-use-100vh-for-mobile-responsive-3o97
     */
    document.documentElement.style.setProperty(
      "--full-vh",
      `${window.innerHeight}px`
    );
  },
};
