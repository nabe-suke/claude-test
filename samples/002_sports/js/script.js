// スワイプ機能の実装
class SwipeHandler {
    constructor(container) {
        this.container = container;
        this.startX = 0;
        this.scrollLeft = 0;
        this.isDown = false;
        
        this.init();
    }
    
    init() {
        // マウスイベント
        this.container.addEventListener('mousedown', this.handleStart.bind(this));
        this.container.addEventListener('mouseleave', this.handleEnd.bind(this));
        this.container.addEventListener('mouseup', this.handleEnd.bind(this));
        this.container.addEventListener('mousemove', this.handleMove.bind(this));
        
        // タッチイベント
        this.container.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.container.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.container.addEventListener('touchend', this.handleEnd.bind(this));
    }
    
    handleStart(e) {
        this.isDown = true;
        this.container.style.cursor = 'grabbing';
        this.startX = e.pageX - this.container.offsetLeft;
        this.scrollLeft = this.container.scrollLeft;
    }
    
    handleTouchStart(e) {
        this.isDown = true;
        this.startX = e.touches[0].pageX - this.container.offsetLeft;
        this.scrollLeft = this.container.scrollLeft;
    }
    
    handleEnd() {
        this.isDown = false;
        this.container.style.cursor = 'grab';
    }
    
    handleMove(e) {
        if (!this.isDown) return;
        e.preventDefault();
        const x = e.pageX - this.container.offsetLeft;
        const walk = (x - this.startX) * 2;
        this.container.scrollLeft = this.scrollLeft - walk;
    }
    
    handleTouchMove(e) {
        if (!this.isDown) return;
        const x = e.touches[0].pageX - this.container.offsetLeft;
        const walk = (x - this.startX) * 2;
        this.container.scrollLeft = this.scrollLeft - walk;
    }
}

// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // 活動内容のスワイプ機能
    const activitiesMobile = document.querySelector('.activities-mobile');
    if (activitiesMobile) {
        new SwipeHandler(activitiesMobile);
        activitiesMobile.style.cursor = 'grab';
    }
    

    
    // ギャラリーのスワイプ機能
    const galleryMobile = document.querySelector('.gallery-mobile');
    if (galleryMobile) {
        new SwipeHandler(galleryMobile);
        galleryMobile.style.cursor = 'grab';
    }
});